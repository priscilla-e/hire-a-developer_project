<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured!"
      @close="closeErrorDialog"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <developer-filter @change-filter="setFilters"></developer-filter>
    <base-card>
      <section>
        <div class="controls">
          <base-button mode="outline" @click="loadDevelopers(true)"
            >Refresh</base-button
          >
          <base-button
            isLink
            :to="'/register'"
            v-if="isAuth && !isDeveloper && !isLoading"
            >Register as a Developer</base-button
          >
        </div>
      </section>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="!isLoading && hasDevelopers">
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
  </div>
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
import DeveloperFilter from '../../components/developers/DeveloperFilter.vue';

export default {
  components: {
    DeveloperItem,
    DeveloperFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        graphics: true,
      },
    };
  },
  computed: {
    filteredDevelopers() {
      const developers = this.$store.getters['developers/developers'];
      return developers.filter((dev) => {
        if (this.activeFilters.frontend && dev.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && dev.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.graphics && dev.areas.includes('graphics')) {
          return true;
        }
        return false;
      });
    },
    hasDevelopers() {
      return this.$store.getters['developers/hasDevelopers'];
    },
    isDeveloper() {
      return this.$store.getters['developers/isDeveloper'];
    },
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadDevelopers(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('developers/loadDevelopers', {
          forceFetch: refresh,
        });
      } catch (error) {
        this.error = error.message || 'We hit a snag! Try again later.';
      }
      this.isLoading = false;
    },
    closeErrorDialog() {
      this.error = false;
    },
  },
  created() {
    this.loadDevelopers();
  },
};
</script>
