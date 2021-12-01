<template>
  <div class="v-result-view">
    <img src="https://azertypow.github.io/head.project.adface/img/img.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResultView',
  components: {
  },
});
</script>

<style lang="scss" scoped>
.v-result-view {
  position: fixed;
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
