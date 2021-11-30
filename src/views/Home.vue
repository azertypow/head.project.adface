<template>
  <div class="v-home">

    <div class="v-home__bg">
      <div class="v-home__bg__top-left"></div>
      <div class="v-home__bg__top-right"></div>
      <div class="v-home__bg__bottom-right"></div>
    </div>


    <div class="v-home__main">
      <div class="v-home__text mmd--with-padding mmd--child-rm-margin" >
        <p>An experience about micro-targeting and ad-tech. how algorithnnnnn your personal
          <br>Not data is not collected and you </p>
      </div>

      <div
          class="v-home__check-box mmd--with-padding mmd--child-rm-margin mmd-box"
      >
        <div
            class="v-home__check-box__ui"
            :class="{
              'is-validate': termValidate
            }"
            @click="validateTerm"
        ></div>
        <p class="mmd--no-margin" ><router-link to="/term" >I agree to the terms and conditions</router-link></p>
      </div>
    </div>


    <div
        class="v-home__video"
        :class="{
          'is-active': showVideo
        }"
    >
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
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  detectAllFaces,
  detectSingleFace,
  draw,
  loadFaceDetectionModel,
  matchDimensions,
  nets,
  resizeResults,
  TinyFaceDetectorOptions
} from "face-api.js"

export default defineComponent({
  name: 'Home',

  components: {
  },

  data(){
    return {
      termValidate: false,
      showVideo: false,
    }
  },

  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {}
    })

    if(this.$refs.videoElement instanceof HTMLVideoElement) this.$refs.videoElement.srcObject = stream

    this.loadModels()
  },

  methods: {

    loadModels() {
      nets.tinyFaceDetector.load("https://azertypow.github.io/head.project.adface/").then(() => {
        console.info("tinyFaceDetector loaded")
      }).catch(reason => {
        console.log(reason)
      })

      nets.faceLandmark68TinyNet.load("https://azertypow.github.io/head.project.adface/").then(() => {
        console.info("faceLandmark68TinyNet loaded")
      }).catch(reason => {
        console.log(reason)
      })
    },

    async onPlay(): Promise<any> {

      const videoEl = this.$refs.videoElement as HTMLVideoElement
      const canvas = this.$refs.canvasOverlay as HTMLCanvasElement

      if( videoEl.paused
          || videoEl.ended
          || !this.isFaceDetectionModelLoaded()
          || !this.isFaceLandmark68TinyNetModelLoaded()
      ) {
        console.log("pas loaded")
        return setTimeout(() => this.onPlay())
      }


      const options = new TinyFaceDetectorOptions({
        inputSize: 160,
        scoreThreshold: .5,
      })

      const result = await detectAllFaces(videoEl, options).withFaceLandmarks(true)

      if (result) {
        const dims = matchDimensions(canvas, videoEl, true)
        const resultsResized = resizeResults(result, dims)

        draw.drawDetections(canvas, resultsResized)
        draw.drawFaceLandmarks(canvas, resultsResized)
      }

      setTimeout(() => this.onPlay())
    },

    isFaceDetectionModelLoaded() {
      return !!nets.tinyFaceDetector.params
    },

    isFaceLandmark68TinyNetModelLoaded() {
      return !!nets.faceLandmark68TinyNet.params
    },

    validateTerm() {
      this.termValidate = !this.termValidate
      this.showVideo = true
    },

  },

});
</script>

<style lang="scss">

.v-home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.v-home__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.v-home__bg__top-left {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--site-color--background--dark);
  width: calc(100% / 7 * 5);
  height: calc(100% / 7 * 1);
  z-index: 3;
}
.v-home__bg__top-right {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--site-color--secondary);
  width: calc(100% / 7 * 3);
  height: calc(100% / 7 * 2);
  z-index: 2;
}
.v-home__bg__bottom-right {
  position: absolute;
  bottom: calc(100% / 7 * 1);
  right: var(--gutter);
  background: var(--site-color--main);
  width:  calc(100% / 7 * 1);
  height: calc(100% / 7 * 3);
  z-index: 1;
}

.v-home__main {
  position: absolute;
  z-index: 10;
  top: calc(100% / 7 * 1 + var(--text-line-height));
  left: var(--text-line-height);
  width: calc( 100% - var(--text-line-height) * 2 - var(--video-size) - (100% / 7 * .5 ) );
}

.v-home__text {
  overflow: hidden;
  background: var(--site-color--secondary);
  padding: var(--unit);
  position: relative;
  width: 100%;
}

.v-home__check-box {
  background: var(--site-color--main_light);
  position: relative;
  width: 100%;
  margin-top: var(--text-line-height);
}

.v-home__check-box__ui {
  cursor: pointer;
  height: var(--text-line-height);
  width:  var(--text-line-height);
  background: var(--site-color--main_light);
  margin-right: var(--gutter);
  box-sizing: border-box;
  border: solid var(--border-width) var(--site-color--main_dark);
  flex-shrink: 0;

  &.is-validate {
    background: var(--site-color--secondary);
  }
}

.v-home__video {
  width: var(--video-size);
  height: var(--video-size);
  position: absolute;
  background: black;
  top: calc(100% / 7 * 1 + var(--text-line-height));
  right: calc(100% / 7 * .5 );
  z-index: 10;
}

.v-home__overlay,
.v-home__video-render {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  transition: opacity 1s ease-in-out;
  opacity: 0;

  .is-active & {
    opacity: 1;
  }
}

</style>
