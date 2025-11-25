<script lang="ts" setup>
import BackwardButton from '~/components/buttons/BackwardButton.vue';

useHead({
  title: "Volunteer for Centro MiLA | Help us supporting women victims of violence",
  meta: [
    {
      name: 'description',
      content: 'Discover how you can become a volunteer at MiLA and contribute to the fight against violence against women and for women\'s rights. Learn about our volunteer roles, training courses, and submit your application to join our community.'
    },
    {
      name: 'keywords',
      content: 'volunteer at MiLA, volunteer roles, domestic violence support, women\'s rights volunteer, volunteer training courses, submit volunteer application, support women in need' + 
      'volontariato presso MiLA, ruoli per volontari, supporto violenza domestica, volontariato per i diritti delle donne, corsi di formazione per volontari, invio candidatura volontari, supporto donne in difficoltà',
    }
  ]
});

/* Form submission action */
function submit(event:Event){
  event.preventDefault();  
  const form = document.getElementById("volunteering-form");
  const thanks = document.getElementById("volunteering-thanks");
  if(form)
    form.style.display = 'none';
  if(thanks)
    thanks.style.display = 'block';
}
</script>

<template>
    <backward-button-wrapper>
      <BackwardButton buttonText="What You Can Do" class="back-button" to="/what-you-can-do" />
    </backward-button-wrapper>
  <div id="volunteering-cover" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Volunteering.png)'}">
    <h1 class="page-title" >Become a <br> volunteer at MiLA</h1>
  </div>
  
  <div class="volunteering-intro">
    <h2>Volunteer With Us!</h2>
    <p class="dynamic-p">Contribute to the fight against violence against women
      and for rights by becoming a volunteer in our centre.</p>
  </div>

  <div id="volunteer-quote" >
    <div id="quote-container">
      <Icon name="QuoteIcon" size="4.2vw" style="margin-top: -30px; color: var(--purple);" />
      <div>
        <p>Volunteering at Centro MiLA has been one of the most rewarding experiences of my life. The love, strength, and resilience I see every day 
          inspire me to be a better person. Centro MiLA is truly a place where we all grow together.</p>
        <p style="font-style: italic; font-size: var(--body3);" id="quote-author">Elena, MiLA volunteer</p>
      </div>
    </div>
  </div>

  <img src="/assets/images/fiori-e-cuori.svg" alt="" style="position: absolute; transform: scaleX(-1); opacity: 0.25;">
  <div id="volunteer-role" style="z-index: 1; position: relative;">
    <img src="/assets/images/volunteer-pic2.jpeg" alt="" id="volunteer-pic2">
    <div>
      <h3>Who We Are Looking For</h3>
      <p>We seek compassionate, reliable individuals eager to support women and children affected by domestic violence. Our ideal volunteer is empathetic, 
        maintains confidentiality, and is dedicated to making a positive impact. We welcome diverse backgrounds and experiences, believing that varied perspectives 
        strengthen our community. Whether you have previous social services experience or simply a heartfelt desire to help, your commitment and willingness to 
        learn are what matter most. Join us in making a difference.</p>
      <h4 style="margin-top: 108px;">Your Role</h4>
      <p>Volunteers at Centro MiLA provide essential support by offering emotional assistance, helping with administrative tasks, and organizing support groups 
        and workshops. You will also participate in community outreach to raise awareness about domestic violence and support fundraising events. Collaboration 
        with our professional staff ensures a safe and welcoming environment for all women. Your contributions, no matter how small, will help us create a nurturing 
        and empowering space for those who need it most.</p>
    </div>
  </div>

  <div id="volunteer-training" >
    <div>
      <h3>Training Courses</h3>
      <p>Centro MiLA offers comprehensive training to ensure volunteers are well-prepared and confident in their roles. Training covers understanding domestic violence, 
        effective communication, crisis intervention, and confidentiality protocols. These sessions equip you with the knowledge and tools necessary to provide compassionate 
        and effective support. Completing this training prepares you to make a meaningful impact and contribute to the healing and empowerment of those we serve. Join us to 
        learn, grow, and make a difference together.</p>
        <p class="boldText" >Seminar 1 - On site</p>
        <p>Sat 01 June <br>
          18 pm - 20 pm</p>
        <p class="boldText">Seminar 2 - Online</p>
        <p>Wed 05 June - Wed 15 June <br>
          18 pm - 20 pm</p>
        <p class="boldText"  >Seminar 3 - On site</p>
        <p>Sat 22 June - Sat 29 June <br>
          18 pm - 20 pm</p>
    </div>
    <img src="/assets/images/volunteer-pic1.jpeg" alt="" id="volunteer-pic1">
  </div>

  <div id="volunteering-form" aria-live="assertive">
    <h4>Submit Your Application!</h4>
    <p class="dynamic-p">By submitting your application you will be contacted by our staff and invited to the first collective appointment of the training course. 
      For any doubts contact: centromila@gmail.com</p>
    <!--Cambiare action-->  
    <form @submit="submit">
      <input type="text" pattern="[A-Za-z\s]+" name="name" placeholder="Name and Surname" required>
      <input type="text" pattern="\d+" name="age" placeholder="Your age" required>
      <input type="email" name="e-mail" placeholder="E-mail address" required>
      <input type="text" pattern="\+?[0-9\s]+" name="phone" placeholder="Phone number" required>
      <textarea name="comment" placeholder="Why would you want to become a volunteer?" style="height: 282px;" required></textarea>
      <button type="submit" id="submit-button"
      style="width: 163px; height: 64px; background-color: var(--purple); border: 0; border-radius: 12px; font-size: var(--body4); color: white;
       font-family: 'Montserrat', serif; font-weight: var(--regular); margin-top: 92px; cursor: pointer;"> Send</button>
    </form>
  </div>
  <div id="volunteering-thanks" aria-live="assertive">
    <h2>
      Thank you! <br> We will contact you soon
    </h2>
  </div>

</template>


<style scoped>

.back-button {
  z-index: 11;
}

#volunteering-cover{
  background-size: cover;
  min-height: 50vw;
  position: relative;
}

.page-title {
  position: absolute;
  bottom: 3em;
}

/**Introductive section */
.volunteering-intro{
  margin: 160px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.volunteering-intro p{
  width: 50%;
  text-align: center;
}

h2 {
  font-size: 40px;
  line-height: 44px; 
  font-weight: 900;
}
h3 {
  font-size: 32px;
  line-height: 34px; 
  font-weight: 900;
}

#volunteer-quote{
  background-color: var(--lilac);
  background-image: url(/assets/images/volunteer-quote.svg);
  background-repeat: no-repeat;
  background-position: right;
}
#quote-container{
  display: flex;
  flex-direction: row;
  padding: 6em 0 10em 8em;
}
#quote-container div{
  width: 30.5vw;
  font-size: var(--h4);
  line-height: 40px;
}

#volunteer-role{
  margin: 15em 0 18em 0;
  display: flex;
  align-items: center;
  padding-right: 4em;
  overflow-x: hidden;
}
#volunteer-pic2{
  flex: 1 1 auto;
  width: 50%;
  height: 100%;
  object-fit: cover;
}
#volunteer-role div{
  margin-left: 7.9vw;
  width: 50%;
  font-size: var(--body3);
  line-height: var(--l-height3);
}

#volunteer-training{
  display: flex;
  align-items: center;
  overflow-x: hidden;
  padding-left: 4em;
  gap: 4em;
}
#volunteer-training div{
  width: 40%;
  font-size: var(--body3);
  line-height: var(--l-height3);
}
#volunteer-pic1{
  width: 60%;
  margin-right: -20vw;
}

#volunteering-form{
  padding: 0 3%;
  margin: 12em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
#volunteering-form form {
  width: 80%;
  max-width: 750px;
  margin-top: 30px;
}
#volunteering-form p{
  width: 80%;
  max-width: 600px;
}

#volunteering-thanks{
  display: none;
  margin: 260px 0 400px 10vw;
  color: var(--purple);
  width: 80vw;
  text-align: center;
  border: 1px solid var(--purple);
  border-radius: 12px;
}

#volunteering-thanks h2{
  padding: 50px 10px;
}


@media screen and (max-width: 1150px) {
  #quote-container div{
  width: 60%;
  font-size: 28px;
  line-height: 40px;
}

#volunteer-role{
  flex-direction: column;
  gap: 3em;
  padding: 0;
  margin-bottom: 12em;
}
#volunteer-role img {
  width: 80%;
}
#volunteer-role div {
  margin: 0;
  width: 60%;
}

#volunteer-training{
  flex-direction: column;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
#volunteer-training div{
  width: 60%;
  font-size: var(--body3);
  line-height: var(--l-height3);
  display: flex;
  flex-direction: column;
  align-items: start;
}
#volunteer-pic1{
  width: 80%;
  margin: 0;
  order: -1;
}
.boldText {
  margin-bottom: 0;
}

}

@media screen and (max-width: 800px){
  #quote-container {
    padding: 6em 0 6em 5em;
  }
  #quote-container div{
  width: 70%;
  font-size: 24px;
  line-height: 33px;
}
}

@media screen and (max-width: 500px) {

  .page-title {
  position: absolute;
  bottom: 1em;
}


  #quote-container {
    padding: 6em 0 6em 2em;
  }
  #quote-container div{
  width: 80%;
  font-size: 20px;
  line-height: 28px;
}

#volunteer-role div{
  width: 78%;
  font-size: 18px;

}

#volunteer-training div{
  width: 78%;
  font-size: 18px;
  line-height: var(--l-height3);
  display: flex;
  flex-direction: column;
  align-items: start;
}
}


</style>