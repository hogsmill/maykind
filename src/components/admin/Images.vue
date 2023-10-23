<template>
  <div>
    <div v-for="image, ind in property.images" :key="ind">
      <img class="property-image" :src="require('../../assets/img/properties/images/' + property.images[ind])">
      <i class="fas fa-caret-up" title="Move Up" v-if="ind > 0" @click="moveImageUp(ind)" />
      <i class="fas fa-caret-down" title="Move Down" v-if="ind < property.images.length - 1" @click="moveImageDown(ind)" />
      <i class="far fa-trash-alt" title="Delete" @click="deleteImage(ind)" />
    </div>
    <UploadImage :type="'image'" :id="property.id" />
  </div>
</template>

<script>
import bus from '../../socket.js'

import arrayFuns from '../../lib/arrayFuns.js'
import propertyFuns from '../../lib/properties.js'

import UploadImage from './UploadImage.vue'

export default {
  components: {
    UploadImage
  },
  props: [
    'property'
  ],
  methods: {
    moveImageUp(index) {
      const property = propertyFuns.copy(this.property)
      let images = property.images
      images = arrayFuns.swap(images, index - 1, index)
      property.images = images
      bus.emit('sendUpdateProperty', property)
    },
    moveImageDown(index) {
      const property = propertyFuns.copy(this.property)
      let images = property.images
      images = arrayFuns.swap(images, index, index + 1)
      property.images = images
      bus.emit('sendUpdateProperty', property)
    },
    uploadImage() {
      const element = document.getElementById('upload-image-' + this.property.id)
      const file = element.files[0]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      const data = {
        name: file.name,
        type: 'image',
        id: this.property.id
      }
      fileReader.onload = () => {
        data.content = fileReader.result
        bus.emit('sendUploadFile', data)
      }
    },
    deleteImage(index) {
      const property = propertyFuns.copy(this.property)
      let images = property.images
      console.log(images)
      images = arrayFuns.delete(images, index)
      console.log(images)
      property.images = images
      bus.emit('sendUpdateProperty', property)
    }
  }
}
</script>
