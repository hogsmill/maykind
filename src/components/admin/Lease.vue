<template>
  <table>
    <tr>
      <td>
        Freehold
      </td>
      <td v-if="!editing">
        <i v-if="property.lease.freehold" class="fas fa-check" />
        <i v-if="!property.lease.freehold" class="fas fa-times" />
      </td>
      <td v-if="editing">
        <input v-if="editing" :id="'lease-freehold-' + property.id" type="checkbox" :checked="property.lease.freehold">
      </td>
    </tr>
    <tr>
      <td>
        Freehold Shared?
      </td>
      <td v-if="!editing">
        <i v-if="property.lease.freeholdshared" class="fas fa-check" />
        <i v-if="!property.lease.freeholdshared" class="fas fa-times" />
      </td>
      <td v-if="editing">
        <input v-if="editing" :id="'lease-freeholdshared-' + property.id" type="checkbox" :checked="property.lease.freeholdshared">
      </td>
    </tr>
    <tr v-if="!property.lease.freehold">
      <td>
        Lease:
      </td>
      <td>
        <span v-if="!editing">
          {{ property.lease.length }} years
        </span>
        <input v-if="editing" :id="'lease-length-' + property.id" type="text" :value="property.lease.length">
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'property',
    'editing'
  ]
}
</script>
