<template>
  <div class="row property">
    <div class="col-sm header address">
      <div v-if="scope" class="return" @click="hideDetail()">
        <i class="fas fa-arrow-left" /> Back to {{ scope }}
      </div>
      {{ property.address.street }} {{ property.address.postcode1 }}
    </div>
    <div class="col-sm header price">
      {{ property.price.type }} £{{ property.price.amount }}
      <span v-if="property.status.type == 'Rental'">
        per {{ property.price.rentalfrequency }}
      </span>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'property',
    'scope'
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

  .property {
    margin: 12px auto;
    border: 1px solid $mk-pink;

    .header {
      background-color: $mk-pink;
      font-size: 18px;
      color: #fff;
      font-weight: bold;

      .return {
        font-size: 16px;
        font-weight: normal;
        width: 100%;
      }

      &.address {
        text-align: left;
        }

      &.price {
        text-align: right;
      }
    }
  }
</style>
