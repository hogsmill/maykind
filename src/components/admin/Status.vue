<template>
  <table>
    <tr>
      <td>
        Type
      </td>
      <td v-if="!editing">
        {{ property.status.type }}
      </td>
      <td v-if="editing">
        <select :id="'status-type-' + property.id">
          <option v-for="proptype, pindex in ['Sale', 'Rental']" :key="pindex" :selected="property.status.type == proptype">
            {{ proptype }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td v-if="!editing">
        {{ property.status.status }}
      </td>
      <td v-if="editing">
        <select :id="'status-status-' + property.id">
          <option v-for="stat, sindex in statuses" :key="sindex" :selected="property.status.status == status">
            {{ stat }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        International?
      </td>
      <td v-if="!editing">
        <i v-if="property.status.international" class="fas fa-check" />
        <i v-if="!property.status.international" class="fas fa-times" />
      </td>
      <td v-if="editing">
        <input v-if="editing" :id="'status-international-' + property.id" type="checkbox" :checked="property.status.international">
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
      status: [
        'For Sale',
        'Under Offer',
        'Sold Subject to Contract',
        'Sold'
      ]
    }
  }
}
</script>
