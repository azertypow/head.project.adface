import "./style/_main.scss"

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

export const params = {
  baseUrl: "http://192.168.1.20:5000",
  webappBaseUrl: process.env.BASE_URL || "/"
}

createApp(App).use(store).use(router).mount('#app')

export type IImageAnalysisResponseGender  = 'Man' | "Woman"
export type IImageAnalysisResponseAge     = number //
export type IImageAnalysisResponseEmotion = "angry" | "disgust" | "fear" | "happy" | "neutral" | "sad" | "surprise"
export type IImageAnalysisResponseRace    = "asian" | "black" | "indian" | "latino hispanic" | "middle eastern" | "white"
export type IImageAnalyseResponseEmotionPercent = {
  angry: number;
  disgust: number;
  fear: number;
  happy: number;
  neutral: number;
  sad: number;
  surprise: number;
  [key: string]: number;
}

export interface IImageAnalysis {
  gender:     IImageAnalysisResponseGender
  age:        IImageAnalysisResponseAge
  emotion:    IImageAnalysisResponseEmotion
  race:       IImageAnalysisResponseRace
}

export interface IImageAnalysisResponse {
  "instance_1": {
    gender:     IImageAnalysisResponseGender
    age:        IImageAnalysisResponseAge
    emotion:    IImageAnalyseResponseEmotionPercent
    race:       IImageAnalysisResponseRace
  } | undefined
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

export function getAdsFolderName(imageAnalysisResponse: IImageAnalysis): string[] {

  const emotion =       imageAnalysisResponse.emotion
  const ageClassified = getAgeClassified(imageAnalysisResponse.age)
  const genre =         imageAnalysisResponse.gender

  console.log(emotion)
  console.log(ageClassified)
  console.log(genre)

  return imgThree[genre][ageClassified][getEmotionClassified(emotion)]
}

export function getEmotionClassified(emotion: IImageAnalysisResponseEmotion): "happy_surprise" |"neutral" | "angry_fear_sad_disgust" {
  if(emotion === "happy" || emotion === "surprise")     return "happy_surprise"
  else if(emotion === "neutral")                        return "neutral"
  else                                                  return "angry_fear_sad_disgust"
}

export function getAgeClassified(age: number): "0-10" | "10-20" | "20-30" | "30-40" | "40-50" | "50-60" | "60-+" {
       if(age <= 10) return "0-10"
  else if(age <= 20) return "10-20"
  else if(age <= 30) return "20-30"
  else if(age <= 40) return "30-40"
  else if(age <= 50) return "40-50"
  else if(age <= 60) return "50-60"
  else return               "60-+"
}

export function getConvertedEmotion(emotionPercent: IImageAnalyseResponseEmotionPercent): IImageAnalysisResponseEmotion {
  let stringToReturn: IImageAnalysisResponseEmotion | null = null
  let mostHighterEmotionValue = 0

  for (let emotionPercentKey in emotionPercent) {
    if(emotionPercent.hasOwnProperty(emotionPercentKey)) {
      if(stringToReturn === null) {
        mostHighterEmotionValue = emotionPercent[emotionPercentKey]
        stringToReturn = emotionPercentKey as IImageAnalysisResponseEmotion
      }
      else if(emotionPercent[emotionPercentKey] >= mostHighterEmotionValue) {
        mostHighterEmotionValue = emotionPercent[emotionPercentKey]
        stringToReturn = emotionPercentKey as IImageAnalysisResponseEmotion
      }
    }
  }

  console.log(emotionPercent)
  console.log(stringToReturn)
  return stringToReturn || "neutral"
}

export const imgThree = {
  "Man": {
    "0-10": {
      "happy_surprise":         ["01a-output_man_0-10_happy",   "01b-output_man_0-10_happy"],
      "neutral":                ["02a-output_man_0-10_neutral", "02b-output_man_0-10_neutral"],
      "angry_fear_sad_disgust": ["03a-output_man_0-10_unhappy", "03b-output_man_0-10_unhappy"],
    },
    "10-20": {
      "happy_surprise":         ["04a-output_man_10-20_happy",   "04b-output_man_10-20_happy"],
      "neutral":                ["05a-output_man_10-20_neutral", "05b-output_man_10-20_neutral"],
      "angry_fear_sad_disgust": ["06a-output_man_10-20_unhappy", "06b-output_man_10-20_unhappy"],
    },
    "20-30": {
      "happy_surprise":         ["07a-output_man_20-30_happy",   "07b-output_man_20-30_happy"],
      "neutral":                ["08a-output_man_20-30_neutral", "08b-output_man_20-30_neutral"],
      "angry_fear_sad_disgust": ["09a-output_man_20-30_unhappy", "09b-output_man_20-30_unhappy"],
    },
    "30-40": {
      "happy_surprise":         ["10a-output_man_30-40_happy",   "10b-output_man_30-40_happy"],
      "neutral":                ["11a-output_man_30-40_neutral", "11b-output_man_30-40_neutral"],
      "angry_fear_sad_disgust": ["12a-output_man_30-40_unhappy", "12b-output_man_30-40_unhappy"],
    },
    "40-50": {
      "happy_surprise":         ["13a-output_man_40-50_happy",   "13b-output_man_40-50_happy"],
      "neutral":                ["14a-output_man_40-50_neutral", "14b-output_man_40-50_neutral"],
      "angry_fear_sad_disgust": ["15a-output_man_40-50_unhappy", "15b-output_man_40-50_unhappy"],
    },
    "50-60": {
      "happy_surprise":         ["16a-output_man_50-60_happy",   "16b-output_man_50-60_happy"],
      "neutral":                ["17a-output_man_50-60_neutral", "17b-output_man_50-60_neutral"],
      "angry_fear_sad_disgust": ["18a-output_man_50-60_unhappy", "18b-output_man_50-60_unhappy"],
    },
    "60-+": {
      "happy_surprise":         ["19a-output_man_60_happy",   "19b-output_man_60_happy"],
      "neutral":                ["20a-output_man_60_neutral", "20b-output_man_60_neutral"],
      "angry_fear_sad_disgust": ["21a-output_man_60_unhappy", "21b-output_man_60_unhappy"],
    },
  },
  "Woman": {
    "0-10": {
      "happy_surprise":         ["22a-output_woman_0-10_happy",   "22b-output_woman_0-10_happy"],
      "neutral":                ["23a-output_woman_0-10_neutral", "23b-output_woman_0-10_neutral"],
      "angry_fear_sad_disgust": ["24a-output_woman_0-10_unhappy", "24b-output_woman_0-10_unhappy"],
    },
    "10-20": {
      "happy_surprise":         ["25a-output_woman_10-20_happy",   "25b-output_woman_10-20_happy"],
      "neutral":                ["26a-output_woman_10-20_neutral", "26b-output_woman_10-20_neutral"],
      "angry_fear_sad_disgust": ["27a-output_woman_10-20_unhappy", "27b-output_woman_10-20_unhappy"],
    },
    "20-30": {
      "happy_surprise":         ["28a-output_woman_20-30_happy",   "28b-output_woman_20-30_happy"],
      "neutral":                ["29a-output_woman_20-30_neutral", "29b-output_woman_20-30_neutral"],
      "angry_fear_sad_disgust": ["30a-output_woman_20-30_unhappy", "30b-output_woman_20-30_unhappy"],
    },
    "30-40": {
      "happy_surprise":         ["31a-output_woman_30-40_happy",   "31b-output_woman_30-40_happy"],
      "neutral":                ["32a-output_woman_30-40_neutral", "32b-output_woman_30-40_neutral"],
      "angry_fear_sad_disgust": ["33a-output_woman_30-40_unhappy", "33b-output_woman_30-40_unhappy"],
    },
    "40-50": {
      "happy_surprise":         ["34a-output_woman_40-50_happy",   "34b-output_woman_40-50_happy"],
      "neutral":                ["35a-output_woman_40-50_neutral", "35b-output_woman_40-50_neutral"],
      "angry_fear_sad_disgust": ["36a-output_woman_40-50_unhappy", "36b-output_woman_40-50_unhappy"],
    },
    "50-60": {
      "happy_surprise":         ["37a-output_woman_50-60_happy",   "37b-output_woman_50-60_happy"],
      "neutral":                ["38a-output_woman_50-60_neutral", "38b-output_woman_50-60_neutral"],
      "angry_fear_sad_disgust": ["39a-output_woman_50-60_unhappy", "39b-output_woman_50-60_unhappy"],
    },
    "60-+": {
      "happy_surprise":         ["40a-output_woman_60_happy",   "40b-output_woman_60_happy"],
      "neutral":                ["41a-output_woman_60_neutral", "41b-output_woman_60_neutral"],
      "angry_fear_sad_disgust": ["42a-output_woman_60_unhappy", "42b-output_woman_60_unhappy"],
    },
  }
}
