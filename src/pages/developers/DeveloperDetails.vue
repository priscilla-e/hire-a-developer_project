<template>
  <section>
    <base-card>
      <figure>
        <img :src="profilePictureLink" alt="profile picture" />
      </figure>
      <h2 class="centered">{{ fullName }}</h2>
      <div class="areas">
        <base-badge
          v-for="area in areas"
          :key="area"
          :text="area"
          :type="area"
        ></base-badge>
      </div>
      <li>{{ description }}</li>
    </base-card>
  </section>

  <section>
    <base-card>
      <h3>Interested? Send {{ selectedDeveloper.firstName }} an offer now!</h3>
      <p>
        My hourly rate is <strong>£{{ rate }}</strong
        >.
      </p>
      <base-button isLink :to="sendOfferLink">Send an Offer</base-button>
      <router-view></router-view>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedDeveloper: null,
    };
  },
  computed: {
    fullName() {
      return (
        this.selectedDeveloper.firstName + ' ' + this.selectedDeveloper.lastName
      );
    },
    profilePictureLink() {
      return this.selectedDeveloper.profilePicture;
    },
    areas() {
      return this.selectedDeveloper.areas;
    },
    description() {
      return this.selectedDeveloper.description;
    },
    rate() {
      return this.selectedDeveloper.hourlyRate;
    },
    sendOfferLink() {
      return this.$route.path + '/send-offer';
    },
  },
  created() {
    this.selectedDeveloper = this.$store.getters['developers/developers'].find(
      (dev) => dev.id === this.id
    );
  },
};
</script>

<style scoped>
li {
  list-style: none;
  margin: 2rem 0;
  border: 1px solid #42424242;
  border-radius: 12px;
  padding: 1rem;
}

.centered {
  text-align: center;
}

figure {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

img {
  max-width: 200px;
  height: 170px;
  border-radius: 50%;
}

.areas {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
