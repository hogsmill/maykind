<template>
  <nav class="nav">
    <div class="logo-holder" @click="setTab('main')">
      <img class="logo" :src="link('May-Kind-key-tiny-logo.jpg')">
    </div>
    <h1>Sales and Lettings</h1>

    <div v-if="mobile" class="hamburger">
      <i class="fas fa-hamburger" @click="toggleMenu()" />
    </div>

    <div class="nav-bar">
      <ul :class="{ 'hide': mobile && hideMenu }">
        <li v-if="admin || siteAdmin" :class="{'active': tab == 'admin'}" @click="setTab('admin')">
          Admin
        </li>
        <li v-if="admin || siteAdmin" :class="{'active': tab == 'test'}" @click="setTab('test')">
          Test
        </li>
        <li :class="{'active': tab == 'about'}" @click="setTab('about')">
          About Us
        </li>
        <li @click="show('contact')">
          Contact Us
        </li>
      </ul>
    </div>

    <div id="feedback-mobile" class="feedback-mobile" v-if="mobileContact">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <i class="fas fa-times" />
        </button>
      </div>
      <div class="mt-4">
        <p class="feedback-form">
          Thanks for visiting Agile Simulations; please let us know what you would like
          to know, or tell us, in the comments box below
        </p>
        <div class="feedback-form">
          <input type="text" id="email" class="form-control" placeholder="Email (optional)">
          <br>
          <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
          <br>
          <button class="btn btn-primary smaller-font" @click="sendContact()">
            Send
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import bus from '../socket.js'

import fileFuns from '../lib/file.js'
import params from '../lib/params.js'
import mailFuns from '../lib/mail.js'

export default {
  data() {
    return {
      mobileContact: false,
      hideMenu: true
    }
  },
  computed: {
    site() {
      return this.$store.getters.getSite
    },
    emails() {
      return this.$store.getters.getEmailAddresses
    },
    mobile() {
      return this.$store.getters.getMobile
    },
    tab() {
      return this.$store.getters.getTab
    },
    admin() {
      return this.$store.getters.getAdmin
    },
    siteAdmin() {
      return this.$store.getters.getSiteAdmin
    }
  },
  created() {
    const self = this

    this.setTabFromParams()
  },
  methods: {
    setTabFromParams() {
      const tabs = [
        'transformation',
        'managers',
        'apprentices',
        'about'
      ]
      for (let i = 0; i < tabs.length; i++) {
        if (params.isParam(tabs[i])) {
          this.setTab(tabs[i])
        }
      }
    },
    toggleMenu() {
      this.hideMenu = !this.hideMenu
      this.hide()
    },
    show() {
      if (this.mobile) {
        this.mobileContact = !this.mobileContact
        window.scrollTo(0, 0)
      } else {
        this.$store.dispatch('showModal', 'contact')
      }
    },
    hide(modal) {
      if (this.mobile) {
        this.mobileContact = false
      }
      this.$store.dispatch('hideModal', 'contact')
    },
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    setUrl(tab) {
      if (window.location.href.match(/\?.*=/)) {
        window.location.href = window.location.origin + '?' + tab
      } else {
        this.$store.dispatch('updateTab', tab)
      }
    },
    link(file) {
      return fileFuns.link(file)
    },
    sendContact() {
      mailFuns.post({
        action: 'Contact from Agile Simulations',
        email: encodeURIComponent(document.getElementById('email').value),
        comments: encodeURIComponent(document.getElementById('comments').value),
        tomail: this.emails,
        fromsite: this.site
        },
        'Thanks for your interest - we\'ll get back to you soon!'
      )
      this.hide()
    }
  },
}
</script>

<style lang="scss">
  .nav {
    padding: 0 12px;
    width: 100%;
    z-index: 10;
    background-color: #fff;
    height: 220px;

    .logo-holder {
      &:hover {
        cursor: pointer;
      }

      .logo {
        position: absolute;
        left: 12px;
        top: 12px;
      }
    }

    h1 {
      color: #888;
      padding-top: 160px;
      font-family: 'Cormorant';
      font-size: 41px;
    }

    .nav-bar {
      border: 0;
      font-size: 16px !important;

      ul {
        position: absolute;
        right: 12px;
        margin-top: 170px;

        &.hide {
          height: 0;
        }

        li {
          display: inline-block;
          list-style-type: none;
          padding: 15px 13px;
          color: #204893 !important;
          font-size: x-large;

          &.login, &.logout {
            padding: 7px 7px 14px 7px;
          }

          .fas, .far {
            position: relative;
            top: 3px;
            font-size: x-large;
            color: #fff;
          }

          &:hover {
            cursor: pointer;
            opacity: 0.9;

            .fas, .far {
              color: #f4511e;
            }
          }

          &:hover, &.active  {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .feedback {
    .fa-times {
      margin: 6px;
    }

    h4 {
      letter-spacing: initial;
      text-align: center;
      font-size: xx-large;
    }

    .feedback {
      letter-spacing: 0;
      color: #212529;
    }

    p.feedback-form {
      margin-bottom: 12px;
    }

    .feedback-form {
      width: 80%;
      margin: 0 auto;

      table {
        margin: 0 auto;

        td {
          padding: 6px;

          &.forgotten {
            text-align: right;
          }

          &.login-button {
            text-align: center;

            span {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .feedback-mobile {
    p {
      color: #fff;
    }
  }

@media screen and (max-width: 767px) {
  nav {

    .hamburger {
      height: 42px;

      .fa-hamburger {
        color: #fff;
        font-size: 32px;
        margin: 4px 0 0 0;
        float: right;
      }
    }

    .nav-bar {

      &.hide {
        display: none;
      }

      ul {
        padding: 0;

        li {
          width: 100%;
        }
      }
    }
  }
}
</style>
