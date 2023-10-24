<template>
  <div class="row property">
    <div class="col-6 image">
      <img v-if="property.images.length" class="main-image" :src="require('../../assets/img/properties/images/' + property.images[0])">
    </div>
    <div class="col-2 images">
      <div v-if="property.images.length > 1">
        <div v-for="image, i in 3" :key="i">
          <img v-if="property.images.length > i" :src="require('../../assets/img/properties/images/' + property.images[i])">
        </div>
      </div>
    </div>
    <div class="col-sm-4 details">
      <div class="row rooms">
        <div class="col">
          <i class="fas fa-bed" /> {{ property.details.bedrooms }}
        </div>
        <div class="col">
          <i class="fas fa-bath" /> {{ property.details.bathrooms }}
        </div>
        <div class="col">
          <i class="fas fa-couch" /> {{ property.details.receptions }}
        </div>
      </div>
      <div class="row description">
        {{ property.details.bedrooms }} bedroom {{ property.details.subtype }} {{ property.details.type }}
      </div>
      <Lease v-if="property.status.type == 'Sale'" :property="property" />
      <div class="row">
        <div class="shortdescription">
          {{ property.descriptions.shortdescription }}
        </div>
      </div>
      <ul class="other">
        <li v-for="feature, findex in property.features" :key="findex">
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fileFuns from '../../lib/file.js'

import Lease from './Lease.vue'

export default {
  components: {
    Lease
  },
  props: [
    'property'
  ],
  methods: {
    link(file) {
      return fileFuns.link(file)
    }
  }
}
</script>

<style lang="scss">

@import "../../assets/colours.scss";

  .property {
    margin: 12px auto;
    border: 1px solid $mk-pink;
    background-color: #fff;

    .main-image {
      max-width: 100%;
    }

    .images {
      img {
        max-width: 100%;
        margin: 4px 0;
      }
    }

    .rooms {
      font-size: 24px;
    }

    .description {
      font-size: 24px;
      padding: 12px 0;

      .shortdescription {
        font-size: 18px;
      }
    }

    .other {
      font-size: 18px;
      text-align: left;
    }
  }
</style>
