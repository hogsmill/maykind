<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <Header />
    <div v-if="mobile && modal">
      <Modals />
    </div>
    <div v-if="!(mobile && modal)" class="content">
      <Admin v-if="tab == 'admin'" />
      <Test v-if="tab == 'test'" />
      <Main v-if="tab == 'main'" />
      <Properties v-if="tab == 'Sale' || tab =='Rental'" :tab="tab" />
      <About v-if="tab == 'about'" />
      <Fonts v-if="tab == 'fonts'" />
      <Footer />
    </div>
    <Modals />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'
import params from './lib/params.js'

import Header from './components/Header.vue'
import Admin from './components/Admin.vue'
import Main from './components/Main.vue'
import About from './components/About.vue'
import Fonts from './components/Fonts.vue'
import Footer from './components/Footer.vue'
import Modals from './components/Modals.vue'
import Properties from './components/Properties.vue'

import Test from './components/Test.vue'

export default {
  name: 'App',
  components: {
    Header,
    Admin,
    Main,
    About,
    Fonts,
    Footer,
    Modals,
    Properties,
    Test
  },
  data() {
    return {
    }
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    },
    tab() {
      return this.$store.getters.getTab
    },
    admin() {
      return this.$store.getters.getAdmin
    },
    mobile() {
      return this.$store.getters.getMobile
    },
    modal() {
      return this.$store.getters.getModal
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())
    this.$store.dispatch('updateAdmin', params.isParam('admin'))

    this.$store.dispatch('updateMobile', window.outerWidth < 768)

    bus.emit('sendGetProperties')

    bus.on('updateProperties', (data) => {
      console.log('updateProperties 2', data)
      this.$store.dispatch('updateProperties', data.properties)
    })

    //bus.on('connectionError', (data) => {
    //  this.$store.dispatch('updateConnectionError', data)
    //})
    //
    //bus.on('updateConnections', (data) => {
    //  this.$store.dispatch('updateConnectionError', null)
    //  this.$store.dispatch('updateConnections', data)
    //})
  },
  methods: {
  }
}
</script>

<style lang="scss">

.content {
  position: relative;
  background-color: #fff;
}

  h1 {
    font-weight: bold;
    font-size: 80px;
    color: #fff;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }

  .buttons {
    margin-bottom: 24px;

    .fas {
      padding: 6px;
      margin: 6px;
      border: 1px solid;
      border-radius: 6px;
      color: #f4511e;

      &.selected {
        color: #fff;
        background-color: #f4511e;
      }
    }
  }

  table {
    margin: 0 auto;

    td {
      padding: 6px;
    }
  }
</style>
