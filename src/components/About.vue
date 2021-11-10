<template>
  <div class="v-about mmd--with-gutter">
    <div class="v-about__content">
      <h1>about descriptio</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore doloribus enim excepturi facere harum impedit ipsam magni molestiae, molestias mollitia nam neque obcaecati quas quia quos sunt temporibus, tenetur ut.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid deserunt dolores dolorum ducimus inventore maxime modi pariatur placeat reiciendis. Ab beatae fugit harum odit quisquam sed soluta. Amet officia, optio.</p>
      <h2>Amet officia, optio.</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  components: {

  },
});
</script>

<style lang="scss" scoped>
.v-about {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  height: calc(100% - var(--nav-height) );
  z-index: 10000;
  overflow: scroll;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  background: var(--site-color--main);
  color: var(--site-color--main_light);
}

.v-about__content{
  min-height: 125vh;
}
</style>
