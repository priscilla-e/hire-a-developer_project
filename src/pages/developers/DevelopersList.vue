<template>
  <section>Filter Section</section>
  <section>
    <div>
      <button>Refresh</button>
      <router-link to="/register">Register as a Developer</router-link>
    </div>
  </section>
  <ul v-if="hasDevelopers">
    <developer-item
      v-for="dev in filteredDevelopers"
      :key="dev.id"
      :id="dev.id"
      :first-name="dev.firstName"
      :last-name="dev.lastName"
      :rate="dev.hourlyRate"
      :areas="dev.areas"
    ></developer-item>
  </ul>
</template>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import DeveloperItem from '../../components/developers/DeveloperItem.vue';

export default {
  components: {
    DeveloperItem,
  },
  computed: {
    filteredDevelopers() {
      return this.$store.getters['developers/developers'];
    },
    hasDevelopers() {
      return this.$store.getters['developers/hasDevelopers'];
    },
  },
};
</script>
