<template>
  <ul class="highlights">
    <li v-for="(highlight, hind) in highlights" :key="hind">
      {{ highlight }}
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'highlights'
  ]
}
</script>

<style lang="scss">

@import "../../assets/colours.scss";

  .highlights {
    margin: 24px 6px;
    font-size: 18px;
  }
</style>
