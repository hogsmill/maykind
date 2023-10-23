
const ArrayFuns = {

  delete: function(arr, index) {
    const _return = []
    for (let i = 0; i < arr.length; i++) {
      if (i != index) {
        _return.push(arr[i])
      }
    }
    return _return
  },

  swap: function(arr, a, b) {
    const swapped = JSON.parse(JSON.stringify(arr))
    swapped[a] = swapped.splice(b, 1, swapped[a])[0]
    return swapped
  },

  replace: function(arr, index, value) {
    const _return = []
    for (let i = 0; i < arr.length; i++) {
      if (i != index) {
        _return.push(arr[i])
      } else {
        _return.push(value)
      }
    }
    return _return
  }
}

export default ArrayFuns
