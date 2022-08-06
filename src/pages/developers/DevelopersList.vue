<template>
  <base-card>
    <section>Filter Section</section>
  </base-card>
  <base-card>
    <section>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button isLink to="/register">Register as a Developer</base-button>
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
    <h3 id="no-data" v-else>No developers listed yet.</h3>
  </base-card>
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

#no-data {
  text-align: center;
  margin: 4rem 0;
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
