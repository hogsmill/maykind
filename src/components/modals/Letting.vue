<template>
  <vue-final-modal name="letting" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['letting']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="mt-4">
      <h4>Managing Your Rental Properties</h4>
      <p class="modal-form">
        Thanks for visiting MayKind; please let us know how we can help you in the comments
        box below, and we'll get back to you as soon as we can. If you can tick what you're
        interested in below, we can better deal with your enquiry.
      </p>
      <div class="modal-form">
        <input type="text" id="name" class="form-control" placeholder="Name">
        <br>
        <input type="text" id="mobile" class="form-control" placeholder="Mobile Number">
        <br>
        <input type="text" id="email" class="form-control" placeholder="Email">
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
      this.$store.dispatch('hideModal', 'letting')
    },
    interested(val) {
      return val ? 'yes' : ''
    },
    category() {
      return [
        '',
        'Interested in:',
        '  Properties to rent: yes',
        '',
        '',
        'Comments:'
      ].join('\n')
    },
    sendFeedback() {
      mailFuns.post({
        tomail: this.emails,
        action: 'Properties to rent Enquiry from MayKind website',
        name: encodeURIComponent(document.getElementById('name').value),
        mobile: encodeURIComponent(document.getElementById('mobile').value),
        email: encodeURIComponent(document.getElementById('email').value),
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
