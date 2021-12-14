<template>
  <nav class="v-navigation mmd-box mmd-box--to-end">

    <div
        class="v-navigation__left mmd--with-gutter"
    >
      <router-link
          to="/"
          class="mmd-logo mmd-font-xxl"
      >ADface</router-link>
    </div>

    <div
        class="v-navigation__right mmd-box mmd-box--coll mmd-box--to-end"
    >

      <div class="v-navigation__right__middle mmd-box mmd-box--to-end">
        <img src="../assets/Logo_SDI_pos_RGB.png"
             alt="SDI logo"
             class="v-navigation__logo mmd--with-gutter mmd--with-padding"
        >
      </div>

      <div class="v-navigation__about font--small mmd--with-gutter"
          @click="onAboutClick"
          :class="{'is-open':aboutIsOpen}"
      ><span
          v-if="!aboutIsOpen"
      >about the project</span><span
          v-else
      >close about</span> <span class="v-navigation__about__ui">+</span></div>
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
  z-index: 100000;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
}

.v-navigation__left {
  background-color: var(--site-color--main_light);
  padding-right: 30vw;
  max-width: 1260px;

  .mmd-logo {
    display: block;
    transition: font-size ease-in-out 500ms, line-height ease-in-out 500ms;

    .small-nav & {
      font-size: 7rem;
      line-height: var( --nav-height );
    }
  }
}

.v-navigation__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-navigation__right__middle {
  width: 100%;
  background: var(--site-color--background--dark);
}

.v-navigation__logo {
  width: auto;
  height: 4rem;
  display: block;
  object-fit: contain;
  object-position: top right;
  background-color: var(--site-color--main_light);
}

.v-navigation__about {
  user-select: none;
  cursor: pointer;
  width: 100%;
  background: var(--site-color--main_dark);
  color: var(--site-color--main_light);
  text-align: right;
  line-height: 2rem;
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
