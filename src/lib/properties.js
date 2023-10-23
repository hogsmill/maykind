
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
  }
}

export default PropertyFuns
