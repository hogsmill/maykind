<template>
  <div class="descriptions">
    <h6>
      Short Description
      <i v-if="editing" class="far fa-save" title="Save" @click="saveDescription(property)" />
    </h6>
    <div v-if="!editing">
      {{ property.descriptions.shortdescription }}
    </div>
    <textarea v-if="editing" :id="'shortdescription-' + property.id" v-model="descriptions.shortdescription" />
    <h6>
      Description
      <i v-if="editing" class="far fa-save" title="Save" @click="saveDescription(property)" />
    </h6>
    <div v-if="!editing">
      {{ property.descriptions.description }}
    </div>
    <textarea v-if="editing" :id="'description-' + property.id" v-model="descriptions.description" />
    <h6>
      Location
      <i v-if="editing" class="far fa-save" title="Save" @click="saveDescription(property)" />
    </h6>
    <div v-if="!editing">
      {{ property.descriptions.location }}
    </div>
    <textarea v-if="editing" :id="'location-' + property.id" v-model="descriptions.location" />
    <h6>
      Additional Info
      <i v-if="editing" class="far fa-save" title="Save" @click="saveDescription(property)" />
    </h6>
    <div v-if="!editing">
      {{ property.descriptions.additional }}
    </div>
    <textarea v-if="editing" :id="'additional-' + property.id" v-model="descriptions.additional" />
  </div>
</template>

<script>
import bus from '../../socket.js'

import propertyFuns from '../../lib/properties.js'

export default {
  props: [
    'property',
    'editing'
  ],
  data() {
    return {
      descriptions: {
        shortdescription: '',
        description: '',
        location: '',
        additional: ''
      }
    }
  },
  created() {
    this.descriptions = {
      shortdescription: this.property.descriptions.shortdescription,
      description: this.property.descriptions.description,
      location: this.property.descriptions.location,
      additional: this.property.descriptions.additional
    }
  },
  methods: {
    saveDescription() {
      const property = propertyFuns.copy(this.property)
      property.descriptions = this.descriptions
      bus.emit('sendUpdateProperty', property)
    }
  }
}
</script>

<style lang="scss">
  .descriptions {
    h6, div {
      text-align: left;
    }

    h6 {
      margin-top: 12px;
      font-weight: bold;
    }

    textarea {
      width: 500px;
      height: 200px;
    }
  }
</style>
