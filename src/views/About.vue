<template>
  <div class="v-about mmd--with-padding mmd--with-padding--bottom-xl mmd--child-rm-margin mmd-with-scroll">
    <div    class="v-term__bg">
      <div  class="v-term__bg__top-left"></div>
      <div  class="v-term__bg__top-right"></div>
    </div>

    <div class="v-about__content mmd--child-rm-margin">
      <h2>About</h2>
      <p>This interactive experience was created by students of Master Media Design program at HEAD&nbsp;–&nbsp;Genève (<a target="_blank" href="https://www.hesge.ch/head/formations-recherche/master-en-media-design" >www.hesge.ch/head/formations-recherche/master-en-media-design</a>) The experience was commissioned by the Swiss Digital Initiative and launched publicly at the World Economic Forum Annual Meeting in January 2022. Art can be a potent tool to build awareness about ethical questions raised by digital technologies. The often abstract and complex subject matter can be made more tangible and lead to concrete experiences that make people think about the digital services surrounding us. With this project, SDI hopes to contribute to a broad and sustained debate about digital trust.</p>
      <p>The Swiss Digital Initiative (SDI) is an independent, non-profit foundation headquartered in Geneva and set up in 2020 by the association digitalswitzerland and under the patronage of Federal Councillor Ueli Maurer. The SDI pursues concrete projects with the aim of safeguarding ethical standards and promoting responsible behaviour in the digital world.</p>
      <p>The SDI’s location in Geneva as well as the collaboration with the leading art school in Geneva is no coincidence. The SDI is very much Swiss at heart and embodies many of the Swiss qualities of security, reliability, and trust. At the same time, we recognize that the issue of digital ethics and trust is a global one. With this in mind, we believe our location in international Geneva puts us in a great starting position to combine Swiss values and perspectives with a global debate and international impact.</p>
      <p>More information can be found under: <a target="_blank" href="https://www.swiss-digital-initiative.org" >https://www.swiss-digital-initiative.org</a></p>

      <h3>Credits:</h3>

      <p>Students:
        <br>Raghid Jomaa
        <br>Emma Parente</p>

      <p>Professors:
        <br>Marta Revuelta
        <br>Félicien Goguey
        <br>Alexia Mathieu</p>

      <p>Front-end and back-end development and coordination:
        <br>Nicolas Baldran</p>

      <p>Data-set creation, targeted ads:
        <br>Raghid Jomaa
        <br>Emma Parente
        <br>Marta Revuelta</p>

      <p>AI module development and integration:
        <br>A-LL Tech</p>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  components: {

  },
});
</script>

<style lang="scss" scoped>
.v-about {
  position: fixed;
  padding-left: var(--left-padding);
  bottom: var(--nav-height);
  left: 0;
  width: 100%;
  height: calc(100% - var(--nav-height) );
  z-index: 10000;
  background: var(--site-color--background);
}

.v-about__content {
  max-width: 37em;
  padding-top: calc(100vh / 7 * 2);
}

.v-term__bg {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.v-term__bg__top-left {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--site-color--background--dark);
  width: calc(100% / 7 * 5);
  height: calc(100% / 7 * 1);
  z-index: 3;
}

.v-term__bg__top-right {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--site-color--secondary);
  width: calc(100% / 7 * 3);
  height: calc(100% / 7 * 2);
  z-index: 2;
}
</style>
