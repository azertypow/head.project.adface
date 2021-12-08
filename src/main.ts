import "./style/_main.scss"

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

export const params = {
  baseUrl: "http://192.168.1.20:5000"
}

export enum URL_PARAMS_NAMES {
  gender  = "g",
  age     = "a",
  emotion = "e",
}

createApp(App).use(store).use(router).mount('#app')

export type IImageAnalysisResponseGender = 'Man' | "Woman"
export type IImageAnalysisResponseAge = "0-10" | "10-20" | "20-30" | "30-40" | "40-50" | "60-+"
export type IImageAnalysisResponseEmotion = "neutral" | "happy" | "sad" | "angry" | "fearful" | "disgusted" | "surprised"

export interface IImageAnalysisResponse {
  gender:     IImageAnalysisResponseGender
  age:        IImageAnalysisResponseAge
  emotion:    IImageAnalysisResponseEmotion
}

export function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const DURATION_PARAMETERS = {
  agreeAndCamera:             2_500, //ms
  cameraDuration:             5_000, //ms
  addsInterval:               500, //ms
  beforeShowingShareProfile:  1_000, //ms
}
