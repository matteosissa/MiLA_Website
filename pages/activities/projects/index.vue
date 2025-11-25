<script lang="ts" setup>
// Import necessary components
import ProjectCard from '~/components/cards/ProjectCard.vue';
import BackwardButton from '~/components/buttons/BackwardButton.vue';
import { useRuntimeConfig } from 'nuxt/app';

import type { Project } from '~/types/types';


useHead({
  title: 'Discover all Projects Centro MiLA',
  meta: [
    {
      name: 'description',
      content: 'Explore MiLA\'s ongoing and past projects aimed at supporting survivors of domestic violence. Discover initiatives funded by MiLA in collaboration with local partners, fostering healing and empowerment in Milan.',
    },
    {
      name: 'keywords',
      content: 'MiLA projects, domestic violence support, ongoing projects, past projects, empowerment initiatives, art therapy, financial independence, community support, women\'s shelter, survivor advocacy, healing projects, resilience building' +
      'progetti MiLA, supporto violenza domestica, progetti in corso, progetti passati, iniziative di empowerment, terapia artistica, indipendenza finanziaria, supporto comunitario, rifugio per donne, progetti di guarigione, supporto olistico, costruzione della resilienza',
    }
  ]
});

// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL;

const fetchProjectsURL = baseBackendURL + "projects";

// Internal data of the page 
const allProjects = ref([]) as Ref<Project[]>;
const projectsPerPage = ref(6);
const startCount = ref(0);
const endCount = ref(6);
const viewMode = ref('present');
const targetSection = ref(null);

// Fetch data from url
const { data } = await useFetch(fetchProjectsURL);
if (data.value) {
  allProjects.value = data.value as Project[];
}

// Divide present and past projects into different arrays
const ongoingProjects = computed(() => {
  let ongoingProjects: Project[] = [];
  for (let project of allProjects.value) {
    if (project.status === true) {
      ongoingProjects.push(project);
    }
  }
  return ongoingProjects;
});

const pastProjects = computed(() => {
  let pastProjects: Project[] = [];
  for (let project of allProjects.value) {
    if (project.status === false) {
      pastProjects.push(project);
    }
  }
  return pastProjects;
});

const visibleProjects = computed(() => {
  return viewMode.value === 'present' ? ongoingProjects.value.slice(startCount.value, endCount.value) : pastProjects.value.slice(startCount.value, endCount.value);
});

const totalPages = computed(() => {
  return viewMode.value === 'present'
    ? Math.ceil(ongoingProjects.value.length / projectsPerPage.value)
    : Math.ceil(pastProjects.value.length / projectsPerPage.value);
})

const currentPage = computed(() => {
  return Math.floor(startCount.value / projectsPerPage.value) + 1;
});


function showMore() {
  startCount.value += projectsPerPage.value;
  endCount.value += projectsPerPage.value;
  scrollToTarget();
}

function showLess() {
  startCount.value -= projectsPerPage.value;
  if (startCount.value < 0) {
    startCount.value = 0;
  }

  endCount.value -= projectsPerPage.value;
  if (endCount.value < projectsPerPage.value) {
    endCount.value = projectsPerPage.value;
  }

  scrollToTarget();
}

function scrollToTarget() {
  const targetElement = targetSection.value as HTMLElement | null;
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function shouldDisplaySeparator(pageNumber: number): boolean {
  if (pageNumber === totalPages.value) {
    return false;
  }
  return true;
}

function toggleViewMode(mode: string) {
  viewMode.value = mode;

  // Reset pagination settings when switching between present and past projects
  // to ensure the first page is displayed and not empty space
  startCount.value = 0;
  endCount.value = projectsPerPage.value;
}



</script>

<!-- Template for the projects page -->
<template>
  <div id="projects-page">

    <!-- Cover section with image, title, back button -->
    <div id="page-title" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Our_Projects.png)'}">
      <backward-button-wrapper>
        <BackwardButton buttonText="Our Activities" to="/activities" />
      </backward-button-wrapper>
      <h1 class="page-title">Discover<br />Our Projects</h1>
    </div>

    <!-- Section content -->
    <div id="page-section" ref="targetSection"> <!-- Target section for smooth scroll -->
      <h2 id="section-title">MiLA is Full of Opportunities</h2>
      <div id="section-description">
        At MiLA, we believe in creating meaningful opportunities for those impacted by domestic violence. We propose and
        design initiatives funded by the center in collaboration with partners like Milan Municipality and other local
        institutions.<br />
        From art therapy to financial independence, these projects embody our commitment to holistic support and
        empowerment. Explore how each endeavor fosters healing, growth, and resilience for our community.
      </div>
    </div>

    <!-- Toggle Button for present or past projects -->
    <div id="toggle-buttons">
      <button class="toggle-button" @click="toggleViewMode('present')" :disabled="viewMode === 'present'">Ongoing
        Projects</button>
      <button class="toggle-button" @click="toggleViewMode('past')" :disabled="viewMode === 'past'">Past
        Projects</button>
    </div>

    <!-- Cards container -->
    <div id="cards-container">
      <div id="page-cards">
        <!-- Loop through visibleProjects to render ProjectCard components -->
        <ProjectCard v-for="(project, index) of visibleProjects" :key="index" :imageSrc="project.image[0].image_url"
          :title="project.project_name" :text="project.short_description" :when="project.date_info" :where="project.location_info" :to="`/activities/projects/${project.project_id}`"
          :type="project.status === true ? 'present' : 'past'" />
      </div>
      <div id="bottom-space" v-if="totalPages == 1" /> <!-- Add space at the bottom if there is only one page -->
    </div>

    <!-- Navigation buttons for pagination -->
    <div id="navigation-button" v-if="totalPages > 1">
      <!-- Backward button element -->
      <button class="nav-button" @click="showLess" :disabled="endCount <= projectsPerPage">
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
      <button class="nav-button" @click="showMore"
        :disabled="endCount >= (viewMode === 'present' ? ongoingProjects.length : pastProjects.length)">
        <p> Next </p>
        <Icon id="right-icon" name="NavRightArrowIcon" size="19" />
      </button>
    </div>
  </div>

</template>

<!-- Scoped styles for the projects page -->
<style scoped>
#projects-page {
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
  width: 52vw;
  color: var(--black);
}

@media (max-width: 1500px) {
  #page-section {
    margin: 80px auto;
    margin-bottom: 0px;
  }
}

@media (max-width: 650px) {
  #page-section {
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

#toggle-buttons {
  margin-top: 132px;
  margin-bottom: 0px;
  margin-left: 300px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 1.6vw;
}

@media (max-width: 1500px) {
  #toggle-buttons {
    margin: 99px auto;
    margin-bottom: 0px;
  }
}

@media (max-width: 500px) {
  #toggle-buttons {
    flex-direction: column;
    gap: 10px;
  }
}

.toggle-button {
  width: 232px;
  height: 56px;
  padding: 0 10px;
  border-radius: 24px;
  background-color: var(--grey4);
  font-family: var(--font-montserrat);
  color: var(--black);
  font-size: var(--body3);
  font-weight: var(--medium);
  cursor: pointer;
  border: thin solid var(--grey4);
  transition: background-color var(--transition);
}

.toggle-button:hover {
  background-color: var(--grey3);
  color: var(--grey1);
}

.toggle-button:active {
  background-color: var(--grey2);
  color: var(--black);
}

.toggle-button[disabled] {
  background-color: var(--orange);
  color: var(--white);
  font-weight: var(--semibold);
  cursor: not-allowed;
}

#cards-container {
  margin-top: 64px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
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