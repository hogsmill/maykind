<template>
  <table>
    <tr>
      <td>
        Ground Rent:
      </td>
      <td>
        <span v-if="!editing">
          &pound;{{ property.runningcosts.groundrent.amount }} {{ property.runningcosts.groundrent.frequency }}
        </span>
        <span v-if="editing">
          <input :id="'runningcosts-groundrent-amount-' + property.id" type="text" :value="property.runningcosts.groundrent.amount">
          <select :id="'runningcosts-groundrent-frequency-' + property.id">
            <option v-for="frequency, findex in frequencies" :key="findex" :selected="property.runningcosts.groundrent.frequency == frequency">
              {{ frequency }}
            </option>
          </select>
        </span>
      </td>
    </tr>
    <tr>
      <td>
        Service Charge:
      </td>
      <td v-if="!editing">
        &pound;{{ property.runningcosts.servicecharge.amount }} {{ property.runningcosts.servicecharge.frequency }}
      </td>
      <td v-if="editing">
        <input :id="'runningcosts-servicecharge-amount-' + property.id" type="text" :value="property.runningcosts.servicecharge.amount">
        <select :id="'runningcosts-servicecharge-frequency-' + property.id">
          <option v-for="frequency, findex in frequencies" :key="findex" :selected="property.runningcosts.servicecharge.frequency == frequency">
            {{ frequency }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Council Tax Band
      </td>
      <td v-if="!editing">
        {{ property.runningcosts.counciltaxband }}
      </td>
      <td v-if="editing">
        <select :id="'runningcosts-counciltaxband-' + property.id">
          <option v-for="band, bindex in ['A', 'B', 'C', 'D', 'E', 'F']" :key="bindex" :selected="property.runningcosts.counciltaxband == band">
            {{ band }}
          </option>
        </select>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'editing',
    'property'
  ],
  data() {
    return {
      frequencies: [
        'Monthly',
        'Twice Yearly',
        'Annually'
      ]
    }
  }
}
</script>
