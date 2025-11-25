<script lang="ts" setup>
  import DiscoverCard from '~/components/cards/DiscoverCard.vue';
  import MainButton from '~/components/buttons/MainButton.vue';
  import MapCardSmall from '~/components/cards/MapCardSmall.vue';

  useHead({
  title: 'About Us | Discover Centro MiLA history and values',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Centro MiLA, a beacon of hope and support for women and children facing domestic violence in Milan since 2004. Discover our mission, vision, history, and commitment to empowering survivors through counseling, legal assistance, safe housing, and impactful projects. Visit us at our two locations in Bovisa and Zona Farini.',
    },
    {
      name: 'keywords',
      content: 'Centro MiLA, anti-violence centre Milan, domestic violence support Milan, women\'s shelter Milan, support for abuse victims Milan, MiLA mission, MiLA vision, MiLA history, MiLA commitment, MiLA services, MiLA projects, Centro anti-violenza Milano, supporto violenza domestica Milano, rifugio per donne Milano, assistenza vittime di abuso Milano, mission MiLA, visione MiLA, storia MiLA, impegno MiLA, servizi MiLA, progetti MiLA',
    }
  ]
});

</script>

<template>
  <div id="about-cover" :style="{ backgroundImage: 'url(https://bpvtqszwvepixqceqdli.supabase.co/storage/v1/object/public/HYP-Images/cover_image/Cover_About_Us.png)'}">
    <h1 class="page-title">About Us</h1>
  </div>

  <div id="container">
    <div id="intro">
      <h2>A Safe Place Since 2004</h2>
      <p>Welcome to Centro MiLA, where we stand as a beacon of hope and support for women and children facing domestic violence
        in Milan. Since our opening in 2004, we have been a steadfast ally for women and children facing domestic violence. Our
          journey began with a small team of dedicated individuals who believed in the transformative power of compassion and advocacy.
          Over the years, we have grown into a comprehensive center, offering a wide array of services designed to empower and uplift
            those affected by domestic violence. As a cornerstone of the community, we strive to create a safe and supportive environment
            where survivors can heal, grow, and thrive.</p>
    </div>

    <div id="mission">
      <div>
        <Icon name="HeartIcon" color=var(--purple) size="40"/>
        <h3>Our Mission</h3>
        <p>Our mission is to provide unwavering support, guidance, and resources to survivors. We advocate for systemic change, 
          challenge harmful norms, and foster a community where healing and empowerment thrive.</p>
      </div>
      <div>
        <Icon name="HeartIcon" color=var(--purple) size="40"/>
        <h3>Our Vision</h3>
        <p>We envision a society where survivors are not just survivors – they are thrivers. A place where children grow up knowing 
          their worth, and where families find solace and strength within our walls.</p>
      </div>
    </div>

    <div id="history">
      <img src="/assets/images/Group.jpg" alt="" id="image-group">
        <h3>MiLA's History</h3>
        <p>Centro MiLA’s roots run deep. Initially, we operated from a single location in Milan, a safe haven for a handful of women 
          seeking refuge. Those early days were marked by determination, empathy, and a shared commitment to making a difference. As the 
          years passed, our impact grew. And after eight years of tireless work, we expanded our reach by opening a second location. This 
          strategic move allowed us to be more present in the territory, reaching even more women in need. The second center became a 
          beacon of hope, a place where survivors found solace, legal assistance, and emotional support.</p>
        <p>Our history is woven with stories of resilience, courage, and transformation. We’ve weathered storms, celebrated victories, 
          and learned from every step along the way.
          Each survivor who has walked through our doors has left an indelible mark on our journey, reminding us of the urgency and 
          importance of our work</p>
      <div id="history-flex">
        <div>
          <h2>+ 60</h2>
          <p>Volunteers</p>
        </div>
        <div>
          <h2>5,367</h2>
          <p>Requests for help</p>
        </div>
        <div>
          <h2>2,845</h2>
          <p>Women in care</p>
        </div>
      </div>
    </div>

    <div id="commitment">
      <h3>Our Commitment</h3>
      <p id="commitment-p">At MiLA, we are dedicated to helping women and children through a variety of impactful services and projects.</p>
      <div id="commitment-cards">
        <DiscoverCard title="Discover all the Services"
          text="Discover our wide array of supportive services, including counseling, legal assistance, and safe housing, all aimed 
          at empowering women to build safe, empowered and independent lives."
          to="/activities/services" />
        <DiscoverCard title="Discover all the Projects"
          text="Explore the diverse projects we fund and organize, designed to create meaningful experiences, joyful moments for 
          children, and impactful advocacy and awareness for women's rights."
          to="/activities/projects" />
      </div>
    </div>

    <div id="locations" >
      <h3>One Centre, Two Locations</h3>
      <p id="locations-p">You can find us in Bovisa and in Zona Farini, choose the location closest to you. We are to help you.</p>
      <div id="locations-cards">
        <MapCardSmall title="Centro MiLA Bovisa" address="Via Candiani 72, 20158 Milano" email="centromila.bovisa@gmail.com" phone="+39 345697365" to="/about-us/locations" />
        <MapCardSmall title="Centro MiLA Farini" address="Via Valtellina 20, 20159 Milano" email="centromila.farini@gmail.com" phone="+39 344677462" to="/about-us/locations" />
      </div>
    </div>

    <div id="people">      
      <img src="/assets/images/our-people.jpg" alt="">    
      <h3>Our People</h3>
      <p>Our compassionate team of counselors, legal experts, social workers, and  volunteers is dedicated to empowering women and 
        children facing domestic violence.</p>
      <MainButton buttonText="Discover Our Team" buttonLength="long" to="/about-us/people" id="people-button"
        style="margin-top: 50px; margin-bottom: 10px;" />
    </div>
    
  </div>
</template>


<style scoped>

*,
* ::before,
* ::after {
  box-sizing: border-box;
}

#about-cover{
  background-size: cover;
  width: 100%;
  height: calc(100vw / 2);
}
#container{
  position: relative;
  z-index: 1;
}

/**Introductive section */

h2 {
  font-size: var(--h3);
}

#intro{
  margin: 100px 15%;
  width: 60vw;
  padding: 2rem;
}

/**Our Mission section */
#mission{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 150px;
  background-color: var(--lilac);
  padding: 80px 0;
  width: 100%;
}
#mission div{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 29%;
  max-width: 560px;
  text-align: center;
}
#mission div p{
  text-align: center;
  size: var(--body4);
  line-height: var(--l-height4);
}

/**History section */
#history{
  margin: 100px 15%;
  width: 60vw;
  padding: 2rem;
}
#image-group{
  margin-top: -50px;
  position: absolute;
  right: 0;
  width: 50vw;
  height: auto;
  z-index: -1;
}
#history-flex{
  margin-top: 100px;
  width: 100%;
  min-width: 440px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  color: var(--purple);
}
#history-flex div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
#history h2{
  color: var(--purple);
}

/**Our Commitment section */
#commitment{
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
#commitment-p{
  max-width: 36.8vw;
  text-align: center;
}
#commitment-cards{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
}

/**Our Locations section */
#locations{
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
#locations-p{
  max-width: 36.8vw;
  text-align: center;
}
#locations-cards{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
}

/**Our People section */
#people{
  margin: 400px 0 0 15%;
  min-height: calc(78vw*864/1498);
}
#people p{
  max-width: 29vw;
}
#people img{
  position: absolute;
  right: 0;
  width: 78vw;
  z-index: -1;
}


@media (max-width: 1330px){  
  #commitment-cards{
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 1000px){
  #locations-cards{
    flex-direction: column;
    gap: 100px;
  }
}

@media (max-width: 850px){
  #history h2{
    font-size: 50px;
  }
}

@media (max-width: 650px){
  #intro{
    width: 90vw;
    margin: 100px 10px;
  }
  
  #mission{
    flex-direction: column;
    align-items: center
  }
  #mission div{
    width: 90%;
  }
  
  #history{    
    width: 90vw;
    margin: 100px 10px;
  }
  #history-flex{
    flex-direction: column;
    min-width: 0px;
  }

  #commitment{
    text-align: center;
  }
  #commitment-p{
    width: 80vw;
    max-width: 100vw;
  }

  #locations{
    text-align: center;
    margin-top: 200px;
  }
  #locations-p{
    width: 80vw;
    max-width: 100vw;
  }

  #people{
    margin-left: 0px;
    padding: 2rem;
    margin-bottom: 200px;
    margin-top: 200px;
  }
  #people img{
    display: none;
  }
  #people p{
    max-width: 80%;
  }
}

</style>