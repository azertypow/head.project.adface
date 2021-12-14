<template>
  <div class="v-term mmd--page mmd--with-padding mmd--child-rm-margin mmd-with-scroll">

    <div    class="v-term__bg">
      <div  class="v-term__bg__top-left"></div>
      <div  class="v-term__bg__top-right"></div>
    </div>

      <div class="v-term__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi eos explicabo ipsam molestiae quia quisquam sint! Aliquid beatae, dignissimos est explicabo harum, ipsum minima natus nesciunt perspiciatis provident rerum tempora.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur dolor ducimus facere, fugiat id illum impedit itaque minima modi neque, odit perferendis quam quia quisquam, ratione sint. Distinctio, officiis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi aperiam, consequuntur cum doloribus ducimus facilis impedit nostrum odio perspiciatis placeat porro quidem similique veniam voluptate. A commodi molestias vitae!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto deserunt dolore doloribus eius excepturi hic labore molestias nam, natus porro possimus, recusandae reiciendis unde voluptatem voluptates. Ipsa, sint.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolores error excepturi iure magnam optio quasi. Ab aliquam autem commodi consequatur dolorem doloribus eaque nulla placeat, unde ut veniam voluptas.</p>
      </div>
    <p>
      <router-link to="/">back to home</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Term',
  components: {
  },
});
</script>

<style lang="scss" scoped>
.v-term {
  height: 100%;
  padding-left: var(--left-padding);
}

.v-term__content {
  position: relative;
  max-width: 37em;
  padding-top: calc(100vh / 7 * 2.25);
}

.v-term__bg {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.v-term__bg__top-left {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--site-color--background--dark);
  width: calc(100% / 7 * 5);
  height: calc(100% / 7 * 1);
  z-index: 3;
}

.v-term__bg__top-right {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--site-color--secondary);
  width: calc(100% / 7 * 3);
  height: calc(100% / 7 * 2);
  z-index: 2;
}
</style>
