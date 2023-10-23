<template>
  <div class="row property">
    <div class="col-6 tab image">
      <img v-if="property.images.length" class="main-image" :src="require('../../assets/img/properties/images/' + property.images[0])">
    </div>
    <div class="col-2 tab images">
      <div v-if="property.images.length > 1">
        <div v-for="image, i in 3" :key="i">
          <img v-if="property.images.length > i" :src="require('../../assets/img/properties/images/' + property.images[i])">
        </div>
      </div>
    </div>
    <div class="col-4 tab details">
      <div class="row rooms">
        <div class="col tab">
          <i class="fas fa-bed" /> {{ property.details.bedrooms }}
        </div>
        <div class="col tab">
          <i class="fas fa-bath" /> {{ property.details.bathrooms }}
        </div>
        <div class="col tab">
          <i class="fas fa-couch" /> {{ property.details.receptions }}
        </div>
      </div>
      <div class="row description">
        {{ property.details.bedrooms }} bedroom {{ property.details.subtype }} {{ property.details.type }}
        <div class="shortdescription">
          {{ property.descriptions.shortdescription }}
        </div>
      </div>
      <div class="other">
        <ul>
          <li v-if="property.details.garage">
            Garage
          </li>
          <li v-if="property.details.offstreetparking">
            Off Street Parking
          </li>
          <li v-if="property.lease.freehold">
            Freehold
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import fileFuns from '../../lib/file.js'

export default {
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
    margin: 2px;

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
