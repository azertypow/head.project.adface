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
        v-if="status === 'ended'"
        @click="getProfile"
    >
      <img
          alt="ui share icon"
          class="v-result-view__share-icon"
          src="../assets/discover_profile_2.svg">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {DURATION_PARAMETERS, getAdsFolderName, params, randomIntFromInterval} from "@/main"
import {useStore} from "vuex"
import {MutationTypes} from "@/store"

export default defineComponent({
  name: 'ResultView',
  components: {
  },

  data() {
    return {
      store: useStore(),
      status: "started" as "started" | "ended",
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

    getProfile() {
      this.store.commit(MutationTypes.SHOW_PROFILE, true)
    },

    addImageElement(imagesContainer: HTMLDivElement, src: string) {
      const imgElement = document.createElement("img")
      const imgXCorrection        = 65; // see render in browser
      const imgYCorrection_top    = 170; // see render in browser
      const imgYCorrection_bottom = 210; // see render in browser

      const xPos = randomIntFromInterval( imgXCorrection, window.innerWidth - imgXCorrection )
      const yPos = randomIntFromInterval( imgYCorrection_top, window.innerHeight - imgYCorrection_bottom )

      imgElement.src = src;
      imgElement.style.left = `${xPos}px`
      imgElement.style.top  = `${yPos}px`
      imagesContainer.appendChild(imgElement)
    },

    placeImageInView(indexOfListOfImages: number, listOfImages: string[]) {

      const imagesContainer = this.$refs.imagesContainer

      if(imagesContainer instanceof HTMLDivElement) {

        this.addImageElement(
            imagesContainer,
            params.webappBaseUrl + "ads/" + getAdsFolderName(this.store.state.imageAnalysisResponse)[0] + '/' + listOfImages[indexOfListOfImages]
        )

        window.setTimeout(() => {
          this.addImageElement(
              imagesContainer,
              params.webappBaseUrl + "ads/" + getAdsFolderName(this.store.state.imageAnalysisResponse)[1] + '/' + listOfImages[indexOfListOfImages]
          )

          indexOfListOfImages++

          if (indexOfListOfImages < listOfImages.length) window.setTimeout(() => {
            this.placeImageInView(indexOfListOfImages, this.listOfImages)
          }, DURATION_PARAMETERS.addsInterval)

          else {
            window.setTimeout(() => {
              this.status = "ended"
            }, DURATION_PARAMETERS.beforeShowingShareProfile)
          }
        }, DURATION_PARAMETERS.addsInterval)

      }
    },

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
