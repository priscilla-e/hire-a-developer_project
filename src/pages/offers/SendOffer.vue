<template>
  <base-dialog
    :show="!!error"
    title="An error occured!"
    @close="closeErrorDialog"
  ></base-dialog>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">Email is a required field.</p>
    </div>
    <div class="form-control" :class="{ errors: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="clearValidity('message')"
      ></textarea>
      <p v-if="!message.isValid">Message is a required field.</p>
    </div>
    <div class="actions">
      <base-button>Send Offer</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validate() {
      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm() {
      this.validate();

      if (!this.formIsValid) {
        return;
      }
      const formData = {
        devId: this.$route.params.id,
        email: this.email.val,
        message: this.message.val,
      };
      this.$store.dispatch('offers/sendOffer', formData);
      this.$router.push('/developers');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
