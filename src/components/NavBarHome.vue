<template>
    <div>
    <button @click="handleMenuClick(0)">Shop</button>
    <button @click="handleMenuClick(1)">Bank</button>
    </div>
</template>

<script>
export default {
    props: ['titles'],
    methods: {
    handleMenuClick(index) {
        this.$emit('menu-clicked', index); 
    }
    }
}
</script>

<style scoped>
.navbar {
  background-color: #282c34;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.navbar-links button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.navbar-links button:hover {
  background-color: #45a049;
}
</style>
