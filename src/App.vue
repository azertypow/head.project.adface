<template>
  <div class="v-app">

    <navigation/>

    <transition name="view" mode="out-in"  >
      <about v-if="aboutIsOpen"/>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in"  >
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script lang="ts">
import Navigation from "@/components/navigation.vue"
import About from "@/components/About.vue"
import {useStore} from "vuex"
export default {
  components: {About, Navigation},

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
  padding-top: var(--nav-height);
  animation: intro;
}

// page transition
.view-leave-active,
.view-enter-active {
  position: relative;
  opacity: 0;
  transform: translate3d(0, 100px, 0);
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.view-enter,
.view-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}

.view-enter-to,
.view-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

</style>
