<template>
  <section>
    <base-card>
      <header>
        <h2>Offers Received</h2>
      </header>
      <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
      <ul v-else-if="hasOffers && !isLoading">
        <offers-item
          v-for="offer in receivedOffers"
          :key="offer.id"
          :email="offer.email"
          :message="offer.message"
        >
        </offers-item>
      </ul>
      <h3 v-else>You have not offers yet. :(</h3>
    </base-card>
  </section>
</template>

<script>
import OffersItem from '../../components/offers/OffersItem.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    OffersItem,
  },
  computed: {
    receivedOffers() {
      return this.$store.getters['offers/offers'];
    },
    hasOffers() {
      return this.$store.getters['offers/hasOffers'];
    },
  },
  methods: {
    async loadOffers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('offers/fetchOffers');
      } catch (error) {
        this.error = error.message || 'Something is not right, contact Admin.';
      }
      this.isLoading = false;
    },
    closeErrorDialog() {
      this.error = false;
    },
  },
  created() {
    this.loadOffers();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  margin: 4rem auto;
  text-align: center;
}
</style>
