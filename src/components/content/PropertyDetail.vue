<template>
  <div class="row property-detail">
    <div class="col-sm-9 image">
      <div class="row">
        <div class="col-sm-8">
          <img v-if="property.images.length" class="main-image" :src="require('../../assets/img/properties/images/' + property.images[0])">
        </div>
        <div class="col-sm-4 images">
          <div v-if="property.images.length > 1">
            <div v-for="image, i in 2" :key="i">
              <img v-if="property.images.length > i" :src="require('../../assets/img/properties/images/' + property.images[i])">
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <h3>
          Description
        </h3>
        <p>
          {{ property.descriptions.description }}
        </p>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="row">
        <img v-if="property.floorplan" :src="require('../../assets/img/properties/floorplans/' + property.floorplan)">
      </div>
      <Highlights :highlights="property.highlights" />
      <div class="row">
        <img v-if="property.epc" :src="require('../../assets/img/properties/epcs/' + property.epc)">
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

import Highlights from './Highlights.vue'

export default {
  components: {
    Highlights
  },
  props: [
    'property'
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

  .property-detail {
    background-color: #fff;
    margin: 0 auto;
    border: 1px solid $mk-pink;
    text-align: left;

    .main-image {
      max-width: 100%;
    }

    img {
      max-width: 100%;
    }

    .images {
      img {
        margin: 4px 0;
      }
    }
  }
</style>
