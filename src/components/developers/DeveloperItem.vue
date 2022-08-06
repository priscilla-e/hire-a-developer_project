<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>£{{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :text="area"
        :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button isLink mode="outline" :to="viewProfileLink"
        >View Profile</base-button
      >
      <base-button isLink :to="sendOfferLink">Send an Offer</base-button>
    </div>
  </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    viewProfileLink() {
      return this.$route.path + '/' + this.id;
    },
    sendOfferLink() {
      return this.$route.path + '/' + this.id + '/send-offer';
    },
  },
};
</script>
>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #42424242;
  border-radius: 12px;
  padding: 1rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  color: rgb(39, 178, 67);
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
