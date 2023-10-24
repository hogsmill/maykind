<template>
  <div class="row">
    <div class="lease">
      <span v-if="property.lease.freeholdshared">
        Share of
      </span>
      <span v-if="property.lease.freehold || property.lease.freeholdshared">
        Freehold
      </span>
      <span v-if="!property.lease.freehold && !property.lease.freeholdshared">
        Lease {{ property.lease.length }} years
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'property'
  ]
}
</script>

<style lang="scss">
  .lease {
    width: 100%;
    padding-right: 12px;
    text-align: right;
    font-size: 14px;
  }
</style>
