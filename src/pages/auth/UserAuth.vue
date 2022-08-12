<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured"
      @close="closeErrorDialog"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="email" v-model.trim="password" />
        </div>
        <p v-if="!detailsAreValid">Please enter a valid email and password</p>
        <base-button> {{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">
          {{ switchModeCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      error: null,
      detailsAreValid: true,
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },
    switchModeCaption() {
      if (this.mode === 'login') {
        return 'Sign up instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async nsubmitForm() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.detailsAreValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          //...login
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
      } catch (error) {
        this.error = error.message || 'Failed to authenticate.. Try again';
      }

      this.isLoading = false;
    },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    closeErrorDialog() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>
