<template>
  <div class="footer">
    <div class="row">
      <p class="center">
        MayKind Sales & Lettings<br>
        Company registration number: 14750234<br>
        <a class="email" @click="show('contact')">{{ email }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'info@maykind.co.uk'
    }
  },
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

    p {
      margin: 0 auto;
    }

    .email {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

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
