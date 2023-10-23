<template>
  <div class="main-tab container-fluid text-center">
    <div v-if="!detail.id">
      <div v-for="(property, index) in properties" :key="index" class="container-fluid">
        <div class="property-container">
          <PropertyHeader v-if="tab == property.status.type" :property="property" @click="showDetail(property)" />
          <Property v-if="tab == property.status.type" :property="property" @click="showDetail(property)" />
        </div>
      </div>
    </div>
    <div v-if="detail.id">
      <div class="property-container">
        <PropertyHeader :property="detail" :scope="tab" />
        <PropertyDetail :property="detail" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import PropertyHeader from './content/PropertyHeader.vue'
import Property from './content/Property.vue'
import PropertyDetail from './content/PropertyDetail.vue'

export default {
  components: {
    PropertyHeader,
    Property,
    PropertyDetail
  },
  props: [
    'tab'
  ],
  data() {
    return {
      detail: {
        id: ''
      },
    }
  },
  computed: {
    properties() {
      return this.$store.getters.getProperties
    }
  },
  created() {
    bus.on('hideDetail', (data) => {
      this.detail = {
        id: ''
      }
    })
  },
  methods: {
    showDetail(property) {
      this.detail = property
    }
  }
}
</script>

<style lang="scss">

@import "../assets/colours.scss";

  .main-tab {
    padding-top: 48px;
    padding-bottom: 72px;

    .scopes {
      font-size: 18px;

      .scope {
        width: 210px;
        margin: 12px;
        padding: 12px;
        display: inline-block;
        background-color: yellow
        ;
      }
    }
    .selected {
      font-weight: bold;
      color: red;
    }

    .property-container {
      padding: 0;
      background-color: $mk-pink;
      margin-top: 12px;
      margin-bottom: 2px;
      font-size: 16px;
      color: $mk-dark-grey;
    }

    ul {
      --icon-space: 1.3em;
      list-style: none !important;
      padding: 0;

      li {
        padding-left: var(--icon-space);
      }

      li:before {
        content: "\f00c"; /* FontAwesome Unicode */
        font-family: FontAwesome;
        display: inline-block;
        margin-left: calc( var(--icon-space) * -1 );
        width: var(--icon-space);
        color: $mk-pink;
      }
    }
  }
</style>
