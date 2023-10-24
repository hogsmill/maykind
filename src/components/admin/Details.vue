<template>
  <table>
    <tr>
      <td>
        Type
      </td>
      <td v-if="!editing">
        {{ property.details.type }}
      </td>
      <td v-if="editing">
        <select :id="'details-type-' + property.id">
          <option v-for="proptype, pti in proptypes" :key="pti" :selected="property.details.type == proptype">
            {{ proptype }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Sub-Type
      </td>
      <td v-if="!editing">
        {{ property.details.subtype }}
      </td>
      <td v-if="editing">
        <select :id="'details-subtype-' + property.id">
          <option v-for="propsubtype, psi in propsubtypes" :key="psi" :selected="property.details.subtype == propsubtype">
            {{ propsubtype }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Bedrooms
      </td>
      <td v-if="!editing">
        {{ property.details.bedrooms }}
      </td>
      <td v-if="editing">
        <select :id="'details-bedrooms-' + property.id">
          <option v-for="bedrooms, bedi in 10" :key="bedi" :selected="property.details.bedrooms == bedrooms">
            {{ bedrooms }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Bathrooms
      </td>
      <td v-if="!editing">
        {{ property.details.bathrooms }}
      </td>
      <td v-if="editing">
        <select :id="'details-bathrooms-' + property.id">
          <option v-for="bathrooms, bati in 10" :key="bati" :selected="property.details.bathrooms == bathrooms">
            {{ bathrooms }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Bathrooms
      </td>
      <td v-if="!editing">
        {{ property.details.receptions }}
      </td>
      <td v-if="editing">
        <select :id="'details-receptions-' + property.id">
          <option v-for="receptions, reci in 10" :key="reci" :selected="property.details.receptions == receptions">
            {{ receptions }}
          </option>
        </select>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'property',
    'editing'
  ],
  data() {
    return {
      proptypes: [
        'House',
        'Flat'
      ],
      propsubtypes: [
        'Detached',
        'Semi-detached',
        'End Terrace',
        'Terrace',
        'Ground Floor',
        '1st Floor',
        '2nd Floor',
        '3rd Floor',
        '4th Floor'
      ]
    }
  }
}
</script>
