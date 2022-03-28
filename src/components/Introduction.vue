<template>
  <div class="v-introduction">

    <div class="v-introduction__content">
      <p>The Swiss Digital Initiative presents ADface, an interactive experience on how facial analysis technologies are
        deployed in targeted advertising. This is an interactive experience and takes around 2 minutes. The experience
        invites you to reflect on opportunities and risks of algorithmic decision-making and aims to raise awareness for
        AI ethics and digital&nbsp;trust.</p>
      <p>To start the experience, please allow access to your webcam (refresh the page if you are not prompted) and
        agree to the terms and&nbsp;conditions.</p>

      <h3>What does your face say about you? The steps of the experience after&nbsp;“Start”</h3>

      <ul>
        <li>Tick the box "I agree to terms and conditions to start the experience" and allow the&nbsp;camera.</li>
        <li>Smile! On the right side, your face is being read and analysed by&nbsp;algorithms.</li>
        <li>You will receive targeted advertisements based on who the algorithm thinks you&nbsp;are.</li>
        <li>In the end, discover your personal profile based on which you received the&nbsp;ads.</li>
        <li>Imagine, if algorithms not only decide what kind of ads you will receive, but also what kind of information,
          jobs or health insurance, you will have access&nbsp;to.
        </li>
        <li>Please share your thoughts and profile via social media and invite others to the&nbsp;experience!</li>
      </ul>

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

ul {
  padding-left: 0;
}

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
</style>
