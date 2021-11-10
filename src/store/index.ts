import {createStore, MutationTree} from 'vuex'

export enum MutationTypes {
  ABOUT_IS_OPEN = "aboutIsOpen"
}

export default createStore({
  state: {
    aboutIsOpen: false,
  },
  mutations: {
    [MutationTypes.ABOUT_IS_OPEN]:(state, payload) => {
      state.aboutIsOpen = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
