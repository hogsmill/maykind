<template>
  <div class="main-tab container-fluid text-center">
    <div class="row">
      <div class="col-sm-4 tab" @click="setTab('selling')">
        <div class="sub-tab">
          <img :src="link('image1.jpg')">
          <h3>Valuation</h3>
        </div>
      </div>
      <div class="col-sm-4 tab" @click="setTab('Sale')">
        <div class="sub-tab">
          <img :src="link('image2.jpg')">
          <h3>Properties to Buy</h3>
        </div>
      </div>
      <div class="col-sm-4 tab">
        <div class="sub-tab">
          <img :src="link('image3.jpg')" @click="setTab('Rental')">
          <h3>Properties to Rent</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import fileFuns from '../lib/file.js'

export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    link(file) {
      return fileFuns.link(file)
    }
  }
}
</script>

<style lang="scss">

@import "../assets/colours.scss";

  .main-tab {
    padding-top: 48px;
    padding-bottom: 72px;

    .tab {
      margin-bottom: 24px;

      .sub-tab {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        background-color: $mk-pink;
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
