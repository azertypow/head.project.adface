<template>
  <div
      ref="imagesContainer"
      class="v-result-view"
  >

    <div class="imagesContainer__share">
      <button>share results</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {randomIntFromInterval} from "@/main"

export default defineComponent({
  name: 'ResultView',
  components: {
  },

  data() {
    return {
      status: "started" as "started" | "ended",
      listOfImages: [
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
        "https://azertypow.github.io/head.project.adface/img/img.png",
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
        }, 50)

        else this.status = "ended"
      }
    }
  },

});
</script>

<style lang="scss">
.v-result-view {
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
  }
}
</style>
