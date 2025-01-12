<template>
  <div class="navbar">
    <button @click="handleMenuClick(0)" class="navbar-button">Shop</button>
    <button @click="handleMenuClick(1)" class="navbar-button">Bank</button>
  </div>
</template>

<script>
export default {
  props: ['titles'],
  methods: {
    handleMenuClick(index) {
      this.$emit('menu-clicked', index);
    },
  },
}
</script>

<style scoped>
.navbar {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.navbar-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.navbar-button:hover {
  background-color: #45a049;
}

.navbar-button:focus {
  outline: 2px solid #80bdff;
  outline-offset: 2px;
}
</style>
