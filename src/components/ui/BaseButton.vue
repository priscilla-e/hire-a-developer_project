<template>
  <button v-if="!isLink" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
  to: {
    type: String,
    required: false,
    default: '/',
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #004ba3;
  border: 1px solid #004ba3;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #004ba3;
  border-color: #004ba3;
}

.flat {
  background-color: transparent;
  color: #004ba3;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #004ba3;
  color: #004ba3;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #bed9f7;
}
</style>
