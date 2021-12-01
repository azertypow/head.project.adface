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
        @click="shareClicked"
    >
      <img
          alt="ui share icon"
          class="v-result-view__share-icon"
          src="../assets/share_profile.svg">
      <div
          v-if="status === 'shareClicked'"
      >text copied to clipboard</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {randomIntFromInterval} from "@/main"
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
        "https://azertypow.github.io/head.project.adface/img/adds/a0.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a1.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a2.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a3.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a4.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a5.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a6.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a7.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a8.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a9.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a10.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a11.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a12.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a13.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a14.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a15.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a16.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a17.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a18.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a19.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b0.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b1.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b2.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b3.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b4.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b5.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b6.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b7.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b8.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b9.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b10.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b11.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b12.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b13.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b14.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b15.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b16.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b17.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b18.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b19.png",
      ]
    }
  },

  mounted() {
    this.placeImageInView(0, this.listOfImages)
  },

  methods: {
    placeImageInView(indexOfListOfImages: number, listOfImages: string[]) {

      const imagesContainer = this.$refs.imagesContainer

      if(imagesContainer instanceof HTMLDivElement) {

        const imgElement = document.createElement("img")
        imgElement.src = listOfImages[indexOfListOfImages]
        imgElement.style.left = randomIntFromInterval(0, 100) + 'vw'
        imgElement.style.top  = randomIntFromInterval(0, 100) + 'vh'
        imagesContainer.appendChild(imgElement)

        indexOfListOfImages++

        if (indexOfListOfImages < listOfImages.length) window.setTimeout(() => {
          this.placeImageInView(indexOfListOfImages, this.listOfImages)
        }, 500)

        else {
          window.setTimeout(() => {
            this.status = "ended"
          }, 2000)
        }
      }
    },

    shareClicked() {
      navigator.clipboard.writeText("https://azertypow.github.io/head.project.adface/#/profile").then(() => {
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
    width: 500px;
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
