<template>
  <table>
    <thead>
      <tr>
        <th colspan="2">
          Features
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="feature, index in features" :key="index">
        <td>
          {{ feature }}
        </td>
        <td v-if="!editing">
          <i v-if="hasFeature(property, feature)" class="fas fa-check" />
          <i v-if="!hasFeature(property, feature)" class="fas fa-times" />
        </td>
        <td v-if="editing">
          <input v-if="editing" :id="'feature-' + index + '-' + property.id" :name="feature" type="checkbox" :checked="hasFeature(property, feature)">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import bus from '../../socket.js'

import arrayFuns from '../../lib/arrayFuns.js'
import propertyFuns from '../../lib/properties.js'

export default {
  props: [
    'property',
    'editing'
  ],
  data() {
    return {
      features: [
        'Garage',
        'Off Street Parking',
        'Underground Car Park',
        'Garden'
      ]
    }
  },
  methods: {
    hasFeature(property, feature) {
      let has = false
      for (let i = 0; i < property.features.length; i++) {
        if (property.features[i] == feature) {
          has = true
        }
      }
      return has
    }
  }
}
</script>
