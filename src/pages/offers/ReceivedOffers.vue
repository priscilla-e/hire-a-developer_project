<template>
  <section>
    <base-card>
      <header>
        <h2> Offers Received</h2>
      </header>
      <ul v-if="hasOffers">
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
