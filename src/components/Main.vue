<template>
  <div class="main-tab container-fluid text-center">
    <div class="row">
      <div class="col-sm tab" @click="setTab('Sale')">
        <div class="sub-tab">
          <img :src="link('sales.jpg')">
          <h3>Residential Sales</h3>
        </div>
      </div>
      <div class="col-sm tab">
        <div class="sub-tab">
          <img :src="link('lettings.jpg')" @click="setTab('Rental')">
          <h3>Residential Lettings</h3>
        </div>
      </div>
      <div class="col-sm tab" @click="setTab('Sell')">
        <div class="sub-tab">
          <img :src="link('valuations.jpg')">
          <h3>Book a Valuation</h3>
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
      this.show()
      //this.$store.dispatch('updateTab', tab)
    },
    show() {
      console.log(this.mobile)
      if (this.mobile) {
        this.mobileContact = !this.mobileContact
        window.scrollTo(0, 0)
      } else {
        this.$store.dispatch('showModal', 'contact')
      }
    },
    hide(modal) {
      this.$store.dispatch('hideModal', 'contact')
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
