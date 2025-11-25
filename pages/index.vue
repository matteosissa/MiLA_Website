<script lang="ts" setup>
import SecondaryButton from '~/components/buttons/SecondaryButton.vue';
import MainButton from '~/components/buttons/MainButton.vue';
import ActivityCard from '~/components/cards/ActivityCard.vue';
import MapCardSmall from '~/components/cards/MapCardSmall.vue';
import { useRuntimeConfig } from 'nuxt/app';

import type { Project, Service } from '~/types/types';

// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL;

const fetchServicesURL = baseBackendURL + "services";
const fetchOngoingProjectsURL = baseBackendURL + "projects?status=ongoing";

const services = ref([]) as Ref<Service[]>;
const projects = ref([]) as Ref<Project[]>;

// Fetch services from the DB
const { data:serviceData } = await useFetch(fetchServicesURL);
if(serviceData.value){
  services.value = serviceData.value as Service[];
}

// Fetch ongoing projects from the DB
const { data: projectData } = await useFetch(fetchOngoingProjectsURL);
if(projectData.value){
  projects.value = projectData.value as Project[];
}

const visibleProjects = computed(() => {
  return projects.value.slice(0, 3);
});

// Retrieve the cover image for the services
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

<template>

  <div id="home-cover" :style="{ backgroundImage: `url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Homepage.png)`}">
    <div class="page-title">
      <h1>Centro MiLA</h1>
      <h2>Empowering women on their journey beyond abuse, towards healing and renewal.</h2>
    </div>
  </div>

  <div id="home-intro">
    <h3>Empowering Survivors</h3>
    <p class="dynamic-p">Empowering individuals, families, and communities to break the cycle of violence through support, education, and advocacy.</p>
    <NuxtLink to="/contacts">Do you need help? Contact Us</NuxtLink>
  </div>

  <div class="activity-container">
    <h3>Our Services</h3>
    <div class="grid-3">
      <ActivityCard v-for="(service, index) of services" :key="index" :imageSrc="retrieveCoverImageURL(index)" 
      :title="service.service_name" :text="service.short_description" :to="`/activities/services/${service.service_id}`" />
    </div>
  </div>

  <div class="activity-container">
    <h3>Our Projects</h3>
    <div class="grid-3">
      <ActivityCard v-for="(project, index) of visibleProjects" :key="index" :imageSrc="project.image[0].image_url" 
      :title="project.project_name" :text="project.short_description" :to="`/activities/projects/${project.project_id}`" />
    </div>
    <MainButton buttonText="Discover All Projects" buttonLength="long" to="/activities/projects"
    style="margin-top: 75px;"/>
  </div>

  <div id="home-about" >
    <h2 style="color: var(--white);" >Centro MiLA <br>
      a safe place since 2004</h2>
    <div>
      <h3 style="color: var(--white);" >Our Centre</h3>
      <p>Since opening our doors in 2004, Centro MiLA has been a steadfast ally for women and children facing domestic violence. <br><br>
          From our humble beginnings, we've expanded to offer a wide range of services and initiatives, all rooted in our commitment to empowerment and advocacy. 
          Today, MiLA stands as a testament to the resilience of survivors and the power of collective action.</p>
      <SecondaryButton buttonText="About Us" buttonLength="short" to="about-us"/>
    </div>
  </div>
  
  <div style="z-index: 1; position: relative;">
    <img src="/assets/images/Group.jpg" alt="" id="image-group">
    <div id="home-locations" >
      <h3>One Centre, Two Locations</h3>
      <p id="home-locations-p" class="dynamic-p">You can find us in Bovisa and in Zona Farini, choose the location closest to you. We are to help you.</p>
      <div id="home-locations-cards">
        <MapCardSmall title="Centro MiLA Bovisa" address="Via Candiani 72, 20158 Milano" email="centromila.bovisa@gmail.com" phone="+39 345697365" to="/about-us/locations" />
        <MapCardSmall title="Centro MiLA Farini" address="Via Valtellina 20, 20159 Milano" email="centromila.farini@gmail.com" phone="+39 344677462" to="/about-us/locations" />
      </div>
    </div>

    <div id="home-help" >
      <div class="needHelp" >
        <p class="semiboldText" >Do you need help?</p>
        <p>Our crisis line is open everyday, at every hour.</p>
        <p class="semiboldText" style="font-size: var(--h3); line-height: 44px;">0521 248886</p>
      </div>
      <div>
        <p class="semiboldText" style="font-size: var(--h3); line-height: 44px;">Call 1522</p>
        <p>To contact an anti-violence centre</p>
      </div>
      <hr style="height: 150px; border-left: 4px solid var(--purple); border-bottom: 0px;" id="vertical-line">
      <div>
        <p class="semiboldText" style="font-size: var(--h3); line-height: 44px;">Call 112</p>
        <p>To request police intervention</p>
      </div>
    </div>
  </div>  
</template>


<style scoped>
#home-cover{
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}
#home-cover h2{
  color: var(--white);
  font-weight: var(--semibold);
  max-width: 892px;
}
@media(max-width:1400px){
  #home-cover h2{
    font-size: 3.4vw;
    line-height: 3.5vw;
    max-width: 60vw;
  }
}

/**Introductive section */
#home-intro{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 160px 0;
  text-align: center;
}
#home-intro p{
  width: 41%;
  text-align: center;
  padding: 20px;
}
#home-intro a{
  text-decoration: underline;
}

/**Activities sections */
.activity-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 156px 0 212px 0;
}

/**About Us section */
#home-about{
  background-image: url(/assets/images/Homepage_About_Us_section.png);
  width: 100%;
  min-height: calc(100vw * 868 / 1920);
  color: var(--white);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
}
#home-about h2{
  margin-bottom: 150px;
  margin-left: 5vw;
}
#home-about div{
  margin-top: 50px;
  margin-bottom: 150px;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#home-about div p{
  width: 27.2vw;
}

/**Our Locations section */
#home-locations{
  margin-top: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
}
#image-group{
  margin-top: 150px;
  position: absolute;
  right: 0;
  width: 55vw;
  height: auto;
  z-index: -1;
}
#home-locations-p{
  max-width: 36.8vw;
  text-align: center;
}
#home-locations-cards{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
  margin-top: 86px;
}

/**Need Help section */
#home-help{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  width: 65vw;
  margin-left: 17.5vw;
  margin-top: 400px;
  margin-bottom: 400px;
}


@media (max-width: 1000px){
  #home-locations-cards{
    flex-direction: column;
    gap: 100px;
  }
  #home-help{
    flex-direction: column;
  }
  #vertical-line{
    width: 60%;
    height: 0px!important;
    border-top: 4px solid var(--purple); 
    border-left: 0px;
    border-bottom: 0px;
  }
}

@media (max-width: 900px){
  #home-about{
    flex-direction: column;
    align-items: center;
  }
  #home-about h2{
    margin-bottom: 0%;
    margin-top: 30px;
  }
  #home-about div{
    margin-bottom: 30px
  }
  #home-about div p{
    width: 80vw;
  }
}

@media (max-width: 650px){
  .dynamic-p{
    width: 80vw !important;
    max-width: 80vw !important;
  }
}
</style>
