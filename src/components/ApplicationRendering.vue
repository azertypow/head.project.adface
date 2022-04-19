<template>
  <div class="v-application-rendering">

    <div
        class="v-application-rendering__layout"
    >

      <div class="v-application-rendering__layout__header">
        <div
            class="v-application-rendering__layout__header__img"
            :style="{
                  maxHeight: imgHeight,
               }"
        >
          <img :src="store.state.snapShot"
               alt=""
               ref="imgProfile"
          >
        </div>
        <div
            class="v-application-rendering__layout__header__id"
        >ADface{{generatedID}}
        </div>
      </div>

      <div
          class="v-application-rendering__layout__body"
          @scroll="onScrollInBodyResult"
      >
        <div
            class="v-application-rendering__layout__body__txt"
        >
          <div class="mmd--child-rm-margin">
            <p>This is the profile the algorithm has determined for your&nbsp;picture.</p>
            <p>You were targeted with these ads because you are {{ raceSentence }}
              {{ imageAnalysisResponse.gender.toLowerCase() }} of {{ imageAnalysisResponse.age }} years old.
              <br>You are {{ emotion }} and you look {{ sentence }}.</p>
            <p>Quite interesting, no? Maybe also a bit surprising but in any case reason to ask yourself: how trustworthy
              are the digital services surrounding&nbsp;me?</p>

            <p>If you’ve enjoyed ADFace please share the website with your friends. What profiles will people you know
              get? Let’s find out by sharing the link to the experience through the following buttons. Thank&nbsp;you!
            </p>
            <p>Please also visit <br><a href="https://www.swiss-digital-initiative.org/aiethics-adface/" >swiss-digital-initiative.org/aiethics-adface/</a></p>

          </div>
        </div>
      </div>


      <div
          class="v-application-rendering__layout__footer"
      >
        <div
        >Return to <br
        ><a :href="webappBaseUrl" >adface.swissdigitalinitiative.ch</a>
        </div>

        <div
            class="v-application-rendering__layout__footer__share"
        >
                <div
                    class="v-application-rendering__share-link"
                    @click="shareClicked"
                    title="Copy to Clipoard"
                ><img src="../assets/copy_paste.svg" alt="copy sharing"></div>

                <a
                    class="v-application-rendering__share-link"
                    target="_blank"
                    title="Share on Facebook"
                    :href="getUrlToShare('facebook')"
                ><img src="../assets/facebook.svg" alt="facebook sharing"></a>

                <a
                    class="v-application-rendering__share-link"
                    target="_blank"
                    title="Share on Twitter"
                    :href="getUrlToShare('twitter')"
                ><img src="../assets/twitter.svg" alt="twitter sharing"></a>
        </div>
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
      showReadMore: false,
      generatedID: new Date().getTime(),
      imgHeightValue: null as null | number,
      imgHeightHeightRef: null as null | number,
    }
  },

  computed: {

    imgHeight(): string {
      if(this.imgHeightValue === null) return ""
      if(this.imgHeightValue < 0 ) return "0"
      return this.imgHeightValue + 'px'
    },

    webappBaseUrl(): string {
      return params.webappBaseUrl
    },

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

    onScrollInBodyResult(e: Event) {
      if(! (e.target instanceof HTMLElement) )    return

      if( this.imgHeightHeightRef === null ) {
        if(! (this.$refs.imgProfile instanceof HTMLElement) )  return
        this.imgHeightHeightRef = this.$refs.imgProfile.getBoundingClientRect().height
      }

      this.imgHeightValue = this.imgHeightHeightRef - e.target.scrollTop
    },

    getUrlToShare(get: null | "facebook" | "twitter"): string {

      const twitterText     = `Try ADface on `
      const twitterHashtags = 'deepface,AI,headmediadesign'

      if (get === "twitter")
        return `https://twitter.com/intent/tweet?text=${twitterText}&url=${params.webappBaseUrl}&hashtags=${twitterHashtags}&via=sdi_foundation`

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
  height: var(--profile-width);
  max-height: calc(100vh - var(--gutter));
  box-shadow: black 0 0 40px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.v-application-rendering__layout__header {
  pointer-events: none !important;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: var(--text-line-height);
  padding-bottom: calc( var(--text-line-height) / 2 );
  display: flex;
  flex-wrap: nowrap;
  background-color: var(--site-color--background);
  z-index: 1;
  box-shadow: 0 -10px 20px 20px var(--site-color--background);
}

.v-application-rendering__layout__header__img {
  width: calc( var(--profile-width) / 2 );
  height: calc( var(--profile-width) / 2 );
  box-sizing: border-box;
  padding-right: var(--text-line-height);

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
  }
}

.v-application-rendering__layout__header__id {
  width: 50%;
  text-align: left;
  transform: translate(0px, -6px);
}

.v-application-rendering__layout__body {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.v-application-rendering__layout__body__txt {
  width: 100%;
  padding-top: calc( var(--profile-width) / 2 + var(--text-line-height));
  padding-bottom: calc( var(--text-line-height) * 4);
  position: relative;
}

.v-application-rendering__layout__txt__more {
  line-height: var(--text-line-height);
  color: var(--site-color--secondary);
  cursor: pointer;
  float: right
}

.v-application-rendering__layout__txt__details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--site-color--background);
  padding-top: var(--text-line-height);
  box-sizing: border-box;
  z-index: 100000;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: var(--text-line-height);
    background: linear-gradient(180deg, #cccccc, transparent);
  }
}

.v-application-rendering__layout__footer {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: var(--text-line-height);
  padding-right: var(--text-line-height);
  padding-bottom: var(--text-line-height);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
  background-color: var(--site-color--background);
  box-shadow: 0 10px 20px 20px var(--site-color--background);
}

.v-application-rendering__layout__footer__share {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
}

.v-application-rendering__share-link {
  display: block;
  border: none;
  padding: 5px;
  cursor: pointer;
  user-select: none;

  > img {
    width: 30px;
    height: auto;
    display: block;
  }
}

</style>
