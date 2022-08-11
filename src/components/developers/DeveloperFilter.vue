<template>
  <section>
    <base-card>
      <h2>Find Your Developer</h2>
      <span class="filter-options">
        <input type="checkbox" id="frontend" checked @change="setFilter" />
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-options">
        <input type="checkbox" id="backend" checked @change="setFilter" />
        <label for="backend">Backend</label>
      </span>
      <span class="filter-options">
        <input type="checkbox" id="graphics" checked @change="setFilter" />
        <label for="graphics">Graphics</label>
      </span>
    </base-card>
  </section>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        graphics: true,
      },
    };
  },
  methods: {
    setFilter(e) {
      const inputId = e.target.id;
      const isActive = e.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
.filter-options {
  margin-right: 1rem;
}
</style>
