
function _copy(property) {
  return JSON.parse(JSON.stringify(property))
}

const PropertyFuns = {

  copy: function(property) {
    return _copy(property)
  },

  update: function(property, field, value) {
    const _property = _copy(property)
    _property[field] = value
    return _property
  },

  propFromString: function(str) {
    return str[0].toLowerCase() + str.substr(1).split(' ').join('')
  }
}

export default PropertyFuns
