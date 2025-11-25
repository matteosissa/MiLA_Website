<script lang="ts" setup>
import BackwardButton from '~/components/buttons/BackwardButton.vue';
import type { Person, Service, OfferingInfoSingleServicePage } from '~/types/types';

// Import the server public URL
const runtimeConfig = useRuntimeConfig();
const baseBackendURL = runtimeConfig.public.baseBackendURL;

// Service id from url
const serviceId = useRoute().params.id as string;
const serviceUrl = baseBackendURL + "services/" + serviceId;
const regex = /service\_(\d+)/;
const find_id = serviceUrl.match(regex);
let id: number = 0;
if(find_id){
  id = +find_id[1];
}

const totalServices = 6;
let previousUrl = '';
let nextUrl = '';
if (id!=1) {previousUrl = `/activities/services/service_${id-1}`;}
if (id != totalServices){nextUrl = `/activities/services/service_${id+1}`;}

/**general information about the service */
const {data, error} = await useFetch(serviceUrl);
const service = ref() as Ref<Service>;
let coverImageURL = '';
let descriptionImages = [] as string[];
const offeringBovisa = ref([]) as Ref<OfferingInfoSingleServicePage[]>;
const offeringFarini = ref([]) as Ref<OfferingInfoSingleServicePage[]>;
let scheduleBovisa = '';
let scheduleFarini = '';
let service_testimonial = [] as any[];

if(data.value){
  const services = data.value as Service[];
  service.value = services[0];

  /**information about the images */
  let imageList = service.value.image;
  const re = new RegExp("Cover");
  for(let image of imageList){
    if(re.test(image.image_id as string)) {
      coverImageURL = image.image_url;
    } else {
      descriptionImages.push(image.image_url);
    }
  }

  /**information about people offering the service */
  const offering_info: OfferingInfoSingleServicePage[] = service.value.offering_info;

  offering_info.forEach(offer_info => {
    offer_info.location_id === 1 ? offeringBovisa.value.push(offer_info) : offeringFarini.value.push(offer_info);
    offer_info.location_id === 1 ? scheduleBovisa = offer_info.schedule : scheduleFarini = offer_info.schedule;
  });

  /**information about the testimonials */
  service_testimonial = service.value.testimonial;

  useHead({
    title: service.value.service_name + " | Discover Services Centro MiLA",
    meta: [
      {
        name: 'description',
        content: service.value.description,
      },
      {
        name: 'keywords',
        content: service.value.service_name + ', ' + service.value.manager.name + ' ' + service.value.manager.surname + ', MiLA service, domestic violence support, empowerment services, Milan support services, community impact, women\'s shelter services' +
        'servizio MiLA, supporto violenza domestica, servizi di empowerment, servizi di supporto a Milano, impatto sulla comunità, servizi rifugio per donne',
      }
    ]
  });
} else {
  console.log('Error fetching service:', error);
}

</script>

<template>
  <div v-if="service">
  <div id="service-cover" :style="{ backgroundImage: `url('${coverImageURL}')` }">
    <backward-button-wrapper>
      <BackwardButton buttonText="Our Services" to="/activities/services" />
    </backward-button-wrapper>
    <div class="page-title" >
      <h1 >{{ service.service_name }}</h1>
      <NuxtLink :to="`/about-us/people/${service.manager.person_id}`">
        <h3>Manager: {{ service.manager.name }} {{ service.manager.surname }}</h3>
      </NuxtLink>
    </div>
  </div>

  <div id="service-intro" >
    <h3>{{ service.service_name }}</h3>
    <p class="dynamic-p">{{ service.description }}</p>
  </div>

  <div id="service-location" >
    <div class="centre-container" >
      <h3>Centro MiLA Farini</h3>
      <p class="semiboldText" style="margin-top: 40px; line-height: 60px;" >Provided By</p>
      <div class="offering-container" >
        <NuxtLink v-for="(offer, index) in offeringFarini" :to="`/about-us/people/${offer.person.person_id}`" >
          <p>{{ offer.person.name }} {{ offer.person.surname }}</p>
        </NuxtLink>
      </div>
      <p class="semiboldText" style="margin-top: 50px;">Opening Hours</p>
      <p>{{ scheduleFarini }}</p>
    </div>
    <div class="centre-container" >
      <h3>Centro MiLA Bovisa</h3>
      <p class="semiboldText" style="margin-top: 40px; line-height: 60px;" >Provided By</p>
      <div class="offering-container" >
        <NuxtLink v-for="(offer, index) in offeringBovisa" :to="`/about-us/people/${offer.person.person_id}`" >
          <p>{{ offer.person.name }} {{ offer.person.surname }}</p>
        </NuxtLink>
      </div>
      <p class="semiboldText" style="margin-top: 50px;">Opening Hours</p>
      <p>{{ scheduleBovisa }}</p>
    </div>
  </div>

  <div id="service-additional">
    <h3 style="text-align: center;" >Additional Information</h3>
    <p style="margin-top: 32px; text-align: center; max-width: 55.7vw;" class="dynamic-p" >{{ service.additional_info }}</p>
  </div>
  
  <img src="/assets/images/fiori-e-cuori.svg" alt="" style="position: absolute; opacity: 0.25; right: 0px; margin-top: -200px; z-index: 0;">
  <div id="service-images" >
    <img v-for="(url, index) in descriptionImages" :key="index" :src="url" alt="Descriptive image of the service" >
  </div>

  <div id="service-voices" >
    <h3 style="text-align: center;">Voices That Matter</h3>
    <div id="quotes" >
      <div class="quote-container" v-for="(testimonial, index) in service_testimonial" >
        <Icon name="QuoteIcon" size="70px" style="margin-top: -30px; color: var(--purple); min-width: 70px;" />
        <div>
          <p>{{ testimonial.description }}</p>
          <p style="font-style: italic; font-size: var(--body3);">{{ testimonial.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <div id="service-navigation">
    <NuxtLink :to=previousUrl style="color: var(--black);" :disabled=!(id-1) >
      <Icon name="NavLeftArrowIcon" size="19" />
      <p> Previous </p>
    </NuxtLink>

    <NuxtLink to="/activities/services">
      <p> All Services </p>
    </NuxtLink>

    <NuxtLink :to=nextUrl style="color: var(--black);" :disabled=!(totalServices-id) >
      <p> Next </p>
      <Icon name="NavRightArrowIcon" size="19" />
    </NuxtLink>
  </div>
  </div>
  <div v-else style="padding: 200px 0; text-align: center;">
    <h2>Service not found</h2>
    <p>The service you're looking for could not be loaded.</p>
    <NuxtLink to="/activities/services" style="color: var(--purple); text-decoration: underline;">Back to all services</NuxtLink>
  </div>
</template>

<style scoped>
#service-cover{
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}
#service-cover h3{
  color: var(--white);
  font-weight: var(--semibold);
  max-width: 892px;
}
@media(max-width:1400px){
  #service-cover h3{
    font-size: 3.4vw;
    line-height: 3.5vw;
    max-width: 60vw;
  }
}

.page-title h1{
  line-height: 140px;
}

#service-intro{
  margin: 160px 0;
  margin-left: 13.7vw;
  max-width: 55.7vw;
}

#service-location{
  font-size: var(--body3);
  line-height: var(--l-height3);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5.2vw;
}
#service-location p{
  margin: 0;
}
#service-location .centre-container{
  border: 2px solid var(--purple);
  border-radius: 24px;
  max-width: 678px;
  padding: 64px;
}
#service-location .offering-container{
  width: inherit;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: nowrap;
}
.offering-container a{
  text-decoration: underline;
}

#service-additional{
  background-color: var(--lilac);
  padding: 116px 0;
  margin: 216px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#service-images{
  display: flex;
  justify-content: center;
  padding: 0 3rem; 
  gap: 5rem;
  object-fit: cover;
}
#service-images img{
  width: 45%;
  z-index: 2;
}

#service-voices{
  margin-top: 412px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 92px;
}
#quotes{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8.3vw;
}
.quote-container{
  display: flex;
  flex-direction: row;
  max-width: 29vw;
}

/** behaviour of the navigation buttons */
#service-navigation{
  margin-top: 260px;
  margin-bottom: 340px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 72px;
  font-size: var(--body3);
}
#service-navigation a{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  color: var(--purple);
}
#service-navigation a:hover {
  color: var(--purple-hover) !important;
}
#service-navigation a:active {
  color: var(--purple-active) !important;
}
#service-navigation a[disabled = true] {
  color: var(--grey3) !important;
  cursor: not-allowed;
}
#service-navigation a[disabled = true]:hover {
  color: var(--grey3) !important;
  cursor: not-allowed;
}

@media(max-width: 1000px){
  #service-location{
    flex-direction: column;
    align-items: center;
  }
  #service-location .centre-container{
    width: calc(90vw - 64*2px);
  }
  #quotes{
    flex-direction: column;
  }
  .quote-container{
    max-width: 80vw;
  }
}
@media(max-width: 900px){
  #service-intro{
    margin-left: 5vw;
  }
  .dynamic-p{
    width: 90vw;
    max-width: 90vw !important;
  }
  #service-images {
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    padding: 0;
  }
  #service-images img{
    width: 75%;
    z-index: 2;
  }
  
  
  #service-navigation{
    font-size: var(--body2);
    gap: 40px;
  }
}
@media(max-width: 430px){
  #service-intro{
    margin: 90px 20px 140px;
  }
  .centre-container h3 {
    font-size: 32px;
  }
  .semiboldText {
    margin-top: 20px !important;
  }

  #service-additional {
    margin: 7em 0;
  }

  #service-location{
    font-size: var(--body1);
    line-height: var(--l-height1);
    gap: 3em;
  }
  #service-location .centre-container{
    padding: 32px;
  }

   #service-voices {
    margin-top: 10em;
   }

   #quotes {
    width: 90%;
   }

  .quote-container{
    max-width: 95%;
  }
  #service-navigation{
    font-size: var(--body1);
    gap: 20px;
    margin: 10em 0;
  }
}
</style>