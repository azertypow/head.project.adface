<template>
  <div class="v-home">

    <intro/>

    <description/>

    <div class="v-home__video">
      <video
          autoplay
          muted
          playsinline
          class="v-home__video-render"
          @loadedmetadata="onPlay"
          ref="videoElement"
      ></video>
      <canvas
          class="v-home__overlay"
          ref="canvasOverlay"
      />

      <router-link
          to="/app"
          style="
          display: block;
          position: absolute;
          bottom: 50px;
          right: 50px;
          "
      >
        go to result page (remove this button in production)
      </router-link>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  detectSingleFace,
  draw,
  loadFaceDetectionModel,
  matchDimensions,
  nets,
  resizeResults,
  TinyFaceDetectorOptions
} from "face-api.js"
import Intro from "@/components/Intro.vue"
import Description from "@/components/description.vue" // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Description,
    Intro
  },

  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {}
    })

    const videoElement = document.querySelector('.v-home__video-render') as HTMLVideoElement

    videoElement.srcObject = stream

    nets.tinyFaceDetector.load("/").then(() => {
      console.log("loaded")
    }).catch(reason => {
      console.log(reason)
    })

  },

  methods: {
    async onPlay(): Promise<any> {

      const videoEl = this.$refs.videoElement as HTMLVideoElement
      const canvas = this.$refs.canvasOverlay as HTMLCanvasElement

      if(videoEl.paused || videoEl.ended || !this.isFaceDetectionModelLoaded()) {
        console.log("pas loaded")
        return setTimeout(() => this.onPlay())
      }


      const options = new TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: .5,
      })

      const ts = Date.now()

      const result = await detectSingleFace(videoEl, options)

      // updateTimeStats(Date.now() - ts)

      if (result) {
        const dims = matchDimensions(canvas, videoEl, true)
        draw.drawDetections(canvas, resizeResults(result, dims))
      }

      setTimeout(() => this.onPlay())
    },

    isFaceDetectionModelLoaded() {
      return !!nets.tinyFaceDetector.params
    },

  },

});
</script>

<style lang="scss">

.v-home__video {
  width: 100%;
  height: calc( 100vh - var(--nav-height));
  position: relative;
}

.v-home__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.v-home__video-render {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

</style>
