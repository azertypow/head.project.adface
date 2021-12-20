<template>
  <div class="v-term mmd--page mmd--with-padding mmd--with-padding--bottom-xl mmd--child-rm-margin mmd-with-scroll">

    <div    class="v-term__bg">
      <div  class="v-term__bg__top-left"></div>
      <div  class="v-term__bg__top-right"></div>
    </div>

    <div class="v-term__content mmd--child-rm-margin">
      <h2>Terms and Conditions</h2>
      <p>ADface is an art project that reflects on how we become increasingly overwhelmed by marketing practices that use data about individuals to select and display advertisements or other forms of commercial content.</p>
      <p>The web experience is based on AI-based facial analysis technologies such as emotion detection algorithms that allow for increasingly effective targeted advertisements and present a high incentive for the collection of personal data for advertising purposes.</p>
      <p>If you want to interact, we need to see and analyze your face. It is for this reason that this experiment requires your consent to use your camera to capture your face, and analyze it by face recognition and attribution system capable of detecting your gender, age, emotions, and ethnicity.</p>
      <p>In order to generate targeted ads that match your facial profile, the facial analysis algorithms used in this experiment are based on an open-sourced library called DeepFace, a deep learning facial recognition system created by a research group at Facebook. You can read more about it and find the source code <a target="_blank" href="https://github.com/serengil/deepface" >here</a>.</p>
      <p>All face detection algorithms are performed on your own computer, in the browser. However, to perform the face attributes analysis, the picture of your face is sent to our Swiss-based server, which is then destroyed once the process is completed.</p>
      <p>No personal data is collected on our server in any way for this experience. To learn more about our general privacy policy, click <a target="_blank" href="https://www.swiss-digital-initiative.org/privacy-notice/">here</a>.</p>
      <p>Try it yourself at <router-link to="/" >adface.swissdigitalinitiative.ch</router-link></p>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Term',
  components: {
  },
});
</script>

<style lang="scss" scoped>
.v-term {
  height: 100%;
  padding-left: var(--left-padding);
}

.v-term__content {
  position: relative;
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
