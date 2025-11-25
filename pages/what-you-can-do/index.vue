<script lang="ts" setup>
// Import the DiscoverCard component
import DiscoverCard from '~/components/cards/DiscoverCard.vue';

useHead({
  title: "What You Can Do to Support the Cause at Centro MiLA",
  meta: [
    {
      name: 'description',
      content: 'Discover how to support MiLA in empowering women and fighting against violence. Donate to help women find a pathway out of violence or become a volunteer to contribute directly to our community efforts.'
    },
    {
      name: 'keywords',
      content: 'support MiLA, donate to women\'s shelter, volunteer against violence, empower women, fight against domestic violence, community support, women\'s rights' + 
      'supporto MiLA, donazione a rifugio per donne, volontariato contro la violenza, empowerment delle donne, lotta contro la violenza domestica, supporto comunitario, diritti delle donne',
    }
  ]
});
</script>


<template>
  <!-- Main container for the activities page -->
  <div id="activities-page">
    <!-- Title section -->
    <div class="cover" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_What_you_can_do.png)'}">
      <h1 class="page-title">Discover how to<br />Support MiLA</h1>
    </div>

    <!-- Action section -->
    <div class="page-section">
      <h2 id="section-title">Take Action!</h2>
      <div id="section-description">
        Join us in our mission to empower women and fight against violence.<br>
        By donating or volunteering with us, you become part of a community dedicated to creating a safer and more equitable world for all.
      </div>
    </div>

    <!-- Cards container -->
    <div class="cards-container">
        <!-- DiscoverCard for donations -->
        <DiscoverCard title="Donate to MiLA"
          text="Even with a small donation, you can contribute to the realisation of our activities, thus supporting women in their pathways out of violence."
          to="/what-you-can-do/donate" />
        <!-- DiscoverCard for volunteering -->
        <DiscoverCard title="Become a Volunteer!"
          text="Contribute to the fight against violence against women and for rights by becoming a volunteer in our centre."
          to="/what-you-can-do/volunteering" />
    </div>

    <!-- Quote section -->
    <div class="quote-section">
      
      <img class="image-decoration" src="assets/images/fiori-e-cuori.svg" alt="">
      
      <div id="quote-container">
        <!-- Quote icon -->
        <Icon id="quote-icon" name="QuoteIcon" size="50px" />
        <!-- Quote content -->
        <div id="quote-content">
          <div id="quote-text">
            Volunteering at MiLA has changed my life. Seeing the strength of the women and children we help is truly inspiring. If you want to make a real difference, come join us or consider donating. Together, we can create a caring and safe community.
          </div>
          <div id="quote-author">
            Elena, MiLA volunteer
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>

*,
* ::before,
* ::after {
  box-sizing: border-box;
}

/* Style for the decorative flower image */
.image-decoration {
  position: absolute;
  opacity: 0.3;
  left: 40%;
  bottom: -20%;
}

/* Main container style */
#activities-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Style for the title section */
.cover {
  background-size: cover;
  height: 50vw;
  position: relative;
}

.page-title {
  position: absolute;
  bottom: 2em;
}

/* Style for the action section */
.page-section {
  text-align: center;
  padding: 160px 20%;
  color: var(--black);
}

/* Style for the action section title */
#section-title {
  text-align: center;
  margin-top: 0px;
  font-family: var(--font-playfair);
  font-weight: var(--bold);
  font-size: 42px;
}

/* Style for the action section description */
#section-description {
  text-align: center;
  margin-top: 32px;
}

/* Style for the cards container */
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 3em; 
  padding: 0 2em;
}

/* Style for the quote section */
.quote-section {
  margin: 15em 0;
  background-image: url('/assets/images/what-you-can-do-pageImage.png');
  object-fit: cover;
  background-position: center;
  color: var(--black);
  padding: 15% 40% 8% 6%;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
}

/* Style for the quote container */
#quote-container {
  display: flex;
  align-items: start;
  background-color: #E0D6F2;
  opacity: 0.8;
  border-radius: 24px;
}

/* Style for the quote icon */
#quote-icon {
  margin-top: 1.4em;
  width: 200px;
  margin-left: 50px;
  color: var(--purple);
}

/* Style for the quote content */
#quote-content {
  display: flex;
  flex-direction: column;
  padding: 3em 3em 1em 0;
}

/* Style for the quote text */
#quote-text {
  font-family: var(--font-montserrat);
  font-weight: var(--regular);
  font-size: var(--h4);
  line-height: 37px;
  
}

/* Style for the quote author */
#quote-author {
  margin-top: 28px;
  margin-bottom: 28px;
  font-family: var(--font-montserrat);
  font-weight: var(--medium);
  font-size: var(--body3);
  font-style: italic;
}

@media screen and (max-width: 1000px){
  #quote-text {
  font-size: 24px;  
}

#quote-author {
  margin-top: 20px;
  font-size: 20px;
}

.quote-section {
  padding: 15% 20% 8% 6%;
}
}

@media screen and (max-width: 700px){
  #quote-text {
  font-size: 16px; 
  line-height: 20px; 
}

#quote-author {
  font-size: 14px;
}

.page-section {
  padding: 160px 10%;
}
}



</style>