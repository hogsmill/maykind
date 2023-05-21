<template>
  <div class="main-tab container-fluid text-center">
    <div class="row">
      <div class="col-sm-4 tab" @click="show('selling')">
        <div class="sub-tab">
          <img :src="'/img/image1.jpg'">
          <h3>Selling a property?</h3>
        </div>
      </div>
      <div class="col-sm-4 tab" @click="show('renting')">
        <div class="sub-tab">
          <img :src="'/img/image2.jpg'">
          <h3>Looking to rent or buy?</h3>
        </div>
      </div>
      <div class="col-sm-4 tab">
        <div class="sub-tab">
          <img :src="'/img/image3.jpg'" @click="show('letting')">
          <h3>Letting a property?</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  methods: {
    show() {
      this.$store.dispatch('showModal', 'contact')
    }
  }
}
</script>

<style lang="scss">
  .main-tab {
    padding-top: 48px;
    padding-bottom: 72px;

    .tab {
      .sub-tab {
        width: 90%;
        height: 100%;
        margin-bottom: 24px;
        background-color: #C602CE;
        color: #fff;

        img {
          width: 100%;
          background-size: contain;
        }
        h3 {
          margin: 0 auto;
          padding: 6px;
        }
      }
    }
  }
</style>
