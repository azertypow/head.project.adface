<template>
  <div
      :class="{
      'small-nav': aboutIsOpen || this.$route.name === 'Term'
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

    <transition name="view" mode="out-in"  >
      <introduction
          v-if="store.state.showIntroduction"
      ></introduction>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in"  >
        <component :is="Component" />
      </transition>
    </router-view>

    <navigation/>

    <div
        class="v-app__mobile-msg v-app__dialogue-message"
    >
      <p>This experience only functions as a desktop&nbsp;version.<br
      >Try it on your&nbsp;computer!</p>
    </div>

    <div
        class="v-app__dialogue-message"
        v-if="store.state.showDialogue"
    >
      <p>We can't detect your face. Make sure you put your whole head in front of your&nbsp;webcam.<br
        ><span
          @click="closeDialogue"
          class="mmd-link"
      >I understood, back to the&nbsp;experience.</span>
      </p>
    </div>

  </div>
</template>

<script lang="ts">
import Navigation from "@/components/navigation.vue"
import {useStore} from "vuex"
import ApplicationRendering from "@/components/ApplicationRendering.vue"
import {MutationTypes} from "@/store"
import {defineComponent} from "vue"
import Introduction from "@/components/Introduction.vue"

export default defineComponent({
  components: {Introduction, ApplicationRendering, Navigation},

  data(){
    return {
      store: useStore(),
    }
  },

  computed: {
    aboutIsOpen(): boolean {
      return this.$route.name === "About"
    },
  },

  methods: {
    closeDialogue() {
      this.store.commit(MutationTypes.SHOW_DIALOGQUE, false)
    }
  },
})
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
  min-width: var(--min-width);
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

.v-app__dialogue-message {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: block;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9000000000;

  > p {
    color: var(--site-color--background);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 32rem;
  }
}

.v-app__mobile-msg {
  @media all and (min-width: 680px) {
    display: none;
  }
}

</style>
