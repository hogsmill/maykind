<template>
  <div>
    Test
  </div>
</template>

<script>
import bus from '../socket.js'

import test from '../test/test.js'

export default {
  created() {

    console.log('Loading test data...')
    const properties = test.properties()
    for (let i = 0; i < properties.length; i++) {
      console.log('  Loading ' + properties[i].address)
      bus.emit('sendCreateProperty', properties[i])
    }
  }
}
</script>
