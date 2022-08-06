<template>
  <span class="badge" :class="type">
    {{ area }}
  </span>
</template>

<script>
export default {
  props: ['type', 'text'],
  computed: {
    area() {
      return this.text.toUpperCase();
    },
  },
};
</script>

<style>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.3rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 12px;
}
.frontend {
  background: #004ba3;
  color: white;
}

.backend {
  background-color: #31649f;
  color: white;
}

.graphics {
  background-color: #6784a4;
  color: white;
}
</style>
