import {createStore, MutationTree} from 'vuex'
import {IImageAnalysisResponse} from "@/main"

export enum MutationTypes {
  ABOUT_IS_OPEN = "aboutIsOpen",
  IMG_ANALYSIS_RESP = "imageAnalysisResponse",
}

export default createStore({
  state: {
    aboutIsOpen: false,
    imageAnalysisResponse: {
      emotion: "neutral",
      age: 20,
      gender: "Woman",
      race: "latino hispanic",
    } as IImageAnalysisResponse | null
  },
  mutations: {
    [MutationTypes.ABOUT_IS_OPEN]:(state, payload) => {
      state.aboutIsOpen = payload
    },
    [MutationTypes.IMG_ANALYSIS_RESP]: (state, payload) => {
      state.imageAnalysisResponse = payload
    },
  },
  getters: {

    ageClassified(state): "0-10" | "10-20" | "20-30" | "30-40" | "40-50" | "60-+" | null {
      const age = state.imageAnalysisResponse?.age
      if(age === undefined) return null
      else if(age <= 10) return "0-10"
      else if(age <= 20) return "10-20"
      else if(age <= 30) return "20-30"
      else if(age <= 40) return "30-40"
      else if(age <= 50) return "40-50"
      else return "60-+"
    }

  },
  actions: {
  },
  modules: {
  }
})
