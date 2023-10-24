<template>
  <div class="admin">
    <div>
      {{ editing }}
    </div>
    <h2>
      Descriptions
      <i v-if="area != 'descriptions'" class="far fa-plus-square" @click="expandArea('descriptions')" />
      <i v-if="area == 'descriptions'" class="far fa-minus-square" @click="collapseArea()" />
    </h2>
    <table v-if="area == 'descriptions'">
      <tr>
        <td>
          Buying
          <i class="far fa-save" title="Save buying description" @click="saveTextDescription('buying')" />
        </td>
        <td>
          <textarea id="description-buying" v-model="buyingdescription" />
        </td>
      </tr>
      <tr>
        <td>
          Renting
          <i class="far fa-save" title="Save renting description" @click="saveTextDescription('renting')" />
        </td>
        <td>
          <textarea id="description-renting" v-model="rentingdescription" />
        </td>
      </tr>
    </table>
    <h2>
      Properties ({{ properties.length }})
      <i v-if="area != 'properties'" class="far fa-plus-square" @click="expandArea('properties')" />
      <i v-if="area == 'properties'" class="far fa-minus-square" @click="collapseArea()" />
    </h2>
    <div v-if="area == 'properties'">
      <h3>
        Add Property
      </h3>
      <Address :edit="false" />
      <h3>
        Properties
      </h3>
      <div>
        <table class="properties">
          <thead>
            <tr>
              <th>
                Property
              </th>
              <th>
                Live?
              </th>
              <th>
                Description
              </th>
              <th>
                Highlights
              </th>
              <th>
                Details
              </th>
              <th>
                Price/Costs
              </th>
              <th>
                Images
              </th>
              <th>
                Floor Plan
              </th>
              <th>
                EPC
              </th>
              <th>
                Links
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(property, index) in properties" :key="index">
              <td>
                <div v-if="!inEditing(property, 'address')">
                  {{ property.address.number }}, {{ property.address.street }}
                </div>
                <Address v-if="inEditing(property, 'address')" :editing="inEditing(property, 'address')" :property="property" />
                <div>
                  <i v-if="!inEditing(property, 'address')" class="far fa-edit" title="Edit" @click="editAddress(property)" />
                  <i class="far fa-trash-alt" :title="'Delete ' + property.address" @click="deleteProperty(property)" />
                </div>
              </td>
              <td>
                <input type="checkbox" :id="'live-' + property.id" :checked="property.live" @click="updateLive(property)">
              </td>
              <td>
                <div v-if="!isExpanded(property, 'descriptions')">
                  <i class="far fa-plus-square" @click="expand(property, 'descriptions')" />
                </div>
                <div v-if="isExpanded(property, 'descriptions')">
                  <i class="far fa-minus-square" @click="collapse()" />
                  <span v-if="!inEditing(property, 'details')">
                    <i v-if="editing.id != property.id" class="far fa-edit" title="Edit" @click="editDescriptions(property)" />
                  </span>
                </div>
                <Descriptions v-if="isExpanded(property, 'descriptions')" :property="property" :editing="inEditing(property, 'descriptions')" />
              </td>
              <td>
                <i v-if="!inEditing(property, 'highlights')" class="far fa-edit" title="Edit" @click="editHighlights(property)" />
                <i v-if="inEditing(property, 'highlights')" class="far fa-save" title="Edit" @click="cancelEdit(false)" />
                <Highlights :property="property" :editing="inEditing(property, 'highlights')" />
              </td>
              <td>
                <div v-if="!isExpanded(property, 'details')">
                  <i class="far fa-plus-square" @click="expand(property, 'details')" />
                </div>
                <div v-if="isExpanded(property, 'details')">
                  <i class="far fa-minus-square" @click="collapse()" />
                  <span v-if="!inEditing(property, 'details')">
                    <i v-if="editing.id != property.id" class="far fa-edit" title="Edit" @click="editDetails(property)" />
                  </span>
                  <span v-if="inEditing(property, 'details')">
                    <i v-if="editing.id == property.id" class="far fa-save" title="Save" @click="saveDetails(property)" />
                    <i v-if="editing.id == property.id" class="fas fa-ban" title="Cancel" @click="cancelEdit(true)" />
                  </span>
                </div>
                <Status v-if="isExpanded(property, 'details')" :property="property" :editing="inEditing(property, 'details')" />
                <Details v-if="isExpanded(property, 'details')" :property="property" :editing="inEditing(property, 'details')" />
                <Features v-if="isExpanded(property, 'details')" :property="property" :editing="inEditing(property, 'details')" />
              </td>
              <td>
                <div v-if="!isExpanded(property, 'costs')">
                  <i class="far fa-plus-square" @click="expand(property, 'costs')" />
                </div>
                <div v-if="isExpanded(property, 'costs')">
                  <i class="far fa-minus-square" @click="collapse()" />
                  <span v-if="!inEditing(property, 'costs')">
                    <i v-if="editing.id != property.id" class="far fa-edit" title="Edit" @click="editCosts(property)" />
                  </span>
                  <span v-if="inEditing(property, 'costs')">
                    <i v-if="editing.id == property.id" class="far fa-save" title="Save" @click="saveCosts(property)" />
                    <i v-if="editing.id == property.id" class="fas fa-ban" title="Cancel" @click="cancelEdit(true)" />
                  </span>
                </div>
                <Price v-if="isExpanded(property, 'costs')" :property="property" :editing="inEditing(property, 'costs')" />
                <Lease v-if="isExpanded(property, 'costs')" :property="property" :editing="inEditing(property, 'costs')" />
                <RunningCosts v-if="isExpanded(property, 'costs')" :property="property" :editing="inEditing(property, 'costs')" />
              </td>
              <td>
                <i v-if="!isExpanded(property, 'images')" class="far fa-plus-square" @click="expand(property, 'images')" />
                <i v-if="isExpanded(property, 'images')" class="far fa-minus-square" @click="collapse()" />
                <div v-if="!isExpanded(property, 'images')">
                  {{ property.images.length }} images
                </div>
                <Images v-if="isExpanded(property, 'images')" :property="property" />
              </td>
              <td>
                <div>
                  <i v-if="!isExpanded(property, 'floorplan')" class="far fa-plus-square" @click="expand(property, 'floorplan')" />
                  <i v-if="isExpanded(property, 'floorplan')" class="far fa-minus-square" @click="collapse()" />
                </div>
                <img class="property-floorplan" v-if="property.floorplan" :src="require('../assets/img/properties/floorplans/' + property.floorplan)">
                <UploadImage v-if="isExpanded(property, 'floorplan')" :type="'floorplan'" :id="property.id" />
              </td>
              <td>
                <div>
                  <i v-if="!isExpanded(property, 'epc')" class="far fa-plus-square" @click="expand(property, 'epc')" />
                  <i v-if="isExpanded(property, 'epc')" class="far fa-minus-square" @click="collapse()" />
                </div>
                <img class="property-epc" v-if="property.epc" :src="require('../assets/img/properties/epcs/' + property.epc)">
                <UploadImage v-if="isExpanded(property, 'epc')" :type="'epc'" :id="property.id" />
              </td>
              <td>
                <div>
                  <i v-if="!inEditing(property, 'links')" class="far fa-edit" @click="editLinks(property)" />
                  <i v-if="inEditing(property, 'links')" class="far fa-save" @click="saveLinks(property)" />
                </div>
                <table>
                  <tr>
                    <td>
                      Right Move
                    </td>
                    <td>
                      <span v-if="!inEditing(property, 'links')">
                        {{ property.rightmove }}
                      </span>
                      <input v-if="inEditing(property, 'links')" :id="'links-rightmove- ' + property.id" type="text" :value="property.links.rightmove">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../socket.js'

import arrayFuns from '../lib/arrayFuns.js'

import Address from './admin/Address.vue'
import Descriptions from './admin/Descriptions.vue'
import Status from './admin/Status.vue'
import Details from './admin/Details.vue'
import Features from './admin/Features.vue'
import Price from './admin/Price.vue'
import Lease from './admin/Lease.vue'
import RunningCosts from './admin/RunningCosts.vue'
import Highlights from './admin/Highlights.vue'
import Images from './admin/Images.vue'
import UploadImage from './admin/UploadImage.vue'

export default {
  components: {
    Address,
    Descriptions,
    Status,
    Details,
    Features,
    Price,
    Lease,
    RunningCosts,
    Highlights,
    Images,
    UploadImage
  },
  data() {
    return {
      buyingdescription: 'xxx',
      rentingdescription: 'yyy',
      editing: {
        type: '',
        id: '',
      },
      expanded: {
        type: '',
        id: ''
      },
      area: '',
      addressFields: [
        'number',
        'street',
        'postcode1',
        'postcode2'
      ]
    }
  },
  computed: {
    buyingDescription() {
      return this.$store.getters.getBuyingDescription
    },
    rentingDescription() {
      return this.$store.getters.getRentingDescription
    },
    properties() {
      return this.$store.getters.getProperties
    },
  },
  created() {
    bus.emit('sendGetProperties')

    bus.on('updateProperties', (data) => {
      this.$store.dispatch('updateProperties', data.properties)
    })

    bus.on('finishEditing', () => {
      this.editing = {
        id: '',
        type: ''
      }
    })
  },
  methods: {
    expandArea(area) {
      this.area = area
    },
    collapseArea() {
      this.area = ''
    },
    expand(property, type) {
      this.expanded = {
        type: type,
        id: property.id
      }
    },
    collapse() {
      this.expanded = {
        id: '',
        type: ''
      }
    },
    isExpanded(property, type) {
      return this.expanded.id == property.id && this.expanded.type == type
    },
    inEditing(property, type) {
      return this.editing.id == property.id && this.editing.type == type
    },
    saveTextDescription(type) {
      const text = document.getElementById('description-' + type).value
      console.log(text)
    },
    updateLive(property) {
      const val = document.getElementById('live-' + property.id)
      bus.emit('sendUpdateLive', {id: property.id, live: val})

    },
    addProperty() {
      const data = {}
      for (let i = 0; i < this.addressFields.length; i++) {
        data[this.addressFields[i]] = document.getElementById('new-' + this.addressFields[i]).value
      }
      bus.emit('sendCreateProperty', data)
    },
    editDescriptions(property) {
      this.editing = {
        id: property.id,
        type: 'descriptions'
      }
    },
    editAddress(property) {
      this.editing = {
        id: property.id,
        type: 'address'
      }
    },
    editHighlights(property) {
      this.editing = {
        id: property.id,
        type: 'highlights'
      }
    },
    editDetails(property) {
      this.editing = {
        id: property.id,
        type: 'details'
      }
    },
    editCosts(property) {
      this.editing = {
        id: property.id,
        type: 'costs'
      }
    },
    editLinks(property) {
      this.editing = {
        id: property.id,
        type: 'links'
      }
    },
    _id(prop, property) {
      if (typeof(prop) == 'object') {
        prop = prop.join('-')
      }
      return prop + '-' + property.id
    },
    _value(property, prop, val) {
      if (typeof(prop) == 'object') {
        switch (prop.length) {
          case 2:
            property[prop[0]][prop[1]] = val
            break
          case 3:
            property[prop[0]][prop[1]][prop[2]] = val
            break
        }
      } else {
        property[prop] = val
      }
      return property
    },
    _save(property, vals, bools) {
      for (let i = 0; i < vals.length; i++) {
        const prop = vals[i]
        const id = this._id(prop, property)
        if (document.getElementById(id)) {
          property = this._value(property, prop, document.getElementById(id).value)
        } else {
          console.log('Value element "' + id + '" does not exist')
        }
      }
      for (let i = 0; i < bools.length; i++) {
        const prop = bools[i]
        const id = this._id(prop, property)
        if (document.getElementById(id)) {
          property = this._value(property, prop, document.getElementById(id).checked)
        } else {
          console.log('Bool element "' + id + '" does not exist')
        }
      }
      return property
    },
    _saveFeatures(property) {
      let i = 0
      const features = []
      let done = false
      while (!done) {
        const elem = document.getElementById('feature-' + i + '-' + property.id)
        if (!elem) {
          done = true
        } else {
          if (elem.checked) {
            features.push(elem.name)
          }
        }
        i++
      }
      property.features = features
      return property
    },
    saveDescription(property) {
      const vals = [
        'description',
        'localinfo',
        'amenities'
      ]
      property = this._save(property, vals, [])
      bus.emit('sendUpdateProperty', property)
    },
    saveDetails(property) {
      const vals = [
        ['status', 'type'],
        ['status', 'status'],
        ['details', 'type'],
        ['details', 'subtype'],
        ['details', 'bedrooms'],
        ['details', 'bathrooms'],
        ['details', 'receptions']
      ]
      const bools = [
        ['status', 'international']
      ]
      property = this._save(property, vals, bools)
      property = this._saveFeatures(property)
      bus.emit('sendUpdateProperty', property)
    },
    saveCosts(property) {
      const vals = [
        ['price', 'amount'],
        ['price', 'type'],
        ['lease', 'length'],
        ['runningcosts', 'groundrent', 'amount'],
        ['runningcosts', 'groundrent', 'frequency'],
        ['runningcosts', 'servicecharge', 'amount'],
        ['runningcosts', 'servicecharge', 'frequency'],
        ['runningcosts', 'counciltaxband']
      ]
      const bools = [
        ['lease', 'freehold']
      ]
      property = this._save(property, vals, bools)
      bus.emit('sendUpdateProperty', property)
    },
    saveLinks(property) {
      property = this._save(property, [], [])
      property.links = {
        rightmove: document.getElementById('links-rightmove-' + property.id).value
      }
      bus.emit('sendUpdateProperty', property)
    },
    cancelEdit(conf) {
      if (!conf || confirm('Discard edits?')) {
        this.editing = {
          id: '',
          type: ''
        }
        bus.emit('sendGetProperties')
        this.collapse()
      }
    },
    deleteProperty(property) {
      bus.emit('sendDeleteProperty', {id: property.id})
    }
  }
}
</script>

<style lang="scss">

  .admin {
    padding-top: 24px;

    color: #444;

    .properties {
      margin: 12px auto;
      font-size: 16px;

      th, td {
        border: 1px solid #aaa !important;
        padding: 6px;
        vertical-align: top;

        table {
          margin-bottom: 6px;
          width: 100%;

          select, input[type="text"] {
            width: 100px;
          }
        }

        img {
          margin: 3px;
        }
      }

      .new-address {
        width: 500px;
      }

      .property-image, .property-floorplan, .property-epc {
        width: 200px;
      }

      .far, .fas {
        margin: 6px;
        color: #888;
      }
    }
  }
</style>
