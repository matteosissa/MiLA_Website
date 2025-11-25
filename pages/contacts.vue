<script lang="ts" setup>
import MapCardBig from '~/components/cards/MapCardBig.vue';
import fariniImage from '~/assets/images/location-farini.png';
import bovisaImage from '~/assets/images/location-bovisa.png';

useHead({
  title: "Contact Us | Get in contact with Centro MiLA for more information",
  meta: [
    {
      name: 'description',
      content: 'Contact Centro MiLA for support services including legal counselling, psychological counselling, and more. Call our crisis line at 0521 248886 or email us at centromila@gmail.com.'
    },
    {
      name: 'keywords',
      content: 'Centro MiLA, support for women, support for children, domestic violence support, legal counselling, psychological counselling, volunteer opportunities, supporto alle donne, supporto per l\'infanzia, sostegno contro la violenza domestica, consulenza legale, consulenza psicologica, opportunità di volontariato',
    }
  ]
});

/** show a confirmation message when data are submitted */
function submit(event:Event){
  event.preventDefault();
  const form = document.getElementById("contacts-form");
  const thanks = document.getElementById("contacts-thanks");
  if(form)
    form.style.display = 'none';
  if(thanks)
    thanks.style.display = 'block';
}
</script>

<template>
  <div id="contacts-cover" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_Contact_us.png)'}">
    <h1 class="page-title">Contact <br>Centro MiLA</h1>
  </div>

  <img src="/assets/images/fiori-e-cuori.svg" alt="" style="position: absolute; opacity: 0.25; right: 0px; z-index: 0;">

  <div id="contacts-help" >
    <div class="needHelp" >
      <p class="semiboldText" >Do you need help?</p>
      <p>Our crisis line is open everyday, at every hour.</p>
      <p class="semiboldText dynamic-help" style="font-size: var(--h3); line-height: 44px;">0521 248886</p>
    </div>
    <div class="needHelp" >
      <p class="semiboldText" >Are you unable to call?</p>
      <p>You can write us an email. Your privacy is safe.</p>
      <p class="semiboldText dynamic-help" style="font-size: var(--h4); line-height: 39px;">centromila@gmail.com</p>
    </div>
  </div>

  <div id="contacts-maps" >
    <MapCardBig :imageSrc= fariniImage
    name="Centro MiLA Farini" to="https://maps.google.com/?q=Via+Valtellina+20,+20159+Milano"
    address="Via Valtellina 20, 20159 Milano" email="centromila.farini@gmail.com" phone="+39 344677462" hours="07:00 - 19:00 daily" />
    <MapCardBig :imageSrc=bovisaImage
    name="Centro MiLA Bovisa" to="https://maps.google.com/?q=Via+Candiani+72,+20158+Milano" title="Centro MiLA Bovisa"
    address="Via Candiani 72, 20158 Milano" email="centromila.bovisa@gmail.com" phone="+39 345697365" hours="07:00 - 19:00 daily" />
  </div>

  <div id="contacts-services" >
    <h2 style="margin-bottom: 58px;">The Services We Offer</h2>
    <div class="offers-container" >
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Welcome Interviews</p> </div>
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Hospitality in Shelters</p> </div>
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Legal Counselling</p> </div>
    </div>
    <div class="offers-container" >
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Psychological Counselling</p> </div>
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Job Counter</p> </div>
      <div> <Icon name="HeartIcon" color=var(--purple) size="24" style="margin-top: 18px;" /> <p>Intercultural Mediation</p> </div>
    </div>
  </div>

  <div id="contacts-form" aria-live="assertive">
    <h2>Send us a message, <br>
      we will get in touch soon!</h2>
    <form style="width: 800px; margin-top: 92px;" @submit="submit">
      <input id="name-field" type="text" pattern="[A-Za-z\s]+" name="name" placeholder="ex. Mario Rossi" required aria-label="Type here youre name and surname" aria-required="true">
      <input id="age-field" type="text" pattern="\d+" name="age" placeholder="Your age" required aria-label="Type here your age" aria-required="true">
      <input id="email-field" type="email" name="e-mail" placeholder="E-mail address" required aria-label="Type here your email" aria-required="true">
      <input type="text" name="phone" pattern="\+?[0-9\s]+" placeholder="Phone number" required aria-label="Type here your phone number" aria-required="true">
      <textarea name="comment" placeholder="Write us a message." style="height: 282px;" required aria-required="true" aria-label="Type here your message for us"></textarea>
      <button type="submit" id="submit-button"
      style="width: 163px; height: 64px; background-color: var(--purple); border: 0; border-radius: 12px; font-size: var(--body4); color: white;
       font-family: 'Montserrat', serif; font-weight: var(--regular); margin-top: 92px; cursor: pointer"> Send</button>
    </form>
  </div>
  <div id="contacts-thanks" aria-live="assertive">
    <h2>
      Thank you! <br> We will contact you soon
    </h2>
  </div>
</template>

<style scoped>
#contacts-cover{
  background-image: url('/assets/images/cover-contact-us.png');
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}

h2 {
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
}

/** 'need help' section */
#contacts-help{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 264px 0;
  position: relative;
  z-index: 1;
}

/** location */
#contacts-maps{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  z-index: 1;
}

/** 'offered services' section */
#contacts-services{
  margin: 260px 0;
  padding: 30px;
  background-color: var(--lilac);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 303px;
}
.offers-container{
  width: 52.6vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: var(--body3);
  line-height: var(--l-height3);
}
.offers-container div{
  display: flex;
  flex-direction: row;
  gap: 5px;
}

/** Form */
#contacts-form{
  margin: 260px 0 400px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

#contacts-thanks{
  display: none;
  margin: 260px 0 400px 10vw;
  color: var(--purple);
  width: 80vw;
  text-align: center;
  border: 1px solid var(--purple);
  border-radius: 12px;
}

#contacts-thanks h2{
  padding: 50px 10px;
}

@media(max-width:1250px){
  #contacts-maps{
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  .offers-container{
    width: 70vw;
  }
}

@media(max-width:940px){
  #contacts-help{
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin: 100px 0;
  }
  .dynamic-help{
    font-size: var(--body3) !important; 
    line-height: 24px;
  }
  
  .offers-container{
    width: 90vw;
    font-size: var(--body1);
    line-height: var(--l-height1);
  }

  .offers-container .icon{
    margin-top: 12px !important;
  }

  #contacts-services{
    margin: 100px 0;
  }

  #contacts-form{
    margin: 100px 0 200px 0;
  }

  form{
    width: 90vw !important;
  }
}

@media(max-width:450px){
  .needHelp{
    padding: 10px;
  }
  .offers-container{
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}

</style>