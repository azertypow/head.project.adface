<template>
  <div class="v-description mmd-box">
    <div class="v-description__coll mmd--with-gutter">
      <p style="
      color: var(--site-color--main);
      text-align: center;
      ">webcam autrisation access</p>
      <button>start recognition</button>
    </div>
    <div class="v-description__coll mmd--with-gutter">
      <h2>description.</h2>
      <h3>first</h3>
      <p>Many DLs are more expressive than propositional logic but less expressive than first-order logic.</p>
      <h3>second</h3>
      <p>In contrast to the latter, the core reasoning problems for DLs are (usually) decidable, and efficient decision procedures have been designed and implemented for these problems. There are general, spatial, temporal, spatiotemporal, and fuzzy description logics, and each description logic features a different balance between expressive power and reasoning complexity by supporting different sets of mathematical constructors.DLs are used in artificial intelligence to describe and reason about the relevant concepts of an application domain (known as terminological knowledge). It is of particular importance in providing a logical formalism for ontologies and the Semantic Web: the Web Ontology Language (OWL) and its profiles are based on DLs. The most notable application of DLs and OWL is in biomedical informatics where DL assists in the codification of biomedical knowledge.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'description',
  components: {
  },
});
</script>

<style lang="scss" scoped>
.v-description {

}

.v-description__coll {
  width: 100%;
}
</style>
