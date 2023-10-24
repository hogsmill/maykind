<template>
  <div class="footer">
    <div class="row">
      <div class="col-sm-6 right">
        <ul>
          <li @click="show('buying')">
            Buying
          </li>
          <li @click="show('selling')">
            Selling
          </li>
          <li @click="show('Valuations')">
            Valuations
          </li>
          <li @click="show('letting')">
            Letting
          </li>
          <li @click="show('management')">
            Management
          </li>
        </ul>
      </div>
      <div class="col-sm-6 left">
        <h4>Contact Us</h4>
        <ul>
          <li>
            <i class="fas fa-phone-alt" /> Phone
          </li>
          <li @click="show('contact')">
            <i class="fas fa-envelope" /> Email
          </li>
        </ul>
        <h4>Playground</h4>
        <ul>
          <li @click="setTab('fonts')">
            Fonts
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-logo-holder">
      <div class="footer-logo" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show(modal) {
      if (this.mobile) {
        this.mobileContact = !this.mobileContact
        window.scrollTo(0, 0)
      } else {
        this.$store.dispatch('showModal', modal)
      }
    },
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    }
  }
}
</script>

<style lang="scss">

@import "../assets/colours.scss";

  .footer {
    background-color: $mk-blue;
    color: #fff;
    padding: 24px;
    font-size: 18px;

    .right {
      padding-right: 48px;
      text-align: right;
    }

    .left {
      padding-left: 48px;
      text-align: left;
    }

    li {
      list-style-type: none;
      padding: 12px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .footer-logo-holder {
      background-color: #fff;
      padding: 6px;
      height: 42px;
      width: 62px;
      position: absolute;
      right: 24px;

      .footer-logo {
        height: 48px;
        width: 48px;
        background-image: url("../assets/img/May-Kind-key-tiny-logo.jpg");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
</style>
