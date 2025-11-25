<script lang="ts" setup>
// Import necessary components
import DiscoverCard from '~/components/cards/DiscoverCard.vue';

useHead({
  title: "Services & Projects Centro MiLA",
  meta: [
    {
      name: 'description',
      content: 'Explore MiLA\'s activities dedicated to helping women and children affected by domestic violence. Discover our supportive services like counseling and legal assistance, as well as impactful projects promoting children\'s well-being and advocating for women\'s rights.'
    },
    {
      name: 'keywords',
      content: 'MiLA activities, domestic violence support, women empowerment, children well-being, counseling services, legal assistance, safe housing, advocacy projects, awareness campaigns, community impact, women\'s rights, empowerment programs' + 
      'attività MiLA, supporto violenza domestica, supporto donne, benessere bambini, servizi di consulenza, assistenza legale, alloggi sicuri, progetti di advocacy, campagne di sensibilizzazione, impatto sulla comunità, diritti delle donne, programmi di empowerment',
    }
  ]
});
</script>

<!-- Template for the activities page -->
<template>
  <div id="activities-page">
    <!-- Cover section with image and title -->
    <div id="page-title" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Our_Activities.png)'}">
      <h1 class="page-title">Explore<br />Our Activities</h1>
    </div>

    <!-- Section content -->
    <div id="page-section">
      <h2 id="section-title">MiLA Activities</h2>
      <div id="section-description">
        At MiLA, we are dedicated to helping women and children affected by
        domestic violence through a variety of impactful services and projects.<br />Explore
        our activities to see how we can support your journey to a safer life.
      </div>
    </div>

    <!-- Cards for discovering services and projects -->
    <div id="cards-container">
      <div id="page-cards">
        <DiscoverCard title="Discover all the Services"
          text="Discover our wide array of supportive services, including counseling, legal assistance, and safe housing, all aimed at empowering women to build safe, empowered and independent lives."
          to="/activities/services" />
        <DiscoverCard title="Discover all the Projects"
          text="Explore the diverse projects we fund and organize, designed to create meaningful experiences, joyful moments for children, and impactful advocacy and awareness for women's rights."
          to="/activities/projects" />
      </div>
    </div>

    <!-- Quote section -->
    <div id="quote-section">
      <div id="quote-container">
        <Icon id="quote-icon" name="QuoteIcon" size=8vw />
        <div id="quote-content">
          <div id="quote-text">
            At MiLA, we understand the immense courage it takes to seek help. We
            are here to listen, support, and empower you every step of the way.
            Together, we can build a brighter, safer future.
          </div>
          <div id="quote-author">
            Sofia Conti, Centre Coordinator
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Scoped styles for the activities page -->
<style scoped>
#activities-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#page-title {
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}

h2 {
  font-size: var(--h3);
}

#page-section {
  margin: 160px auto;
  margin-bottom: 0px;
  width: 50vw;
  color: var(--black);
}

@media (max-width: 1500px) {
  #page-section {
    margin-top: 80px;
  }
}

@media (max-width: 650px){
  #page-section{
    width: 80vw;
  }
}

#section-title {
  text-align: center;
  margin-top: 0px;
}


#section-description {
  text-align: center;
  margin-top: 32px;
}

#cards-container {
  margin-top: 160px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1500px) {
  #cards-container {
    margin-top: 80px;
  }
}

#page-cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
}

@media (max-width: 1500px) {
  #page-cards {
    flex-direction: column;
    gap: 80px;
  }
}

#quote-section {
  margin-top: 330px;
  margin-bottom: 345px;
  background-image: url('/assets/images/our-activities-index-quote.png');
  background-size: cover;
  width: 100%;
  height: calc(69.5vw / 2);
  color: var(--black);
}

@media (max-width: 1500px) {
  #quote-section {
    margin-top: 165px;
    margin-bottom: 172.5px;
  }
}

#quote-container {
  display: flex;
  flex-direction: row;
  align-items: start;
  margin: 7.2vw 10.42vw 7.34vw 59.7vw;
  width: 30vw;
}

#quote-icon {
  margin-top: -1.8vw;
  width: 100%;
  color: var(--purple);
}

#quote-content {
  margin: 1.563vw 0 0 0;
  display: flex;
  flex-direction: column;
}

#quote-text {
  font-family: var(--font-montserrat);
  font-weight: var(--regular);
  font-size: var(--h4);
  line-height: 2vw;
}

#quote-author {
  margin-top: 2.1vw;
  font-family: var(--font-montserrat);
  font-weight: var(--medium);
  font-size: var(--body3);
  font-style: italic;
}

@media (max-width: 1700px) {
  #quote-container {
    margin: 9vw 0 10vw -10vw;
    width: 100%;
  }

  #quote-icon {
    min-width: 100%;
    margin: -3% -35% 0 -25%;
  }

  #quote-content {
    margin: 0 0 0 -10vw;
  }

  #quote-text {
    font-size: 2.7vw;
    line-height: 2.8vw;
  }
  
  #quote-author {
    font-size: 2.2vw;
    line-height: 2.5vw;
  }
}

@media (max-width: 500px){
  #quote-text{
    font-size: var(--body1);
    line-height: var(--l-height1);
  }
  #quote-author{
    font-size: var(--body1);
    line-height: var(--l-height1);
  }
  #quote-section{
    height: auto;
  }
}
</style>