<template>
  <div class="v-application-rendering mmd--page">

    <main
        class="v-application-rendering__layout"
    >


      <div
          class="v-application-rendering__layout__img"
      >
        <img src="../assets/a.png" alt="">
      </div>

      <div
          class="v-application-rendering__layout__id"
      >ADface{{new Date().getTime()}}
      </div>

      <div
          class="v-application-rendering__layout__txt"
      >
        You were targeted with these ads because you are {{raceSentence}} {{imageAnalysisResponse.gender.toLowerCase()}} of {{imageAnalysisResponse.age}} years old.
        <br>You are {{emotion}} and look {{sentence}}.
      </div>

      <div
          class="v-application-rendering__layout__footer"
      >adface.swiss-digital-initiative.org</div>

    </main>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IImageAnalysis,
} from "@/main"
import {useStore} from "vuex"

export default defineComponent({
  name: 'ApplicationRendering',

  components: {
  },

  data() {
    return {
      store: useStore(),
    }
  },

  computed: {

    emotion(): string {
      if      (this.imageAnalysisResponse.emotion === "fear")     return "fearful"
      else if (this.imageAnalysisResponse.emotion === "disgust")  return "disgusted"
      else if (this.imageAnalysisResponse.emotion === "surprise") return "surprised"
      return this.imageAnalysisResponse.emotion
    },

    raceSentence(): string {
      const race = this.imageAnalysisResponse.race

      if(race === "asian" || race === "indian") return `an ${race}`
      return `a ${race}`
    },

    sentence(): string {
      function random0_1() {  return Math.floor( Math.random() * 2) }

      let randomSentence_start = ["smart", "handsome"][random0_1()];
      let randomSentence_end = ["and wealthy", "but really poor"][random0_1()];

      return randomSentence_start + " " + randomSentence_end
    },

    imageAnalysisResponse(): IImageAnalysis {
      return this.store.state.imageAnalysisResponse
    }
  },

  mounted() {
  },

  methods: {
  },

});
</script>

<style lang="scss" scoped>
.v-application-rendering {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
}

.v-application-rendering__layout {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: var(--site-color--background);
  padding: var(--text-line-height);
  width: 670px;
}

.v-application-rendering__layout__img {
  width: 50%;
  padding-right: var(--text-line-height);
  box-sizing: border-box;

  > img {
    display: block;
    width: 100%;
  }
}

.v-application-rendering__layout__id {
  width: 50%;
}

.v-application-rendering__layout__txt {
  width: 100%;
  padding-top: var(--text-line-height);
  padding-bottom: var(--text-line-height);
}

.v-application-rendering__layout__footer {
  padding-top: var(--text-line-height);
  width: 66.66666%;
}

</style>
