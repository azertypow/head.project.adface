import "./style/_main.scss"

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

export const params = {
  baseUrl: ""
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




