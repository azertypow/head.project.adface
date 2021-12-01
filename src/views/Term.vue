<template>
  <div class="v-term mmd--with-padding mmd--child-rm-margin mmd-with-scroll">
      <div>
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
}
</style>
