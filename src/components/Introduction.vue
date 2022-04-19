<template>
  <div class="v-introduction">

    <div class="v-introduction__content">
      <p>To start the <b>interactive</b> experience <b>ADFace</b>, please allow access to your webcam (refresh the page if you are not prompted) and agree to the terms and conditions.</p>

      <h3>What does your face say about you? The steps of the experience after “Start”</h3>
      <ol>
        <li>Tick the box "I agree to terms and conditions to start the experience" and allow the camera.</li>
        <li>Smile! On the right side, your face is being read and analysed by algorithms.</li>
        <li>You will receive targeted advertisements based on who the algorithm thinks you are.</li>
        <li>In the end, discover your personal profile based on which you received the ads.</li>
        <li>Imagine, if algorithms not only decide what kind of ads you will receive, but also what kind of information, jobs or health insurance, you will have access to.</li>
        <li>Please share your thoughts and profile via social media and invite others to the experience!</li>
      </ol>
      <button
          @click="startExperience"
      >start ADface!
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {MutationTypes} from "@/store"

export default defineComponent({
  name: 'Introduction',
  components: {
  },

  data() {
    return {
      store: useStore()
    }
  },

  methods: {
    startExperience() {
      this.store.commit(MutationTypes.SHOW_INTRODUCTION, false)
    },
  }

});
</script>

<style lang="scss" scoped>
button {
  margin-top: var(--text-line-height);
  margin-bottom: calc( var(--text-line-height) * 2 );
}

.v-introduction {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--site-color--background);
  z-index: 10000;
  overflow: auto;
  box-sizing: border-box;
}

.v-introduction__content {
  position: relative;
  width: 100%;
  max-width: 30em;
  padding-top:    calc( var(--nav-height) * 1 );
  padding-bottom: calc( var(--nav-height) * 2 );
  margin: auto;


  >*:first-child {
    margin-top: 0;
  }
}

ol {
}

ul {
  padding-left: 0;
  li {
    display: block;
    position: relative;
    padding-left: calc( var(--gutter) * 2 );

    &:before{
      content: '— ';
      display: block;
      position: absolute;
      left: 0;
    }
  }
}
</style>
