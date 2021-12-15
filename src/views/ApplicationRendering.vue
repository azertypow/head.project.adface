<template>
  <div class="v-application-rendering mmd--page">

    <main
        class="v-application-rendering__layout"
    >


      <div
          class="v-application-rendering__layout__img"
      >
        <img src="../assets/a.png" alt="">
      </div>

      <div
          class="v-application-rendering__layout__id"
      >ADface1638384486059
      </div>

      <div
          class="v-application-rendering__layout__txt"
      >You were targeted with these ads because you are a <span>latino</span> <span>women</span> of <span>35</span> years old.
        <br>You are disgusted and look smart but really poor.
      </div>

      <div
          class="v-application-rendering__layout__footer"
      >addface.swiss-digital-initiative.org
      </div>

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
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
}

.v-application-rendering__layout {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: var(--site-color--background);
  padding: var(--text-line-height);
  width: 670px;
}

.v-application-rendering__layout__img {
  width: 50%;
  padding-right: var(--text-line-height);
  box-sizing: border-box;

  > img {
    display: block;
    width: 100%;
  }
}

.v-application-rendering__layout__id {
  width: 50%;
}

.v-application-rendering__layout__txt {
  width: 100%;
  padding-top: var(--text-line-height);
  padding-bottom: var(--text-line-height);
}

.v-application-rendering__layout__footer {
  padding-top: var(--text-line-height);
  width: 66.66666%;
}

</style>
