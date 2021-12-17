import {createStore, MutationTree} from 'vuex'
import {IImageAnalysis} from "@/main"

export enum MutationTypes {
  ABOUT_IS_OPEN = "aboutIsOpen",
  IMG_ANALYSIS_RESP = "imageAnalysisResponse",
  SHOW_PROFILE = "showProfile",
  SAVE_SNAP_SHOT = "saveSnapShot",
}

export default createStore({
  state: {
    aboutIsOpen: false,
    imageAnalysisResponse: null as IImageAnalysis | null,
    showProfile: false,
    snapShot: null as string | null,
  },
  mutations: {
    [MutationTypes.ABOUT_IS_OPEN]:(state, payload) => {
      state.aboutIsOpen = payload
    },
    [MutationTypes.IMG_ANALYSIS_RESP]: (state, payload) => {
      state.imageAnalysisResponse = payload
    },
    [MutationTypes.SHOW_PROFILE]: (state, payload) => {
      state.showProfile = payload
    },
    [MutationTypes.SAVE_SNAP_SHOT]: (state, payload) => {
      state.snapShot = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
