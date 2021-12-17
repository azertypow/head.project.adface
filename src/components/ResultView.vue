<template>
  <div
      class="v-result-view"
  >
    <div
        class="v-result-view__container"
        ref="imagesContainer"
    ></div>

    <div
        class="v-result-view__share"
        v-if="status === 'ended' || status === 'shareClicked'"
    >
      <img
          alt="ui share icon"
          class="v-result-view__share-icon"
          src="../assets/share_profile.svg">

      <button
          class="mmd-button--small"
          @click="shareClicked"
      >copy link to clipboard</button>

      <a
          class="mmd-button mmd-button--small"
          target="_blank"
          :href="getUrlToShare('facebook')"
      >share to facebook</a>

      <a
          class="mmd-button mmd-button--small"
          target="_blank"
          :href="getUrlToShare('twitter')"
      >share to twitter</a>

      <div
          v-if="status === 'shareClicked'"
      >text copied to clipboard</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {DURATION_PARAMETERS, getAdsFolderName, params, randomIntFromInterval} from "@/main"
import {useStore} from "vuex"

export default defineComponent({
  name: 'ResultView',
  components: {
  },

  data() {
    return {
      store: useStore(),
      status: "started" as "started" | "ended" | "shareClicked",
      listOfImages: [
        "000001.jpg",
        "000002.jpg",
        "000003.jpg",
        "000004.jpg",
        "000005.jpg",
        "000006.jpg",
        "000007.jpg",
        "000008.jpg",
        "000009.jpg",
        "000010.jpg",
        "000011.jpg",
        "000012.jpg",
        "000013.jpg",
        "000014.jpg",
        "000015.jpg",
        "000016.jpg",
        "000017.jpg",
        "000018.jpg",
        "000019.jpg",
        "000020.jpg",
        "000021.jpg",
        "000022.jpg",
        "000023.jpg",
        "000024.jpg",
        "000025.jpg",
        "000026.jpg",
        "000027.jpg",
        "000028.jpg",
        "000029.jpg",
        "000030.jpg",
        "000031.jpg",
        "000032.jpg",
        "000033.jpg",
        "000034.jpg",
        "000035.jpg",
      ] //35
    }
  },

  mounted() {
    this.placeImageInView(0, this.listOfImages)
  },

  methods: {

    getUrlToShare(get: null | "facebook" | "twitter"): string {

      const twitterText     = `try AdFace`
      const twitterHashtags = 'webapp, AI'

      if (get === "twitter")
        return `https://twitter.com/intent/tweet?text=${twitterText}&url=${params.webappBaseUrl}&hashtags=${twitterHashtags}`

      if (get === "facebook")
        return `https://www.facebook.com/sharer/sharer.php?u=${params.webappBaseUrl}`

      return encodeURI(params.webappBaseUrl)
    },


    placeImageInView(indexOfListOfImages: number, listOfImages: string[]) {

      const imagesContainer = this.$refs.imagesContainer

      if(imagesContainer instanceof HTMLDivElement) {

        const imgElement = document.createElement("img")
        const imgXCorrection        = 65; // see render in browser
        const imgYCorrection_top    = 170; // see render in browser
        const imgYCorrection_bottom = 210; // see render in browser

        const xPos = randomIntFromInterval( imgXCorrection, window.innerWidth - imgXCorrection )
        const yPos = randomIntFromInterval( imgYCorrection_top, window.innerHeight - imgYCorrection_bottom )

        imgElement.src = params.webappBaseUrl + "/ads/" + getAdsFolderName(this.store.state.imageAnalysisResponse)[randomIntFromInterval(0, 1)] + '/' + listOfImages[indexOfListOfImages]
        imgElement.style.left = `${xPos}px`
        imgElement.style.top  = `${yPos}px`
        imagesContainer.appendChild(imgElement)

        indexOfListOfImages++

        if (indexOfListOfImages < listOfImages.length) window.setTimeout(() => {
          this.placeImageInView(indexOfListOfImages, this.listOfImages)
        }, DURATION_PARAMETERS.addsInterval)

        else {
          window.setTimeout(() => {
            this.status = "ended"
          }, DURATION_PARAMETERS.beforeShowingShareProfile)
        }
      }
    },

    shareClicked() {
      navigator.clipboard.writeText( this.getUrlToShare(null) ).then(() => {
        this.status = 'shareClicked'
      })
    }
  },

});
</script>

<style lang="scss">
.v-result-view__container {
  position: fixed;
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000000;

  > img {
    position: absolute;
    display: block;
    transform: translate(-50%, -50%);
    width: 129px;
    height: auto;
  }
}

.v-result-view__share {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000000;
  cursor: pointer;
  text-align: center;
}

.v-result-view__share-icon {
  display: block;
  width: 200px;
  height: auto;
  margin: auto;
}
</style>
