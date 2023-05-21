<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <Header />
    <div class="content">
      <Admin v-if="tab == 'admin'" />
      <Main />
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
import Footer from './components/Footer.vue'
import Modals from './components/Modals.vue'

export default {
  name: 'App',
  components: {
    Header,
    Admin,
    Main,
    Footer,
    Modals
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
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())
    this.$store.dispatch('updateAdmin', params.isParam('admin'))

    bus.on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })
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
    letter-spacing: 2px;
    font-size: 80px;
    color: #fff;
    text-shadow: 2px 2px #000;
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
