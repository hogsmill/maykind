<template>
  <div v-if="scope" class="row back">
    <div class="return" @click="hideDetail()">
      <i class="fas fa-arrow-left" /> Back to {{ scope }}s
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'scope'
  ],
  methods: {
    hideDetail() {
      bus.emit('hideDetail')
    }
  }
}
</script>

<style lang="scss">

@import "../../assets/colours.scss";

  .back {
    background-color: $mk-pink;
    color: #fff;
    margin: 12px auto;
    border: 1px solid $mk-pink;
    padding-left: 12px;
  }
</style>
