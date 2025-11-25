<script lang="ts" setup>
// Import the BackwardButton component
import BackwardButton from '~/components/buttons/BackwardButton.vue';

useHead({
  title: "Donate to Centro MiLA | Against Women Violence Centre",
  meta: [
    {
      name: 'description',
      content: 'Support Centro MiLA\'s activities by making a donation. Your contribution helps provide women with a safe pathway out of violence through services like psychological support, legal counseling, job orientation, and access to safe housing.'
    },
    {
      name: 'keywords',
      content: 'donate to Centro MiLA, support women\'s shelter, domestic violence support, donate 5x1000, bank transfer donation, psychological support, legal counseling, job orientation' + 
      'donazione Centro MiLA, sostegno rifugio per donne, supporto violenza domestica, donazione 5x1000, bonifico bancario, supporto psicologico, consulenza legale, orientamento professionale',
    }
  ]
});

</script>

  <template>
    <div id="activities-page">
      <!-- Wrapper for the backward navigation button -->
      <backward-button-wrapper>
        <!-- Button to navigate back to the "What You Can Do" page -->
        <BackwardButton buttonText="What You Can Do" to="/what-you-can-do" />
      </backward-button-wrapper>

      <!-- Page title section -->
      <div id="page-title" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Donate.png)'}">
        <h1 class="page-title">Donate to<br />Centro MiLA</h1>
      </div>

      <!-- Description section -->
      <div id="page-section">
        <h2 id="section-title">Your support can make a difference</h2>
        <div id="section-description">
          You can contribute to the realisation of our activities with a <br> donation, thus supporting women in their pathways out of violence.
        </div>
      </div>

      <!-- Container for donation cards -->
      <div id="cards-container">
        <div id="page-cards">
          <!-- Bank transfer donation card -->
          <div class="DonateCard">
            <h3 class="donateTitle">BANK TRANSFER</h3>
            <p class="donateIBAN">IBAN</p>
            <p class="donateText">IT89 I030 6912 7650 0000 0034 400</p>
            <p class="donateHEADING">Heading</p>
            <p class="donateText">Centro MiLA</p>
            <div class="iconDonate">
              <!-- Icon for bank transfer -->
              <Icon id="bank-icon" name="BankIcon" size=3vw />
            </div>
          </div>

          <!-- 5x1000 donation card -->
          <div class="DonateCard">
            <h3 class="donateTitle">DONATE 5X1000</h3>
            <p class="donateSubtitle">Codice Fiscale</p>
            <p class="donateText">94205400193</p>
            <p class="donateGreyText">Write this code in the box for voluntary work and non-profit organisations in your tax return.</p>
            <div class="iconDonate">
              <!-- Icon for 5x1000 donation -->
              <Icon id="hand-heart-icon" name="HandHeartIcon" size=3vw />
            </div>
          </div>
        </div>
      </div>

      <!-- Quote section -->
      <div id="quote-section">
        <div id="quote-container">
          <div id="quote-content">
            <div class="quote-title">
              <h2>Your Impact</h2>
            </div>
            <!-- Text describing the impact of donations -->
            
              <p id="quote-text">By supporting our projects you guarantee many women a welcoming reception, individual psychological support, legal counselling and support for autonomy, job orientation, professional retraining and support in accessing safe housing services.</p>
           
          </div>
        </div>
      </div>

      <!-- Icon and text at the bottom of the page -->
      <div class="heart-container">
        <!-- Heart icon -->
        <Icon id="heart-icon" name="HeartIcon" size=3vw />
      </div>
      <div class="heart-text">
        <p id="motivational-text">All this is possible thanks to all the people who <br> believe in and fight for a fairer and more just world. </p>
      </div>
    </div>
  </template>

<style scoped>
/* Style for the quote title */
.quote-title {
  margin-bottom: 24px;
}

/* Styles for donation card titles and text */
.donateTitle {
  margin: 50px 64px;
  font-weight: 600;
}
.donateSubtitle, .donateIBAN, .donateHEADING {
  margin: 10px 64px;
  font-size: 20px;
  font-weight: var(--semibold);
}
.donateText {
  margin: 0px 64px;
  font-size: 20px;
}
.donateGreyText {
  margin: 0px 64px;
  margin-top: 32px;
  font-size: 20px;
  color: #76737A;
  width: 60%;
}

/* Layout for the activities page */
#activities-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Style for the page title section */
#page-title {
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}

/* Style for the description section */
#page-section {
  margin: 160px auto;
  margin-bottom: 0px;
  width: 50vw;
  color: var(--black);
}
#section-title {
  text-align: center;
  margin-top: 0px;
  font-family: var(--font-playfair);
  font-weight: var(--bold);
  font-size: 42px;
  font-weight: 700;
  line-height: 44px;
}
#section-description {
  text-align: center;
  margin-top: 32px;
}

/* Style for the cards container */
#cards-container {
  margin-top: 160px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#page-cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
}

/* Style for individual donation cards */
.DonateCard {
  border-radius: 24px;
  border: 2px solid var(--purple);
  width: 600px;
  min-height: 380px;
  height: auto;
  line-height: 29px!important;
}
.iconDonate {
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
}

/* Style for icons used in donation cards */
#hand-heart-icon, #bank-icon, #heart-icon {
  color: var(--purple);
}
#hand-heart-icon {
  position: relative;
  bottom: 32px;
}
#bank-icon {
  position: relative;
  top: -3px;
}

/* Style for the heart container and text at the bottom */
.heart-container {
  display: flex;
  margin: auto;
}
.heart-text {
  display: flex;
  margin: auto;
  text-align: center;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 300px;
  color: var(--purple);
}

/* Style for the quote section */
#quote-section {
  margin-top: 200px;
  margin-bottom: 200px;
  background-image: url('/assets/images/donate.jpeg');
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
  color: var(--black);
}

/* Style for the quote container */
#quote-container {
  display: flex;
  flex-direction: row;
  align-items: start;
  margin: 5vw 10.42vw 7.34vw 8.7vw;
  color: white;
  width: 30vw;
}

/* Style for the quote content */
#quote-content {
  margin: 15vw 0 0 0;
}

/* Style for the quote text */
#quote-text {
  width: 700px;
  font-family: var(--font-montserrat);
  font-weight: var(--regular);
  font-size: var(--h4);
  line-height: 40px;
}

#motivational-text {
  font-size: var(--h4);
  margin: 0;
  font-weight: 700;
  font-family: var(--font-playfair);
  line-height: 40px;

}

/* Media queries for responsive design */
@media (max-width: 1500px) {
  /* Adjust DonateCard size for medium screens */
  .DonateCard {
    width: 400px;
  }
  
  /* Adjust quote section for medium screens */
  #quote-section {
    margin-bottom: 110px;
    margin-top: 110px;
  }
  
  /* Adjust icon sizes for medium screens */
  #hand-heart-icon, #bank-icon, #heart-icon {
    width: 50px;
    height: 50px;
  }
  
  #quote-container {
    width: 80vw;
  }
  
  #quote-text {
    font-size: 2.8vw;
    line-height: 3vw;
    width: 100%;
  }

  .quote-title h2{
    font-size: 5.6vw;
    line-height: 6vw;
  }
}

@media (max-width: 950px) {
  #page-section{
    width: 80vw;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  #cards-container{
    margin-top: 80px;
  }

  /* Adjust DonateCard layout for small screens */
  #page-cards {
    flex-direction: column;
    gap: 50px;
  }

  /* Adjust icon sizes for small screens */
  #hand-heart-icon, #bank-icon, #heart-icon {
    width: 30px;
    height: 30px;
  }
  
  .heart-text h4 {
    font-size: 15px;
  }

  .heart-text {
    margin-bottom: 110px;
  }

  .DonateCard {
    width: 300px;
  }

  #quote-content{
    margin-top: 5vw;
  }

  #quote-text {
    font-size: 3.4vw;
    line-height: 4vw;
    width: 100%;
  }
  
  .quote-title h2{
    font-size: 6.4vw;
    line-height: 7vw;
  }
  
  .quote-title {
    margin-bottom: 14px;
  }

  .donateTitle, .donateSubtitle, .donateIBAN, .donateHEADING, .donateText, .donateGreyText {
    margin: 20px
  }

  #motivational-text{
    font-size: var(--body4);
    line-height: var(--l-height4);
    width: 80vw;
  }
}
</style>
