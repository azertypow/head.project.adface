<template>
  <div class="v-application-rendering">

    <main
        class="v-application-rendering__layout"
    >
      You were targeted with these ads because you are a
    </main>

<!--    <div-->
<!--        class="v-application-rendering__links mmd-box"-->
<!--    >-->
<!--      <router-link to="/">try the experience</router-link>-->
<!--      <button>share result</button>-->
<!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IImageAnalysisResponseAge,
  IImageAnalysisResponseEmotion,
  IImageAnalysisResponseGender,
  URL_PARAMS_NAMES
} from "@/main"

export default defineComponent({
  name: 'ApplicationRendering',

  components: {
  },

  data() {
    return {
      age:      null as IImageAnalysisResponseAge | null,
      emotion:  null as IImageAnalysisResponseEmotion | null,
      gender:   null as IImageAnalysisResponseGender | null,
    }
  },

  mounted() {

    const ogTitle       = document.querySelector('[property="og:title"]')
    const ogDescription = document.querySelector('[property="og:description"]')
    const ogImage       = document.querySelector('[property="og:image"]')

    ogTitle?.setAttribute('content', 'custom title')
    ogDescription?.setAttribute('content', 'custom description')
    ogImage?.setAttribute('content', 'https://azertypow.github.io/head.project.adface/img/img.png')

    if(
        this.age !== null
        && this.emotion !== null
        && this.gender !== null
    ) {

    }
  },

  methods: {
    getUrlParams() {
      const urlSearchParams = new URLSearchParams(window.location.search)

      this.age      = urlSearchParams.get(URL_PARAMS_NAMES.age) as any
      this.emotion  = urlSearchParams.get(URL_PARAMS_NAMES.emotion) as any
      this.gender   = urlSearchParams.get(URL_PARAMS_NAMES.gender) as any
    }
  },

});
</script>

<style lang="scss" scoped>
.v-application-rendering {

}


</style>
