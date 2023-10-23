<template>
  <table>
    <tr>
      <td>
        Price
      </td>
      <td v-if="!editing">
        {{ property.price.amount }}
        <span v-if="property.status.type == 'Rental'">
          per {{ property.price.rentalfrequency }}
        </span>
      </td>
      <td v-if="editing">
        <input type="text" :id="'price-amount-' + property.id" :value="property.price.amount">
        <span v-if="property.status.type == 'Rental'">
          per
          <select v-if="editing && property.status.type == 'Rental'" :id="'price-rentalfrequency-' + property.id">
            <option v-for="rfreq, rfindex in rentalfrequencies" :key="rfindex" :selected="property.price.rentalfrequency == rfreq">
              {{ rfreq }}
            </option>
          </select>
        </span>
      </td>
    </tr>
    <tr>
      <td>
        Type
      </td>
      <td v-if="!editing">
        {{ property.price.type }}
      </td>
      <td v-if="editing">
        <select :id="'price-type-' + property.id">
          <option v-for="(type, tind) in priceTypes" :key="tind" :selected="type == property.price.type">
            {{ type }}
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
      priceTypes: [
        '',
        'Guide Price',
        'OIRO',
        'Offers Over',
        'For Sale',
        'Reduced to'
      ],
      rentalfrequencies: [
        'Month',
        'Quarter',
        '6 Months',
        'Year'
      ]
    }
  }
}
</script>
