<template>
  <header>
    <nav>
      <h1><router-link to="/">Hire a Developer</router-link></h1>
      <ul>
        <li><router-link to="/developers">All Developers</router-link></li>
        <li>
          <router-link to="/offers" v-if="isAuth">Offers</router-link>
          <router-link to="/auth" v-else>Register/Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
};
</script>

<style scoped>
header {
  background-color: #004ba3;
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

header a {
  text-decoration: none;
  color: #fff;
  padding: 0.5rem;
}

a:active,
a:hover,
a.router-link-active {
  background: #001b39;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  background: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
