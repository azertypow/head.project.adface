<template>
  <div class="v-home">

    <div class="v-home__bg">
      <div class="v-home__bg__top-left"></div>
      <div class="v-home__bg__top-right"></div>
      <div class="v-home__bg__bottom-right"></div>
    </div>

    <result-view v-if="showResult"></result-view>

    <div
        class="v-home__main"
        v-if="!showVideo"
    >
      <div class="v-home__text mmd--with-padding mmd--child-rm-margin">
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
        <p class="mmd--no-margin">
          <router-link to="/term">I agree to the terms and conditions</router-link>
        </p>
      </div>
    </div>


    <div
        class="v-home__video"
        :class="{
          'is-active': (showVideo && !showResult)
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
import {defineComponent} from 'vue';
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
import {IImageAnalysisResponse, params} from "@/main"
import ResultView from "@/components/ResultView.vue"
import {useStore} from "vuex"
import {MutationTypes} from "@/store"

export default defineComponent({
  name: 'Home',

  components: {
    ResultView
  },

  data() {
    return {
      store: useStore(),
      termValidate: false,
      showVideo: false,
      imageProcessAnalysis: null as null | IImageAnalysisResponse,
    }
  },

  computed: {
    showResult(): boolean {
      return this.store.state.imageAnalysisResponse !== null
    }
  },

  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {}
    })

    if (this.$refs.videoElement instanceof HTMLVideoElement) this.$refs.videoElement.srcObject = stream

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

      if (videoEl.paused
          || videoEl.ended
          || !this.isFaceDetectionModelLoaded()
          || !this.isFaceLandmark68TinyNetModelLoaded()
      ) {
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

        for (const resultResized of resultsResized) {
          const box = new draw.DrawBox(resultResized.alignedRect.box)
          box.draw(canvas)
        }

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

    async validateTerm() {
      this.termValidate = !this.termValidate
      this.showVideo = true
      this.store.commit(MutationTypes.IMG_ANALYSIS_RESP, await this.startImageProcess())
    },

    async startImageProcess(): Promise<IImageAnalysisResponse> {
      return new Promise(async (resolve, reject) => {
        const snapWebcam = this.snapWebcam({})

        if (snapWebcam) {
          console.log( snapWebcam )
          resolve(await this.sendImageData(snapWebcam))
        }
        else reject("snapWebcam error")
      })
    },


    snapWebcam({
                 width = 320,
                 height = 240,
                 image_format = 'jpeg',
                 jpeg_quality = 90,
               }) {

      // if(this.$refs.canvasOverlay instanceof HTMLCanvasElement) {
      //   return this.$refs.canvasOverlay.toDataURL(`image/${image_format}`, jpeg_quality / 100 )
      // }

      if(this.$refs.videoElement instanceof HTMLVideoElement) {
        const drawCanvas = document.createElement("canvas")
        const drawCanvasContext = drawCanvas.getContext("2d")
        drawCanvas.width = this.$refs.videoElement.videoWidth
        drawCanvas.height = this.$refs.videoElement.videoHeight

        drawCanvasContext?.drawImage(this.$refs.videoElement, 0, 0, this.$refs.videoElement.videoWidth, this.$refs.videoElement.videoHeight)
        return drawCanvas.toDataURL(`image/${image_format}`, jpeg_quality / 100 )
      }
    },


    async sendImageData(data_uri: string): Promise<IImageAnalysisResponse> {
      return new Promise(async (resolve, reject) => {

        const options = {
          method: 'POST',
          crossDomain: true,
          body: JSON.stringify({
            img: [data_uri]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }

        window.setTimeout(() => {
          resolve({
            age: "0-10",
            emotion: "angry",
            gender: "Woman",
          })
        }, 15000)

        // const response = await fetch(
        //     `${params.baseUrl}/analyze`,
        //     options,
        // )
        //
        // const result = await response.json()
        //
        // console.log(result)

      })
    }
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
  width: calc(100% / 7 * 1);
  height: calc(100% / 7 * 3);
  z-index: 1;
}

.v-home__main {
  position: absolute;
  z-index: 10;
  top: calc(100% / 7 * 1 + var(--text-line-height));
  left: var(--text-line-height);
  width: calc(100% - var(--text-line-height) * 2 - var(--video-size) - (100% / 7 * .5));
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
  width: var(--text-line-height);
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
  right: calc(100% / 7 * .5);
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
  opacity: 0;

  .is-active & {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }
}

.v-home__video-render {
  filter: grayscale(1);
}

</style>
