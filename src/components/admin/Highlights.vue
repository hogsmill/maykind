<template>
  <ul>
    <li v-for="(highlight, hindex) in property.highlights" :key="hindex">
      <span v-if="!editing">
        {{ highlight }}
      </span>
      <span v-if="editing">
        <input type="text" :id="'highlight-' + property.id + '-' + hindex" :value="highlight">
        <i class="far fa-save" title="Save" @click="saveHighlight(hindex)" />
        <i class="fas fa-caret-up" title="Move Up" v-if="hindex > 0" @click="moveHighlightUp(hindex)" />
        <i class="fas fa-caret-down" title="Move Down" v-if="hindex < property.highlights.length - 1" @click="moveHighlightDown(hindex)" />
        <i class="far fa-trash-alt" title="Delete" @click="deleteHighlight(hindex)" />
      </span>
    </li>
    <li v-if="editing">
      <input type="text" :id="'new-highlight-' + property.id">
      <button @click="addHighlight()">
        Add
      </button>
    </li>
  </ul>
</template>

<script>
import bus from '../../socket.js'

import arrayFuns from '../../lib/arrayFuns.js'
import propertyFuns from '../../lib/properties.js'

export default {
  props: [
    'editing',
    'property'
  ],
  methods: {
    addHighlight() {
      const id = 'new-highlight-' + this.property.id
      const val = document.getElementById(id).value
      const property = propertyFuns.copy(this.property)
      property.highlights.push(val)
      bus.emit('sendUpdateProperty', property)
      document.getElementById(id).value = ''
    },
    saveHighlight(index) {
      const val = document.getElementById('highlight-' + this.property.id + '-' + index).value
      const highlights = arrayFuns.replace(this.property.highlights, index, val)
      const property = propertyFuns.copy(this.property)
      property.highlights = highlights
      bus.emit('sendUpdateProperty', property)
    },
    moveHighlightUp(index) {
      const highlights = arrayFuns.swap(this.property.highlights, index - 1, index)
      const property = propertyFuns.copy(this.property)
      property.highlights = highlights
      bus.emit('sendUpdateProperty', property)
    },
    moveHighlightDown(index) {
      const highlights = arrayFuns.swap(this.property.highlights, index, index + 1)
      const property = propertyFuns.copy(this.property)
      property.highlights = highlights
      bus.emit('sendUpdateProperty', property)
    },
    deleteHighlight(index) {
      const highlights = arrayFuns.delete(this.property.highlights, index)
      const property = propertyFuns.copy(this.property)
      property.highlights = highlights
      bus.emit('sendUpdateProperty', property)
    },
  }
}
</script>

<style lang="scss">
  li {
    text-align: left;
  }
</style>
