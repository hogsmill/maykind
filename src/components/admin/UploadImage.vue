<template>
  <div>
    <input type="file" :id="'upload-' + type + '-' + id">
    <button @click="uploadImage()">
      Upload Image
    </button>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'type',
    'id'
  ],
  methods: {
    uploadImage() {
      const element = document.getElementById('upload-' + this.type + '-' + this.id)
      const file = element.files[0]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      const data = {
        name: file.name,
        type: this.type,
        id: this.id
      }
      fileReader.onload = () => {
        data.content = fileReader.result
        bus.emit('sendUploadFile', data)
      }
    }
  }
}
</script>
