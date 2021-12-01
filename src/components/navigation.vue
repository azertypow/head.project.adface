<template>
  <nav class="v-navigation mmd--box mmd--with-gutter">

    <div
        class="v-navigation__left"
    >
      <router-link
          to="/"
          class="mmd-logo mmd-font-xxl"
      >ADface.me</router-link>
    </div>

    <div
        class="v-navigation__right"
    >

      <img src="../assets/Logo_SDI_pos_RGB.png" alt="SDI logo" class="v-navigation__logo">

      <div class="v-navigation__about"
          @click="onAboutClick"
          :class="{'is-open':aboutIsOpen}"
      >about the project<span class="v-navigation__about__ui">+</span></div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {MutationTypes} from "@/store"

export default defineComponent({
  name: 'navigation',
  components: {
  },

  data(){
    return {
      store: useStore(),
    }
  },

  computed:{
    aboutIsOpen(): boolean {
      return this.store.state.aboutIsOpen
    },
  },

  methods: {
    onAboutClick() {
      this.store.commit(MutationTypes.ABOUT_IS_OPEN, !this.aboutIsOpen)
    }
  },

});
</script>

<style lang="scss" scoped>
.v-navigation {
  position: fixed;
  width: 100%;
  height: var(--nav-height);
  box-sizing: border-box;
  background-color: var(--site-color--main_light);
  z-index: 100000;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
}

.v-navigation__right {
  display: flex;
  flex-direction: column;
  padding-top: var(--gutter);
  padding-bottom: var(--gutter);
  justify-content: space-between;
}

.v-navigation__logo {
  height: 50%;
  width: auto;
  display: block;
  object-fit: contain;
  object-position: top right;
}

.v-navigation__about {
  user-select: none;
  cursor: pointer;
}

.v-navigation__about {

}

.v-navigation__about__ui {
  display: inline-block;
  transition: transform 250ms ease-in-out;
  transform: rotate3d(0, 0, 0, 45deg);

  .is-open & {
    transform: rotate3d(0, 0, 1, 45deg);
  }
}

</style>
