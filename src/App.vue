<template>
  <div
      :class="{
      'small-nav': aboutIsOpen || this.$route.path === '/term'
      }"
      class="v-app">

    <transition name="view" mode="out-in"  >
      <div
          v-if="store.state.showProfile"
          class="v-app__profile"
      >
        <ApplicationRendering></ApplicationRendering>
      </div>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in"  >
        <component :is="Component" />
      </transition>
    </router-view>

    <navigation
        v-if="this.$route.path !== '/profile'"
    />
  </div>
</template>

<script lang="ts">
import Navigation from "@/components/navigation.vue"
import {useStore} from "vuex"
import ApplicationRendering from "@/components/ApplicationRendering.vue"
export default {
  components: {ApplicationRendering, Navigation},

  data(){
    return {
      store: useStore(),
    }
  },

  computed: {
    aboutIsOpen(): boolean {
      //@ts-ignore
      return this.store.state.aboutIsOpen
    },
  },

  methods: {

  },
}
</script>

<style lang="scss">

.v-app {
  box-sizing: border-box;
  padding-bottom: var(--nav-height);
  animation: intro;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

// page transition
.view-leave-active,
.view-enter-active {
  position: relative;
  opacity: 0;
  transform: translate3d(0, 50px, 0);
  transition: opacity .5s ease-in-out, transform .75s ease-in-out;
}

.view-enter,
.view-leave-to {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}

.view-enter-to,
.view-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.v-app__profile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900000000;
}

</style>
