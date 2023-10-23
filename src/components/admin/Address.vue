<template>
  <div>
    <table class="properties">
      <thead>
        <tr>
          <th v-for="(field, index) in addressFields" :key="index">
            {{ field.header }}
          </th>
          <th />
        </tr>
        <tr>
          <td v-for="(field, index) in addressFields" :key="index">
            <input v-if="!editing" type="text" :id="'new-' + field.field" :class="'new-' + field.field">
            <input v-if="editing" type="text" :id="'address-' + field.field" :class="'address-' + field.field" :value="property.address[field.field]">
          </td>
          <td>
            <button v-if="!editing" class="btn btn-sm btn-secondary smaller-font" @click="addAddress()">
              Add
            </button>
            <button v-if="editing" class="btn btn-sm btn-secondary smaller-font" @click="saveAddress()">
              Save
            </button>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

import propertyFuns from '../../lib/properties.js'

export default {
  props: [
    'editing',
    'property'
  ],
  data() {
    return {
      addressFields: [
        { header: 'No.', field: 'number'},
        { header: 'Street', field: 'street'},
        { header: 'Postcode 1', field: 'postcode1'},
        { header: 'Postcode 2', field: 'postcode2'}
      ]
    }
  },
  methods: {
    addAddress() {
      const data = {}
      for (let i = 0; i < this.addressFields.length; i++) {
        data[this.addressFields[i].field] = document.getElementById('new-' + this.addressFields[i].field).value
      }
      bus.emit('sendCreateProperty', {address: data})
    },
    saveAddress() {
      const data = {}
      for (let i = 0; i < this.addressFields.length; i++) {
        data[this.addressFields[i].field] = document.getElementById('address-' + this.addressFields[i].field).value
      }
      const property = propertyFuns.update(this.property, 'address', data)
      bus.emit('sendUpdateProperty', property)
      bus.emit('finishEditing')
    }
  }
}
</script>
