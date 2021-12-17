<template>
  <div class="v-home mmd--page">

    <div class="v-home__bg">
      <div class="v-home__bg__top-left"></div>
      <div class="v-home__bg__top-right"></div>
      <div class="v-home__bg__bottom-right"></div>
    </div>

    <result-view v-if="showResult"></result-view>

    <div
        class="v-home__main"
        v-if="showForm"
    >
      <div class="v-home__text mmd--with-padding mmd--child-rm-margin">
        <p>Swiss Digital Initiative presents ADface, an&nbsp;experience about digital trust, and&nbsp;how ″facial&nbsp;analysis technologies″ are&nbsp;deployed in targeted&nbsp;advertising.</p>
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
          Access to your camera is necessary, but no personal data is collected.
          <router-link to="/term">I&nbsp;agree to the terms and conditions.</router-link>
        </p>
      </div>
    </div>


    <div
        class="v-home__video"
        :class="{
          'is-active': (showVideo && !showResult)
        }"
    >
      <img
          v-if="showSnap"
          :src="snapShot"
          class="v-home__img-render"
          alt="video snapshot"
      />
      <video
          v-if="!showSnap"
          autoplay
          muted
          playsinline
          class="v-home__video-render"
          @loadedmetadata="onPlay"
          ref="videoElement"
      ></video>
      <canvas
          v-if="!showSnap"
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
import {
  DURATION_PARAMETERS,
  getConvertedEmotion,
  getConvertedRace,
  IImageAnalysis,
  IImageAnalysisResponse,
  params
} from "@/main"
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
      showForm: true,
      imageAnalyseResponse: undefined as undefined | null | IImageAnalysisResponse,
      showSnap: false
    }
  },

  computed: {
    showResult(): boolean {
      console.log( this.store.state.imageAnalysisResponse )
      return this.store.state.imageAnalysisResponse !== null
    },

    snapShot(): string | null {
      return this.store.state.snapShot
    },
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
      nets.tinyFaceDetector.load(params.webappBaseUrl).then(() => {
        console.info("tinyFaceDetector loaded")
      }).catch(reason => {
        console.log(reason)
      })

      nets.faceLandmark68TinyNet.load(params.webappBaseUrl).then(() => {
        console.info("faceLandmark68TinyNet loaded")
      }).catch(reason => {
        console.log(reason)
      })
    },

    async onPlay(): Promise<any> {

      const videoEl = this.$refs.videoElement
      const canvas = this.$refs.canvasOverlay

      if (videoEl instanceof HTMLVideoElement && canvas instanceof HTMLCanvasElement) {

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

      }
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

      window.setTimeout(async () => {
        this.showForm = false

        this.startImageProcess().then(analyseResp => {
          this.imageAnalyseResponse = analyseResp
          this.showSnap = true
          console.log("result ok")
        }).catch(reason => {
          console.error("image process error: \n" + reason)
          this.imageAnalyseResponse = null
        })

        this.saveAnalyseResponse()

      }, DURATION_PARAMETERS.agreeAndCamera)
    },

    saveAnalyseResponse() {
      window.setTimeout(() => {
        if (this.imageAnalyseResponse !== undefined) {
          if (this.imageAnalyseResponse !== null && this.imageAnalyseResponse.instance_1) {

            const cleanAnalyseResponse: IImageAnalysis = {
              age:      this.imageAnalyseResponse.instance_1.age,
              emotion:  getConvertedEmotion(this.imageAnalyseResponse.instance_1.emotion),
              gender:   this.imageAnalyseResponse.instance_1.gender,
              race:     getConvertedRace(this.imageAnalyseResponse.instance_1.race),
            }

            this.store.commit(MutationTypes.IMG_ANALYSIS_RESP, cleanAnalyseResponse)
            console.log("analyse added")
          } else {
            console.log("oups try again")
            // try again
          }
        } else {
          this.saveAnalyseResponse()
        }
      }, DURATION_PARAMETERS.cameraDuration)
    },


async startImageProcess(): Promise<IImageAnalysisResponse> {
      return new Promise(async (resolve, reject) => {
        this.store.commit(MutationTypes.SAVE_SNAP_SHOT, this.snapWebcam({}))

        if(this.snapShot !== null && this.snapShot.length > 0) {
          this.sendImageData(this.snapShot)
              .then(value   => {resolve(value)})
              .catch(error  => {reject("sendImageData error \n" + error)})
        }
        else reject("snapShot error")
      })
    },


    snapWebcam({
                 width = 320,
                 height = 240,
                 image_format = 'jpeg',
                 jpeg_quality = 90,
               }): string {

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

      return ""
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

        fetch(
            `${params.baseUrl}/analyze`,
            options,
        ).then(async value => {
          resolve( await value.json() )
        }).catch(reason => {
          reject("analytic api error: " + reason)
        })

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
  width: 75%;
  max-width: 30em;
}

.v-home__check-box {
  background: var(--site-color--main_light);
  position: relative;
  width: 100%;
  margin-top: var(--text-line-height);
  margin-bottom: 90px;

  @media all and (min-width: 1400px) {
    margin-bottom: 160px;
  }
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

.v-home__img-render {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  filter: grayscale(1);
}

.v-home__video-render {
  filter: grayscale(1);
}

</style>
