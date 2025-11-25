<script lang="ts" setup>
// Import necessary components
import ServiceCard from '~/components/cards/ServiceCard.vue';
import BackwardButton from '~/components/buttons/BackwardButton.vue';
import { useRuntimeConfig } from 'nuxt/app';


import type { Service } from '~/types/types';

useHead({
  title: "Discover Services Centro MiLA",
  meta: [
    {
      name: 'description',
      content: 'Discover the compassionate services offered by MiLA to support women and children facing domestic violence. Our services include psychological counseling, job placement assistance, cultural mediation, and shelter homes. With locations in two areas, we ensure accessibility and support for all. Explore how MiLA can help you build a safer, independent life.'
    },
    {
      name: 'keywords',
      content: 'MiLA services, domestic violence support, psychological counseling, job placement, cultural mediation, shelter homes, women empowerment, children support, Milan support services, community impact, healing services, independent life, support for victims' + 
      'servizi MiLA, supporto violenza domestica, consulenza psicologica, assistenza al collocamento, mediazione culturale, case rifugio, supporto donne, supporto bambini, servizi supporto Milano, impatto sulla comunità, servizi di guarigione, vita indipendente, supporto per vittime',
    }
  ]
});

// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL;

const fetchServicesURL = baseBackendURL + "services";

const services = ref([]) as Ref<Service[]>;
const servicesPerPage = ref(6);
const startCount = ref(0);
const endCount = ref(6);
const targetSection = ref(null);

const { data } = await useFetch(fetchServicesURL);
if(data.value){
  services.value = data.value as Service[];
  console.log(services.value[0].service_id);
}

// Computed Properties
const visibleServices = computed(() => {
  return services.value.slice(startCount.value, endCount.value);
});

const totalPages = computed (() => {
  return Math.ceil(services.value.length / servicesPerPage.value)
});

const currentPage = computed(() => {
  return Math.floor(startCount.value / servicesPerPage.value) + 1;
})

// Method to increment the visible service count and adjust pagination
function showMore () {
  startCount.value += servicesPerPage.value;
  endCount.value += servicesPerPage.value;
  scrollToTarget();
};
  
// Method to decrement the visible service count and adjust pagination
function showLess() {
      startCount.value -= servicesPerPage.value;
      if (startCount.value < 0) {
        startCount.value = 0;
      }
      endCount.value -= servicesPerPage.value;
      if (endCount < servicesPerPage) {
        endCount.value = servicesPerPage.value;
      }
      scrollToTarget();
}

// Smooth scroll to the target section when pagination changes
function scrollToTarget() {
  const targetElement = targetSection.value as HTMLElement | null;
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

// Method to determine if the separator should be displayed based on the page number
function shouldDisplaySeparator(pageNumber: number): boolean {
      // If it's the last page, don't display the separator
  if (pageNumber === totalPages.value) {
    return false;
  }
  return true;
}

function retrieveCoverImageURL (serviceIndex: number): string {
  let imageList = services.value[serviceIndex].image;
  const regex = new RegExp("Cover");
  for(let image of imageList) {
    if(regex.test(image.image_id as string)) {
      return image.image_url;
    }
  }
  return "Image not found";
}

</script>

<!-- Template for the service page -->
<template>
  <div id="service-page">

    <!-- Cover section with image, title, back button -->
    <div id="page-title" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Our_Services.png)'}">
      <backward-button-wrapper>
        <BackwardButton buttonText="Our Activities" to="/activities" />
      </backward-button-wrapper>
      <h1 class="page-title">Discover<br/>Our Service</h1>
    </div>

    <!-- Section content -->
    <div id="page-section" ref="targetSection"> <!-- Target section for smooth scroll -->
      <h2 id="section-title">What We Can Do for You</h2>
      <div id="section-description">
        At MiLA, we offer a wide range of compassionate services designed to support and empower women and children
        facing domestic violence. From psychological counseling and job placement assistance to cultural mediation and
        shelter homes, our dedicated team is here to provide the help you need to build a safer, independent life. With
        locations in two areas, we ensure accessibility and support for all. Explore our services and discover how we
        can support you on your journey to healing and empowerment.
      </div>
    </div>

    <!-- Cards container -->
    <div id="cards-container">
      <div id="page-cards">
        <!-- Loop through visibleServices to render ServiceCard components -->
        <ServiceCard v-for="(service, index) in visibleServices" :key="service.service_id" :imageSrc="retrieveCoverImageURL(index)"
          :title="service.service_name" :text="service.short_description" :when="[service.service_offering_info[0].schedule, service.service_offering_info[1].schedule ]" :where="[service.service_offering_info[0].location.name, service.service_offering_info[1].location.name ]" :to="`/activities/services/${service.service_id}`" />
      </div>
      <div id="bottom-space" v-if="totalPages == 1" /> <!-- Add space at the bottom if there is only one page -->
    </div>

    <!-- Navigation buttons for pagination -->
    <div id="navigation-button" v-if="totalPages > 1">
      <!-- Backward button element -->
      <button class="nav-button" @click="showLess" :disabled="endCount <= servicesPerPage">
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
      <button class="nav-button" @click="showMore" :disabled="endCount >= services.length">
        <p> Next </p>
        <Icon id="right-icon" name="NavRightArrowIcon" size="19" />
      </button>
    </div>
  </div>

</template>

<!-- Scoped styles for the services page -->
<style scoped>
#service-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#page-title {
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}

#page-section {
  margin-top: 160px;
  margin-bottom: 0px;
  margin-left: 300px;
  width: 54vw;
  color: var(--black);
}

@media (max-width: 1500px) {
  #page-section {
    margin: 80px auto;
    margin-bottom: 0px;
  }
}

@media (max-width: 650px){
  #page-section{
    width: 80vw;
  }
}

#section-title {
  text-align: left;
  margin-top: 0px;
  font-size: 40px;
  font-weight: 900;
}

#section-description {
  text-align: left;
  margin-top: 32px;
}

@media (max-width: 1500px) {
  #section-title {
    text-align: center;
  }

  #section-description {
    text-align: center;
  }
}

#cards-container {
  margin-top: 258px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1500px) {
  #cards-container {
    margin-top: 129px;
  }
}

/* Grid layout for the cards */
#page-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  row-gap: 6vw;
  column-gap: 8vw;
}

@media (max-width: 1500px) {
  #page-cards {
    grid-template-columns: repeat(1, 1fr);
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