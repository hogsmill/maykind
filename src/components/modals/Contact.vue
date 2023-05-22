<template>
  <vue-final-modal name="contact" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['contact']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="mt-4">
      <h4>Contact Us</h4>
      <p class="modal-form">
        Thanks for visiting MayKind; please let us know how we can help you in the comments
        box below, and we'll get back to you as soon as we can. If you can tick what you're
        interested in below, we can better deal with your enquiry.
      </p>
      <table>

        <tr>
          <td>
            <input type="checkbox" v-model="selling">
          </td>
          <td class="left">
            I have a property to sell
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="valuation">
          </td>
          <td class="left">
            I would like my property valued
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="buying">
          </td>
          <td class="left">
            I am looking to buy a property
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="torent">
          </td>
          <td class="left">
            I have a property to rent to sell
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="renting">
          </td>
          <td class="left">
            I am looking for rental properties
          </td>
        </tr>
      </table>
      <div class="modal-form">
        <input type="text" id="email" class="form-control" placeholder="Email (optional)">
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
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'contact')
    },
    category() {
      return [
        '',
        'Interests:',
        '  Selling: ' + this.selling,
        '  Valuation: ' + this.valuation,
        '  Looking to Buy: ' + this.buying,
        '  Looking to Rent: ' + this.torent,
        '  Properties to rent: ' + this.renting,
        '',
        'Comments:'
      ].join('\n')
    },
    sendFeedback() {
      mailFuns.post({
        tomail: this.emails,
        action: 'Contact from MayKind website',
        email: encodeURIComponent(document.getElementById('email').value),
        comments: encodeURIComponent(this.category() + document.getElementById('comments').value),
        },
        'Thanks for your feedback - we appreciate it!'
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
