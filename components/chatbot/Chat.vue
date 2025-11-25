<script lang="ts">

import ChatUser from './ChatUser.vue';
import ChatAgent from './ChatAgent.vue';
import { defineComponent, ref, nextTick } from 'vue';
import OpenAI from 'openai';
import SecondaryButton from '../buttons/SecondaryButton.vue';

interface Message {
    text: string;
    type: 'user' | 'agent';
}

export default defineComponent({

    name: 'Chat',
    components: {
        ChatUser,
        ChatAgent,
        SecondaryButton,
    },
    data() {
        return {
            userInput: '',
            chat: [] as Message[] ,   // Array of messages to be displayed
            isWaitingForReply: false,
            threadId: '',
            // When true the chat UI will show a disabled message and prevent sending messages
            chatDisabled: true,
            openai: new OpenAI( {apiKey: this.$config.public.openaiApiKey, dangerouslyAllowBrowser: true }),   
            assistantId: 'asst_1zbW4JTNBND59Max3CW5YvM5',   // id of the assistant on OpenAI platform
            conversationRef: null as any,
            showLeftPanel: false,
        }
    },
    async mounted() {
        await this.createThread();
        this.conversationRef = this.$refs.chatContainerRef;
        console.log(this.$config.public.openaiApiKey);

        /* Verify conditions to show the left panel or not for responsiveness*/
        this.showLeftPanel = window.innerWidth >= 1150;
        window.addEventListener('resize', () => {
            this.showLeftPanel = window.innerWidth >= 1150;
        });

    },
    methods: {
        /* Create a new thread for the conversation whenever the user opens the chat */
        async createThread() {
            try {
                const thread = await this.openai.beta.threads.create();
                this.threadId = thread.id;
                console.log("Created thred with ID", thread.id);
            } catch (error) {
                console.error('Error creating thread:', error);
            }
        },
        /* Send user message to the assistant, retrieve response and update the chat array with the new message */
        async handleConversation() {
            if(this.userInput){
                console.log("Sending user input to openai");
                this.isWaitingForReply = true;
                const userMessage = this.userInput;
                this.chat.push({text: this.userInput, type: 'user'});
                this.scrollToBottom();
                this.userInput = '';
                
                /* Create a new message to be sent to the assistant */
                const message = await this.openai.beta.threads.messages.create(
                    this.threadId,
                    {
                        role: "user",
                        content: userMessage
                    }
                );
                /* Send the message to the assistant and retrieve response with streaming api */    
                const run = this.openai.beta.threads.runs.stream(this.threadId, {
                    assistant_id: this.assistantId, stream: true
                }).on('textCreated', (text) => {
                    this.chat.push({ text: '', type: 'agent' });
                })
                .on('textDelta', (textDelta, snapshot) => {
                    const lastMessageIndex = this.chat.length - 1;
                    if (this.chat[lastMessageIndex].type === 'agent') {
                        this.chat[lastMessageIndex].text += textDelta.value; // Append incremental text to last agent message
                        this.scrollToBottom();
                    }
                    
                });
                this.isWaitingForReply = false;
            }
        },
        /* Scroll chat to the bottom of the conversation when the length doesn't fit into the available height */
        scrollToBottom() {
            console.log("the ref is ", this.conversationRef);
            this.$nextTick(() => {
                if(this.conversationRef){
                    this.conversationRef.scrollTop = this.conversationRef.scrollHeight;
                }
            })
        },
        clearChat() {
            this.chat = [];
        },
        /* Close the chat overlay and navigate to the contacts page */
        contactAndClose() {
            // emit to parent to close the chatbot overlay
            this.$emit('closeChatbot');
            // navigate to contacts page
            try {
                // prefer router navigation when available
                if (this.$router) {
                    this.$router.push('/contacts');
                    return;
                }
            } catch (e) {
                // fallback to full navigation
            }
            window.location.href = '/contacts';
        },
        handleChatScroll(event: Event) {
            event.preventDefault();
        }

    }
});

</script>



<template>

    <div class="chatbot-dialogue" @click.stop @wheel="handleChatScroll">   
          
        <div class="chat-left" v-if="showLeftPanel">
            <button v-if="!chatDisabled" @click="clearChat" class="clear-chat-button-left" style="font-size: var(--body1); line-height: var(--l-height1); width: 120px; height: 40px; min-height: 40px" > Clear Chat </button>
            <div class="chatbot-text-div">
                <h4>We are here to <br> help you.</h4>
                <p>This space is here to guide you on what to do and who to reach out to if you're experiencing or have experienced violence from men. 
                While you won't be interacting with a person directly, the answers provided have been carefully crafted by trained professionals from Anti-Violence Centers.</p>
            </div>
        </div>

        <div class="chat-right" >
            <div class="chat-close">
                <button v-if="!showLeftPanel && !chatDisabled" class="clear-chat-button-right" @click="clearChat" style="font-size: var(--body1); line-height: var(--l-height1); width: 120px; height: 40px; min-height: 40px"> Clear Chat</button>
                <button type="button" class="close-chat-button" aria-label="Close the chat" @click="$emit('closeChatbot')">
                    <Icon name="MobileExitIcon" color="var(--purple)" size="32" />
                </button>
            </div>

            <div class="chat-wrapper" aria-live="assertive">
                <div class="chat-conversation" ref="chatContainerRef">
                    <div v-for="(message, index) in chat" :key="index">
                        <ChatUser v-if="message.type === 'user'" :text="message.text"></ChatUser>
                        <ChatAgent v-else :text="message.text"></ChatAgent>
                    </div>
                </div>

                <!-- When chatDisabled is true we show a friendly notice and remove the ability to send messages -->
                <div v-if="chatDisabled" class="chat-disabled" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;gap:1rem;">
                    <h3 style="margin:0;">Chat temporarily disabled</h3>
                    <p style="margin:0;max-width:56ch;text-align:center;">For security reasons this chat has been disabled. If you need support please contact us via the contacts page or call the numbers listed on the site. The chat is read-only and no messages can be sent.</p>
                    <button @click="contactAndClose" class="contact-us-button" style="width:160px;height:40px;border-radius:8px;border:1px solid var(--purple);background-color:var(--white);color:var(--purple);cursor:pointer;font-size:var(--body1);">Contact Us</button>
                </div>

                <!-- Keep the chat form markup available but hidden when the chat is disabled so it can be re-enabled later -->
                <form v-else id="chat-form" @submit.prevent="handleConversation">
                    <input type="text" v-model="userInput" name="input" placeholder="Here you can write" aria-label="Here you can type the message for us. Press Enter to send the message, then wait for the response to be read. Type again from the keyboard to keep the conversation going." required 
                        :style="{ fontSize: '16px' }">
                    <button type="submit" aria-label='Send the message' style="width: 80px; height: 40px; border: 1px solid var(--purple); border-radius: 8px; font-size: var(--body1);
                        background-color: var(--white); color: var(--purple); cursor: pointer;" :disabled="isWaitingForReply" >Send
                    </button>
                </form>
            </div>
        </div>
    </div>

    

</template>


<style scoped>

.chatbot-dialogue {
  position: fixed;
  top: 19.5vh;
  right: 59px;
  z-index: 100;

  max-width: 1800px;
  max-height: calc(100vh - 24.5vh);
  min-height: 200px;
  height: 80%;
  width: 85%;

  border-radius: 24px;
  box-shadow: 0px 16px 40px rgba(26, 20, 31, 0.15);
  display: flex;
  background-color: var(--white);
}

.chat-left {
    flex: 0 1 32%;
  background-color: var(--purple);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 3rem 4.5rem 3rem;
  gap: 1.5rem;
  overflow-y: hidden;
}

.clear-chat-button-left {
  height: 64px;
  padding: 0 10px;
  border-radius: var(--border-radius-bottom);
  background-color: var(--white);
  font-family: var(--font-montserrat);
  color: var(--purple);
  font-size: var(--body4);
  font-weight: var(--medium);
  cursor: pointer;
  border: thin solid var(--purple);
  transition: background-color var(--transition);
}
.clear-chat-button-left:hover:not(.is-disabled) {
  color: var(--purple-hover);
  border: thin solid var(--purple-hover);
}
.clear-chat-button-left:active:not(.is-disabled) {
  color: var(--purple-active);
  border: thin solid var(--purple-active);
}

.clear-chat-button-right {
    height: 64px;
  padding: 0 10px;
  border-radius: var(--border-radius-bottom);
  background-color: white;
  font-family: var(--font-montserrat);
  color: var(--purple);
  font-size: var(--body4);
  font-weight: var(--medium);
  cursor: pointer;
  border: thin solid var(--purple);
  transition: background-color var(--transition);
}


.chatbot-text-div {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: var(--body1);
  line-height: var(--l-height1);
}


.chat-right {
    flex: 1 0.7 68%;    /* Take up the whole width when chat-left is removed from the flex container */
  display: flex;
  flex-direction: column;
}

.chat-close {
    height: 5rem;
    padding: 0 4rem 0 3rem;
    border-bottom: 1px solid var(--grey1);
    display: flex;
    justify-content: end;
    align-items: center;
}

.close-chat-button {
    border: none;
    background-color: white;
    cursor: pointer;
}

.chat-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 8.5rem);
    align-items: center;
    padding: 0 0 4rem 0;
}

.chat-conversation {
    width: 100%;
    overflow-y: scroll;
}

/* scrollbar per browser WebKit */
.chat-conversation::-webkit-scrollbar {
    width: 12px;
}
.chat-conversation::-webkit-scrollbar-track {
    background: color-mix(in srgb, var(--white) 80%, transparent);
    border-radius: 10px;
}
.chat-conversation::-webkit-scrollbar-thumb {
    background: var(--grey2);
    border-radius: 10px;
    border: 1px solid var(--white);
}

form {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: var(--body1);
}

form input {
    height: 1em;
    padding: 1rem;
    margin: 0;
    border: 2px solid var(--grey2);
    border-radius: 12px;
    width: 83%;
}


/* Responsive design */
@media screen and (max-width: 1150px) {
    .chat-close {
        justify-content: space-between;
    }
}

/* Smartphones */
/* The chatbot takes up the whole screen  for better visibility and usability*/
@media screen and (max-width: 500px) {
    .chatbot-dialogue {
        top: 13vh;
        right: 0;
        width: 100vw;
        height: 87vh;
        max-height: none;
    }
}

</style>