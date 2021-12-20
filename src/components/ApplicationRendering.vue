<template>
  <div class="v-application-rendering">

    <div
        class="v-application-rendering__layout"
    >


      <div
          class="v-application-rendering__layout__img"
      >
        <img :src="store.state.snapShot" alt="">
      </div>

      <div
          class="v-application-rendering__layout__id"
      >ADface{{new Date().getTime()}}
      </div>

      <div
          class="v-application-rendering__layout__txt"
      >
        You were targeted with these ads because you are {{raceSentence}} {{imageAnalysisResponse.gender.toLowerCase()}} of {{imageAnalysisResponse.age}} years old.
        <br>You are {{emotion}}, and you look {{sentence}}.
      </div>

      <div
          class="v-application-rendering__layout__footer"
      >return to <a href="https://staging.adface.a-ll.ch/#/" >adface.swiss-digital-initiative.org</a></div>

      <div
          class="v-application-rendering__layout__share"
      >
              <div
                  class="v-application-rendering__share-link"
                  @click="shareClicked"
              ><img src="../assets/copy_paste.svg" alt="copy sharing"></div>

              <a
                  class="v-application-rendering__share-link"
                  target="_blank"
                  :href="getUrlToShare('facebook')"
              ><img src="../assets/facebook.svg" alt="facebook sharing"></a>

              <a
                  class="v-application-rendering__share-link"
                  target="_blank"
                  :href="getUrlToShare('twitter')"
              ><img src="../assets/twitter.svg" alt="twitter sharing"></a>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IImageAnalysis, params,
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
      console.log( this.store.state.imageAnalysisResponse )
      return this.store.state.imageAnalysisResponse
    }
  },

  mounted() {
  },

  methods: {
    shareClicked() {
      navigator.clipboard.writeText( this.getUrlToShare(null) ).then(() => {
        console.log("share clicked")
      })
    },

    getUrlToShare(get: null | "facebook" | "twitter"): string {

      const twitterText     = `try AdFace`
      const twitterHashtags = 'webapp, AI'

      if (get === "twitter")
        return `https://twitter.com/intent/tweet?text=${twitterText}&url=${params.webappBaseUrl}&hashtags=${twitterHashtags}`

      if (get === "facebook")
        return `https://www.facebook.com/sharer/sharer.php?u=${params.webappBaseUrl}`

      return encodeURI(params.webappBaseUrl)
    },
  },

});
</script>

<style lang="scss" scoped>
.v-application-rendering {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
  width: var(--profile-width);
  box-shadow: black 0px 0px 40px 0px;
}

.v-application-rendering__layout__img {
  width: calc( var(--profile-width) / 2 );
  height: calc( var(--profile-width) / 2 );
  padding-right: var(--text-line-height);
  box-sizing: border-box;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
  }
}

.v-application-rendering__layout__id {
  width: 50%;
  text-align: left;
  transform: translate(0px, -6px);
}

.v-application-rendering__layout__txt {
  width: 100%;
  padding-top: var(--text-line-height);
  padding-bottom: var(--text-line-height);
}

.v-application-rendering__layout__footer {
  padding-top: var(--text-line-height);
  width: calc(100% - 150px);
}

.v-application-rendering__layout__share {
  position: absolute;
  bottom: calc( var(--text-line-height) - 5px);
  right: var(--text-line-height);
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.v-application-rendering__share-link {
  width: 100%;
  display: block;
  border: none;
  padding: 5px;
  cursor: pointer;
  user-select: none;

  > img {
    width: 30px;
    height: auto;
  }
}

</style>
