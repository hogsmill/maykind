<template>
  <vue-final-modal name="contact" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['contact']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="mt-4">
      <h4>Contact Us</h4>
      <p class="modal-form" v-if="!mobile">
        Thanks for visiting MayKind. Please tick to indicate the nature of your enquiry.
      </p>
      <table>
        <tr>
          <td>
            <input type="checkbox" v-model="buying">
          </td>
          <td class="left">
            I am looking to buy a property
          </td>
          <td>
            <input type="checkbox" v-model="selling">
          </td>
          <td class="left">
            I have a property to sell
          </td>
          <td>
            <input type="checkbox" v-model="valuation">
          </td>
          <td class="left">
            I would like my property valued
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="renting">
          </td>
          <td class="left">
            I am looking for rental properties
          </td>
          <td>
            <input type="checkbox" v-model="torent">
          </td>
          <td class="left">
            I have a property to let
          </td>
          <td>
            <input type="checkbox" v-model="other">
          </td>
          <td class="left">
            I have other enquiries
          </td>
        </tr>
      </table>
      <div class="modal-form">
        <input type="text" id="name" class="form-control" placeholder="Name">
        <br>
        <input type="text" id="mobile" class="form-control" placeholder="Mobile Number">
        <br>
        <input type="text" id="email" class="form-control" placeholder="Email">
        <br>
        <input type="text" id="address" class="form-control" placeholder="Address">
        <br>
        <input type="text" id="postcode" class="form-control" placeholder="Postcode">
        <br>
        <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
        <br>
        <button class="btn btn-info" @click="sendFeedback()">
          Send
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

import mailFuns from '../../lib/mail.js'

export default {
  components: {
    VueFinalModal
  },
  data() {
    return {
      selling: false,
      valuation: false,
      buying: false,
      torent: false,
      renting: false
    }
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    emails() {
      return this.$store.getters.getEmails
    },
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'contact')
    },
    interested(val) {
      return val ? 'yes' : ''
    },
    category() {
      return [
        '',
        'Interested in:',
        '  Selling: ' + this.interested(this.selling),
        '  Valuation: ' + this.interested(this.valuation),
        '  Looking to Buy: ' + this.interested(this.buying),
        '  Looking to Rent: ' + this.interested(this.torent),
        '  Properties to rent: ' + this.interested(this.renting),
        '  Other: ' + this.interested(this.other),
        '',
        '',
        'Comments:'
      ].join('\n')
    },
    sendFeedback() {
      mailFuns.post({
        tomail: this.emails,
        action: 'Contact from MayKind website',
        name: encodeURIComponent(document.getElementById('name').value),
        mobile: encodeURIComponent(document.getElementById('mobile').value),
        email: encodeURIComponent(document.getElementById('email').value),
        address: encodeURIComponent(document.getElementById('address').value),
        comments: encodeURIComponent(this.category() + document.getElementById('comments').value),
        },
        'Thanks for your enquiry - we\'ll get back to you shortly!'
      )
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-container {

    p.feedback-form {
      margin-bottom: 12px;
    }

    .feedback-form {
      width: 80%;
      margin: 0 auto;
    }

    .left {
      text-align: left;
    }
  }
</style>
