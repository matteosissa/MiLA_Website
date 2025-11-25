<script lang="ts" setup>
// Import necessary components
import PersonCard from '~/components/cards/PersonCard.vue';
import BackwardButton from '~/components/buttons/BackwardButton.vue';
import { ref } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
// Import custom types to handle person data
import type { Person } from '~/types/types'

useHead({
  title: 'People at centro MiLA',
  meta: [
    {
      name: 'description',
      content: 'The staff at Centro MiLA is going to support women and children victims of any type of violence towards a better and brighter future.' + 
      'Discover here the specialist that can provide you all the help you need for a better life.',
    },
    {
      name: 'keywords',
      content: 'MiLa team, anti-violence centre Milan staff, MiLa counselors, legal experts MiLa, social workers MiLa, MiLa volunteers, domestic violence support team, Milan women\'s shelter staff, MiLa team profiles, MiLa staff details, support for abuse victims Milan, MiLa team members, MiLa\'s compassionate team, Milan domestic violence support, MiLa mission team, women\'s aid team Milan, MiLa\'s people, MiLa staff contact' +
      'personale centro anti-violenza Milano, consulenti MiLa, esperti legali MiLa, assistenti sociali MiLa, volontari MiLa, supporto violenza domestica, personale rifugio per donne Milano, profili team MiLa, dettagli personale MiLa',
    }
  ]
});

// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL; 

// Create references for data to be observed
const people = ref([] as Person[]);
let peoplePerPage = ref(12);
let startCount = ref(0);
let endCount = ref(12);
const targetSection = ref(null);  // reference to fixed element for scrolling
const peopleUrl = baseBackendURL + "people";

// Fetch data from the api
const { data, error } = await useFetch(peopleUrl);
if(data.value !== null){
  people.value = data.value as Person[];
} else { 
  console.log(error);
}


// Computed property to dynamically calculate the visible people based on pagination settings
let visiblePeople = computed(() => { return people.value.slice(startCount.value, endCount.value) });

// Computed property to calculate the total number of pages based on the people count and pagination settings
let totalPages = computed(() => { return Math.ceil(people.value.length / peoplePerPage.value) });

// Computed property to calculate the current page number based on the start count and people per page
let currentPage = computed(() => { return Math.floor(startCount.value / peoplePerPage.value) + 1 });


// Function to increment the visible people count and adjust pagination
function showMore(){
  startCount.value += peoplePerPage.value;
  endCount.value += peoplePerPage.value;
  scrollToTarget();
}

// Function to decrement the visible people count and adjust pagination
function showLess() {
  startCount.value -= peoplePerPage.value;
  if(startCount.value < 0){
    startCount.value = 0;
  }
  endCount.value -= peoplePerPage.value;
  if(endCount.value < peoplePerPage.value){
    endCount.value = peoplePerPage.value;
  }
  scrollToTarget();
}

// Smooth scroll to the target section when pagination changes
function scrollToTarget() {
  const targetElement = targetSection.value as HTMLElement | null;
  if(targetElement){
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to determine if the separator should be displayed based on the page number
function shouldDisplaySeparator(pageNumber: number): boolean {
  if(pageNumber === totalPages.value){
    return false;
  }
  return true;
}

</script>



<template>
  <div id="people-page">

    <!-- Cover section with image, title, back button -->
    <div id="page-title" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Our_People.png)'}">
      <backward-button-wrapper>
        <BackwardButton buttonText="About Us" to="/about-us" />
      </backward-button-wrapper>
      <h1 class="page-title">Discover<br />Our People</h1>
    </div>

    <!-- Section content -->
    <div id="page-section" ref="targetSection"> <!-- Target section for smooth scroll -->
      <h2 id="section-title">MiLA’s Team</h2>
      <div id="section-description">
        Our compassionate team of counselors, legal experts, social workers, and
        volunteers is dedicated to empowering women and children facing domestic violence.
        Discover the people who make our mission possible.
      </div>
    </div>

    <!-- Cards container -->
    <div id="cards-container">
      <div id="page-cards">
        <!-- Loop through visiblePeople to render PersonCard components -->
        <PersonCard v-for="(person, index) in visiblePeople" :key="index" :imageSrc="person.profile_image_url"
          :name="person.name + ' ' + person.surname" :job="person.job_title" :to="`/about-us/people/${person.person_id}`" :text="person.short_description === null ? '' : person.short_description"/>
      </div>
      <div id="bottom-space" v-if="totalPages == 1"/> <!-- Add space at the bottom if there is only one page -->
    </div>

    <!-- Navigation buttons for pagination -->
    <div id="navigation-button" v-if="totalPages > 1">
      <!-- Backward button element -->
      <button class="nav-button" @click="showLess" :disabled="endCount <= peoplePerPage">
        <Icon id="left-icon" name="NavLeftArrowIcon" size="19" />
        <p> Back </p>
      </button>

      <!-- Dynamic page number generation -->
      <p id="page-number">
        <span v-for="pageNumber in totalPages" :key="pageNumber">
          <span :class="{ 'active-number': pageNumber === currentPage }">{{ pageNumber }}</span>
          <span v-if="shouldDisplaySeparator(pageNumber)" id="separator"></span>
        </span>
      </p>

      <!-- Next button element -->
      <button class="nav-button" @click="showMore" :disabled="endCount >= people.length">
        <p> Next </p>
        <Icon id="right-icon" name="NavRightArrowIcon" size="19" />
      </button>
    </div>
  </div>

</template>

<!-- Scoped styles for the people page -->
<style scoped>
#people-page {
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

/* Grid layout for the cards */
#page-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  row-gap: 5vw;
  column-gap: 3.2vw;
}

@media (max-width: 1580px) {
  #page-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1050px) {
  #page-cards {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 3.5rem;
  }
}

#bottom-space {
  margin-bottom: 400px;
}

@media (max-width: 1500px) {
  #bottom-space {
    margin-bottom: 200px;
  }
}

#navigation-button {
  margin-top: 220px;
  margin-bottom: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2.7vw;
}

@media (max-width: 1500px) {
  #navigation-button {
    margin-top: 110px;
    margin-bottom: 200px;
  }
}

.nav-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-family: var(--font-montserrat);
  color: var(--black);
  font-size: var(--body3);
  font-weight: var(--regular);
  cursor: pointer;
  border: none;
  transition: background-color var(--transition);
}

.nav-button:hover {
  color: var(--purple-hover);
}

.nav-button:active {
  color: var(--purple-active);
}

.nav-button[disabled] {
  color: var(--grey3);
  cursor: not-allowed;
}

.nav-button[disabled]:hover {
  color: var(--grey3);
  cursor: not-allowed;
}

#left-icon {
  margin-top: 0px;
  margin-right: 5px;
}

#right-icon {
  margin-top: 2px;
  margin-left: 5px;
}

#page-number {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-family: var(--font-montserrat);
  color: var(--grey2);
  font-size: var(--body3);
  font-weight: var(--regular);
}

.active-number {
  color: var(--black);
  font-weight: var(--medium);
}

#separator {
  display: inline-block;
  width: 2.5vw;
}
</style>