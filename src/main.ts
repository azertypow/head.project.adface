import "./style/_main.scss"

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

export const params = {
  baseUrl: "http://192.168.1.20:5000"
}

createApp(App).use(store).use(router).mount('#app')

export type IImageAnalysisResponseGender  = 'Man' | "Woman"
export type IImageAnalysisResponseAge     = number //
export type IImageAnalysisResponseEmotion = "angry" | "disgust" | "fear" | "happy" | "neutral" | "sad" | "surprise"
export type IImageAnalysisResponseRace    = "asian" | "black" | "indian" | "latino hispanic" | "middle eastern" | "white"

export interface IImageAnalysisResponse {
  gender:     IImageAnalysisResponseGender
  age:        IImageAnalysisResponseAge
  emotion:    IImageAnalysisResponseEmotion
  race:       IImageAnalysisResponseRace
}

export function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// export const DURATION_PARAMETERS = {
//   agreeAndCamera:             2_500, //ms
//   cameraDuration:             5_000, //ms
//   addsInterval:               500, //ms
//   beforeShowingShareProfile:  1_000, //ms
// }

export const DURATION_PARAMETERS = {
  agreeAndCamera:             50, //ms
  cameraDuration:             50, //ms
  addsInterval:               50, //ms
  beforeShowingShareProfile:  50, //ms
}
