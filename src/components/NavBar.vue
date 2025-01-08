<template>
  <div class="navbar">
    <button v-for="(title, index) in titles" :key="index" :style="{ color: title.color, borderColor: title.color }"
      @click="menuClicked(index)">{{ title.text }}</button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array },
  methods: {
    menuClicked(index) {
      this.$emit('menu-clicked', index);
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  margin: 3px;
  padding: 8px;
  font-size: 13px;
  cursor: pointer;
  border: 1.5px solid;
  border-radius: 5px;
  background-color: transparent !important;
  transition: all 0.5s;
}

button:hover {
  -webkit-box-shadow: 0px 0px 200px 80px;
  -moz-box-shadow: 0px 0px 200px 80px;
  box-shadow: 0px 0px 200px 80px;
}
</style>
