<template>
  <div
      class="v-result-view"
  >
    <div
        class="v-result-view__container"
        ref="imagesContainer"
    ></div>

    <div
        class="v-result-view__share"
        v-if="status === 'ended' || status === 'shareClicked'"
    >
      <img
          alt="ui share icon"
          class="v-result-view__share-icon"
          src="../assets/share_profile.svg">

      <button
          class="mmd-button--small"
          @click="shareClicked"
      >copy link to clipboard</button>

      <a
          class="mmd-button mmd-button--small"
          target="_blank"
          :href="getProfileUrl('mail')"
      >share to mail</a>

      <a
          class="mmd-button mmd-button--small"
          target="_blank"
          :href="getProfileUrl('facebook')"
      >share to facebook</a>

      <a
          class="mmd-button mmd-button--small"
          target="_blank"
          :href="getProfileUrl('twitter')"
      >share to twitter</a>

      <div
          v-if="status === 'shareClicked'"
      >text copied to clipboard</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {DURATION_PARAMETERS, randomIntFromInterval} from "@/main"
import {useStore} from "vuex"

export default defineComponent({
  name: 'ResultView',
  components: {
  },

  data() {
    return {
      store: useStore(),
      status: "started" as "started" | "ended" | "shareClicked",
      listOfImages: [
        "https://azertypow.github.io/head.project.adface/img/adds/a0.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a1.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a2.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a3.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a4.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a5.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a6.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a7.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a8.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a9.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a10.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a11.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a12.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a13.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a14.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a15.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a16.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a17.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a18.png",
        "https://azertypow.github.io/head.project.adface/img/adds/a19.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b0.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b1.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b2.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b3.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b4.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b5.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b6.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b7.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b8.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b9.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b10.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b11.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b12.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b13.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b14.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b15.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b16.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b17.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b18.png",
        "https://azertypow.github.io/head.project.adface/img/adds/b19.png",
      ]
    }
  },

  mounted() {
    this.placeImageInView(0, this.listOfImages)
  },

  methods: {

    getProfileUrl(get: null | "facebook" | "twitter" | 'mail'): string {

      const profileUrl = 'https://azertypow.github.io/head.project.adface/#/profile'
      const subject = "AddFace Application"
      const text = 'AddFace prototype text description'
      const hashtags = 'webapp, AI'

      if(get === "mail")
        return `mailto:?subject=${subject}&body=${text}`

      if (get === "twitter")
        return `https://twitter.com/intent/tweet?text=${text}&url=${profileUrl}&hashtags=${hashtags}`

      if (get === "facebook")
        return `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`

      return encodeURI(profileUrl)
    },


    placeImageInView(indexOfListOfImages: number, listOfImages: string[]) {

      const imagesContainer = this.$refs.imagesContainer

      if(imagesContainer instanceof HTMLDivElement) {

        const imgElement = document.createElement("img")
        imgElement.src = listOfImages[indexOfListOfImages]
        imgElement.style.left = randomIntFromInterval(0, 100) + 'vw'
        imgElement.style.top  = randomIntFromInterval(0, 100) + 'vh'
        imagesContainer.appendChild(imgElement)

        indexOfListOfImages++

        if (indexOfListOfImages < listOfImages.length) window.setTimeout(() => {
          this.placeImageInView(indexOfListOfImages, this.listOfImages)
        }, DURATION_PARAMETERS.addsInterval)

        else {
          window.setTimeout(() => {
            this.status = "ended"
          }, DURATION_PARAMETERS.beforeShowingShareProfile)
        }
      }
    },

    shareClicked() {
      navigator.clipboard.writeText( this.getProfileUrl(null) ).then(() => {
        this.status = 'shareClicked'
      })
    }
  },

});
</script>

<style lang="scss">
.v-result-view__container {
  position: fixed;
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000000;

  > img {
    position: absolute;
    display: block;
    transform: translate(-50%, -50%);
    width: 400px;
    height: auto;
  }
}

.v-result-view__share {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000000;
  cursor: pointer;
  text-align: center;
}

.v-result-view__share-icon {
  display: block;
  width: 200px;
  height: auto;
  margin: auto;
}
</style>

<!--<template>-->
<!--  <html>-->
<!--  <head>-->
<!--    <title>Your Website Title</title>-->
<!--    &lt;!&ndash; You can use Open Graph tags to customize link previews.-->
<!--    Learn more: https://developers.facebook.com/docs/sharing/webmasters &ndash;&gt;-->
<!--    <meta property="og:url"           content="https://azertypow.github.io/head.project.adface/#/profile" />-->
<!--    <meta property="og:type"          content="website" />-->
<!--    <meta property="og:title"         content="profile" />-->
<!--    <meta property="og:description"   content="get your profile" />-->
<!--&lt;!&ndash;    <meta property="og:image"         content="https://www.your-domain.com/path/image.jpg" />&ndash;&gt;-->
<!--  </head>-->
<!--  <body>-->

<!--  &lt;!&ndash; Load Facebook SDK for JavaScript &ndash;&gt;-->
<!--  <div id="fb-root"></div>-->
<!--  <script>(function(d, s, id) {-->
<!--    var js, fjs = d.getElementsByTagName(s)[0];-->
<!--    if (d.getElementById(id)) return;-->
<!--    js = d.createElement(s); js.id = id;-->
<!--    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";-->
<!--    fjs.parentNode.insertBefore(js, fjs);-->
<!--  }(document, 'script', 'facebook-jssdk'));</script>-->

<!--  &lt;!&ndash; Your share button code &ndash;&gt;-->
<!--  <div class="fb-share-button"-->
<!--       data-href="https://azertypow.github.io/head.project.adface/#/profile"-->
<!--       data-layout="button_count">-->
<!--  </div>-->

<!--  </body>-->
<!--  </html>-->

<!--</template>-->
