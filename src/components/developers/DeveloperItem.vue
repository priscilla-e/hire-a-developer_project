<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>£{{ rate }} p/h</h4>
    <div>
      <span v-for="area in areas" :key="area"> {{ area }}</span>
    </div>
    <div class="actions">
      <router-link :to="viewProfileLink">View Profile</router-link>
      <router-link :to="sendOfferLink">Send an offer</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    viewProfileLink() {
      return this.$route.path + '/' + this.id;
    },
    sendOfferLink() {
      return this.$route.path + '/' + this.id + '/send-offer'
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
