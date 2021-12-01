import {createStore, MutationTree} from 'vuex'
import {IImageAnalysisResponse} from "@/main"

export enum MutationTypes {
  ABOUT_IS_OPEN = "aboutIsOpen",
  IMG_ANALYSIS_RESP = "imageAnalysisResponse",
}

export default createStore({
  state: {
    aboutIsOpen: false,
    imageAnalysisResponse: null as IImageAnalysisResponse | null
  },
  mutations: {
    [MutationTypes.ABOUT_IS_OPEN]:(state, payload) => {
      state.aboutIsOpen = payload
    },
    [MutationTypes.IMG_ANALYSIS_RESP]: (state, payload) => {
      state.imageAnalysisResponse = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
