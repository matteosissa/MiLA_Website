<script lang="ts" setup>

import { useRoute, useFetch, useRuntimeConfig } from 'nuxt/app';
import BackwardButton from '~/components/buttons/BackwardButton.vue';

// Import interfaces for handling data conversion from json server response
import type { Project, Manager, Image, Sponsor } from '~/types/types';



// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL;

// Reactive variable containing all the data coming from the server
const projectData = ref() as Ref<Project>;


// Extract project id from url and build api server call
const projectID = useRoute().params.id as string;
const projectURL = baseBackendURL + "projects/" + projectID;

// Fetch data of the current project from the server
const { data, error } = await useFetch(projectURL);
if(data.value){
  const projects = data.value as Project[];
  projectData.value = projects[0];
  
  useHead({
    title: projectData.value.project_name + ' | Discover Projects Centro MiLA',
    meta: [
      {
        name: 'description',
        content: projectData.value.short_description,
      },
      {
        name: 'keywords',
        content: projectData.value.project_name + ', ' + projectData.value.location_info + ', ' + projectData.value.date_info + ', anti-violence project, domestic abuse support,  project manager, event details, participants, sponsors'
        + 'progetto contro la violenza, programma di empowerment delle donne, supporto per vittime di abusi domestici, rifugio per donne in crisi, prevenzione della violenza di genere',
      }
    ]
  });
} else {
  console.log('Error fetching project:', error);
}

// Objects for dynamic styling of elements
const coverStyling = ref({
  backgroundImage: projectData.value && projectData.value.image && projectData.value.image.length > 0 ? `url(${projectData.value.image[0].image_url})` : '',
});


// Computed values based on the fetched data
const idNumber = computed(() => {
  const regex = /project\_(\d+)/;
  const match = projectID.match(regex);
  if(match){
    return Number(match[1]);
  } else {
    return 1;
  }
});

const hasNext = computed(() => {
  if(idNumber.value < 8){
    return true;
  } else {
    return false;
  }
});

const hasPrevious = computed(() => {
  if(idNumber.value > 1){
    return true;
  } else {
    return false;
  }
});

const nextProjectURL = computed(() => { 
  if(idNumber.value < 9 ) {
    const nextProjectIdNumber = idNumber.value + 1;
    return "project_" + nextProjectIdNumber;
  } else {
    return "project_" + idNumber.value;
  }
  
});

const previousProjectURL = computed(() => { 
  if(idNumber.value > 0){
    const previousProjectIdNumber = idNumber.value - 1;
    return "project_" + previousProjectIdNumber;
  } else {
    return "project_" + idNumber.value;
  }
});

const managerFullName = computed(() => { return projectData.value.person?.name + ' ' + projectData.value.person?.surname});



</script>


<template>

  <!-- Wrapper for the whole page -->
  <div v-if="projectData" class="page-wrapper">


    <!-- Cover section with the title -->
    <div class="cover-section-div" :style="coverStyling">
      <backward-button-wrapper>
        <BackwardButton buttonText="Our Projects" to="/activities/projects" />
      </backward-button-wrapper>
      <div class="page-title">
      <h1> {{ projectData.project_name }} </h1>
      <NuxtLink :to="`/about-us/people/${projectData.person?.person_id}`">
        <h2 id="manager-subtitle"> Manager: {{ managerFullName }}</h2>
      </NuxtLink>
      </div>
    </div>


    <!-- Project introduction section -->
    <div class="project-description-div horizontal-padding vertical-spacing">
      <h2> {{ projectData.project_name }} </h2>
      <p> {{ projectData.description }}</p>
    </div> 


    <!-- Info section with info on location, date and participants -->
    <div class="vertical-spacing" style="display: flex; justify-content: center">  <!-- Just to center the section -->
      
      <div class="purple-border">
        <h2 class="event-info-title"> Event Description</h2>
      
        <div class="event-info-div">
        
          <!-- Where info -->
         <div class="single-info-container-div">
            <div class="icon-and-title-info-div">
              <Icon class="info-icon" name="MapPinIcon" size="25px"></Icon>
              <span class="info-title">Where</span>
            </div>
           <span class="info-text"> {{ projectData.location_info }} </span>
         </div>

          <!-- When info -->
          <div class="single-info-container-div">
            <div class="icon-and-title-info-div">
              <Icon class="info-icon" name="ClockIcon" size="25px"></Icon>
              <span class="info-title">When</span>
            </div>
            <span class="info-text"> {{ projectData.date_info }} </span>
          </div>

          <!-- Participants info -->
          <div id="participants-div" class="single-info-container-div">
            <div class="icon-and-title-info-div">
              <Icon class="info-icon" name="PeopleIcon" size="25px"></Icon>
              <span class="info-title">Participants</span>
            </div>
            <span class="info-text"> {{ projectData.participants_info }} </span>
          </div>
        </div>
      </div>
    </div>


    <!-- Additional Information section -->
    <div class="additional-information-div vertical-spacing">
      <h2> Additional Information </h2>
      <p> {{ projectData.additional_info }}</p>
      <button type="button" class="contact-us-button" @click="navigateTo('/contacts')"> Contact Us </button>
    </div>


    <!-- Sponsor section -->
    <h2 class="sponsor-section-title vertical-spacing horizontal-padding"> This project was possible thanks to </h2>
    <div class="sponsor-image-container-div horizontal-padding">      
      <img class="sponsor-image" v-for="(sponsor, index) in projectData.sponsor" :key="index" :src="sponsor.logo_url" :alt="sponsor.sponsor_name">
    </div>
  

    <!-- Final section with descriptive images -->
    <div class="illustrative-images-container-div vertical-spacing">
      <div v-for="(image, index) in projectData.image.slice(1)" :key="index" :style="{ backgroundImage: `url(${image.image_url})`}">
      </div>
    </div>


    <!-- Navigation links at the end of the page (enclosed in a nav section) -->
    <nav class="vertical-spacing">
      
      <!-- Backward button  -->
        <button type="button" class="navigation-link" :disabled="!hasPrevious" @click="navigateTo(previousProjectURL)">
          <Icon name="NavLeftArrowIcon" size="19" />
          <span> Previous </span>
        </button>

      <!-- Even if the link is static here, a button is used to have consistency in layout -->
      <button class="central-nav-link" @click="navigateTo('/activities/projects')">
        <span> All Projects </span>
      </button>

      <!-- Next button -->
      <button type="button" class="navigation-link" :disabled="!hasNext" @click="navigateTo(nextProjectURL)" style="margin-right:10px">
        <span> Next </span>
        <Icon name="NavRightArrowIcon" size="19" />
      </button>

    </nav>


  </div>
  <div v-else style="padding: 200px 0; text-align: center;">
    <h2>Project not found</h2>
    <p>The project you're looking for could not be loaded.</p>
    <NuxtLink to="/activities/projects" style="color: var(--purple); text-decoration: underline;">Back to all projects</NuxtLink>
  </div>
</template> 



<style scoped>

*,
* ::before,
* ::after {
  box-sizing: border-box;
}

  /*-------------------------------Resetting some styles for the page (mobile-first design)-------------------------------*/
  
  .page-wrapper {
    font-size: 16px;  /* Normal text font-size */
  }
  .page-wrapper * {
    box-sizing: border-box;
  }
  .page-wrapper h1 {
    font-size: 38px;  /* Title font-size */
    line-height: 1.2em;
    font-weight: 900;
  }
  .page-wrapper h2 {
    font-size: 25px;  /* Sub-titles font-size */
    line-height: 1.3em;
    font-weight: 700;
  }
  .page-wrapper h3 {
    font-size: 19px; 
    font-weight: 600;
  }
  .page-wrapper p, 
  .page-wrapper a,
  .page-wrapper span
  .page-wrapper button {
    font-size: 16px;
  }



  /*----------------------------------General classes for consistent layout (mobile-first design)----------------------------------------*/
  
  .vertical-spacing {
    margin-top: 96px;
  }

  .horizontal-padding {
    padding: 0 36px;
  }




  /*--------------------------------------------------STYLING OF THE PAGE---------------------------------------------------------------*/


  /*---------------------------------------------Cover section with the title----------------------------------------------------------*/
  
  .cover-section-div {    /* Cover image dynamically added in javascript */
    background-size: cover;
    background-position: top right;
    padding: 25% 7% 13% 0;
  }

@media(max-width:1400px){
  .cover-section-div h2{
    font-size: 3.4vw !important;
    line-height: 3.5vw;
    max-width: 60vw;
  }
}

  #manager-subtitle {
    color: white;
    margin-top: 0.5em;
    font-size: 24px;
    font-weight: 600;
  }



  /*-------------------------------------Info section with info on location, date and participants---------------------------------------------*/

  .purple-border {
    min-width: 180px;
    max-width: 230px;
    border: 1px solid var(--purple);
    border-radius: 1cap;
    padding: 2.5em 2em;
  }

  .event-info-title {
    text-align: center;
    margin-bottom: 1em;
    font-weight: 600;
  }

  .event-info-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
  }
 
  .single-info-container-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }

  .icon-and-title-info-div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: baseline;
    gap: 0.2em;
  }

  .info-icon {
    color: var(--purple);
  }

  .single-info-container-div .info-title {
    font-size: 1.2em;
    font-weight: 600;
  }

  .info-text {
    text-align: center;
  }

  

  /*--------------------------------------------Additional information section-------------------------------------------------*/

  .additional-information-div {
    background-color: var(--lilac);
    padding: 4.8em 3.5em;
    text-align: center;
  }

  .contact-us-button {
    padding: 0.7em;
    
    background-color: var(--purple);
    color: white;
    border: none;
    border-radius: 0.7cap;
    cursor: pointer;

    font-family: var(--font-montserrat);
    font-size: inherit;

    margin-top: 3em;
  }
  .contact-us-button:hover {
    background-color: var(--purple-hover);
  }
  .contact-us-button:active {
    background-color: var(--purple-active);
  }



  /*---------------------------------------------------Sponsor section---------------------------------------------------------*/
  
  .sponsor-section-title {
    text-align: center;
  }

  .sponsor-image-container-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 3em;
    margin-top: 2em;
  }

  .sponsor-image {
    width: 150px;
  }
  


  /*--------------------------------------------Final section with descriptive images------------------------------------------*/

  .illustrative-images-container-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60% 40%;
    gap: 0.7em;
    padding: 0 1.5em; 
    min-height: 80vw;
  }

  .illustrative-images-container-div div:first-child{
    grid-column: span 2;
  }

  .illustrative-images-container-div div {
    height: 100%;
    background-position: center;
    background-size: cover;

  }



  /*------------------------------------------------Navigation links (end of page)---------------------------------------------*/

  .page-wrapper nav {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin-bottom: 10em;
    gap: 0.4em;
    margin-top: 15em;
  }

  .navigation-link {
    border: none;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: black;
    cursor: pointer;
    font-size: inherit;
    font-family: var(--font-montserrat);
  }
  .navigation-link:disabled {
    color: var(--grey3);
    cursor: not-allowed;
  }
  .navigation-link:hover:not(:disabled) {
    color: var(--purple-hover);
  }
  .navigation-link:active:not(:disabled) {
    color: var(--purple-active);
  }

  .central-nav-link {
    border: none;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--purple);
    cursor: pointer;
    font-size: inherit;
    font-family: var(--font-montserrat);
  }
  .central-nav-link:hover:not(:disabled) {
    color: var(--purple-hover);
  }
  .central-nav-link:active:not(:disabled) {
    color: var(--purple-active);
  }




  /*-------------------------------Media queries for responsive design-TABLET-----------------------------*/

  @media screen and (min-width: 760px){
    
    /*--------------------------------Font size recalculation----------------------------*/
    .page-wrapper {
      font-size: 20px;  /* Normal text font-size */
    }
    .page-wrapper h1 {
      font-size: 70px;  /* Title font-size */
      line-height: 1.2em;
    }
    .page-wrapper h2 {
      font-size: 40px;  /* Sub-titles font-size */
      line-height: 1.3em;
    }
    .page-wrapper h3 {
      font-size: 25px;  /* Manager name sub-title font-size */
    }
    .page-wrapper p, 
    .page-wrapper a,
    .page-wrapper span {
      font-size: 20px;
    }

    /*----------------------------------------Spacing between elements-----------------------------*/

    .vertical-spacing {
      margin-top: 160px;
    }
    .horizontal-padding {
      padding: 0 120px;
    }

    #manager-subtitle {
      font-size: 32px;
    }

    /*----------------------------------Info section horizontal refactoring------------------------*/

    .purple-border {
      min-width: none;
      max-width: none;
      width: 90%;
      padding: 3em 1.5em;
    }

    .event-info-div {
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: start;
      gap: 3em;
    }

    .single-info-container-div {
      align-items: start;
    }
    #participants-div {
      align-items: center;
    }

    .info-text {
      text-align: left;
      max-width: 315px;
    }


    /*----------------------------------Additional Information section------------------------*/
    .additional-information-div {
      padding: 7em 9em;
    }


    /*----------------------------------------Sponsor section---------------------------------*/
    .sponsor-image-container-div {
      gap: 5em;
      margin-top: 4em;
    }

    .sponsor-image {
      width: 180px;
    }


    /*--------------------------------------Illustrative images------------------------------*/
    .illustrative-images-container-div {
      gap: 2.4em;
      padding: 0 4.5em;
    }
  }


  /*-------------------------------Media queries for responsive design-DESKTOP-----------------------------*/

  @media screen and (min-width: 1100px) {
      /*--------------------------------Font size recalculation----------------------------*/
    .page-wrapper {
      font-size: 24px;  /* Normal text font-size */
    }
    .page-wrapper h1 {
      font-size: 96px;  /* Title font-size */
      line-height: 1.2em;
    }
    .page-wrapper h2 {
      font-size: 42px;  /* Sub-titles font-size */
      line-height: 1.3em;
    }
    .page-wrapper h3 {
      font-size: 42px;  /* Manager name sub-title font-size */
    }
    .page-wrapper p, 
    .page-wrapper a,
    .page-wrapper span {
      font-size: 24px;
    }


    /*------------------------------------Spacing between elements-----------------------------*/

    .vertical-spacing {
      margin-top: 160px;
    }
    .horizontal-padding {
      padding: 0 260px;
    }

    #manager-subtitle {
      font-size: 40px;
    }

    /*----------------------------------Additional Information section------------------------*/
    .additional-information-div {
      padding: 7em 12em;
    }


    /*----------------------------------------Sponsor section---------------------------------*/
    .sponsor-image-container-div {
      gap: 5em;
      margin-top: 3em;
    }

    .sponsor-image {
      width: 250px;
    }

    .illustrative-images-container-div {
      margin-top: 15em;
      gap: 4em;
      padding: 0 10em;
    }

    /*-----------------------------------------Navigation section------------------------------*/
    .page-wrapper nav {
      margin-bottom: 16em;
      gap: 3em;
      margin-top: 20em
    }
  }

  /*-------------------------Refactoring of the info section for very large screens------------------*/

  @media screen and (min-width: 1500px) {
    
    .purple-border {
      max-width: fit-content;
      padding: 2.7em 4.5em;
    }

    .event-info-div {
      gap: 6em;
    }
  }


</style>