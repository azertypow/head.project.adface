<template>
  <nav class="v-navigation">

    <div
        class="v-navigation__left"
    ><span class="mmd-logo">Ad<span class="mmd-logo__point">.</span>Face</span></div>

    <div
        class="v-navigation__right"
    ><div class="v-navigation__about"
          @click="onAboutClick"
          :class="{'is-open':aboutIsOpen}"
    >about <span class="v-navigation__about__ui">+</span></div></div>
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
  padding: var(--unit);
  background-color: var(--site-color--background);
  z-index: 100000;
  top: 0;
  left: 0;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
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
