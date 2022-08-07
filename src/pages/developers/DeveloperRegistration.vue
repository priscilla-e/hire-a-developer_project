<template>
  <section>
    <base-card>
      <h2>Register as a developer now!</h2>
      <registration-form @save-data="saveData"></registration-form>
    </base-card>
  </section>
</template>

<script>
import RegistrationForm from '../../components/developers/RegistrationForm.vue';
export default {
  components: {
    RegistrationForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('developers/addDeveloper', data);
      this.$router.replace('/developers')
    },
  },
};
</script>
