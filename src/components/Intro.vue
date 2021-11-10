<template>
  <div class="v-intro">
    <div
        class="v-intro__content mmd--child-rm-margin mmd--with-gutter"
    >
      <h1><span class="mmd-logo">Ad<span class="mmd-logo__point">.</span>Face</span></h1>
      <p>Advertising is a marketing communication that employs an openly sponsored, non-personal message to promote or sell a product, service or idea. </p>
      <button
          @click="onContinueClick"
      >continue the experience</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Intro',

  methods: {
    onContinueClick() {
      window.scrollTo({
        top: window.innerHeight,
      })
    }
  },

  components: {
  },
});
</script>

<style lang="scss" scoped>
.v-intro {
  height: calc( 100vh - var(--nav-height));
  position: relative;
  text-align: center;
  background: var(--site-color--main_dark);
  color: var(--site-color--background);
}

.v-intro__content {
  position: absolute;
  top: calc( 50% - (var(--nav-height) / 2 ));
  transform: translate3d(0, -50%, 0);
}

</style>
