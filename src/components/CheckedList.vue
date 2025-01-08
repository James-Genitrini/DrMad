<template>
  <div class="items">
    <ul>
      <li v-for="(item, index) in data" :key="index" style="display: flex; align-items: center;">
        <input v-if="itemCheck" type="checkbox" :checked="checked[index]" @change="$emit('checked-changed', index)"
          style="margin-right: 10px;" />

        <span v-for="field in fields" :key="field" style="margin-right: 10px;">
          {{ item[field] }}
        </span>

        <button v-if="itemButton && itemButton.show" @click="$emit('item-button-clicked', index)"
          style="margin-left: auto;">
          {{ itemButton.text }}
        </button>
      </li>
    </ul>

    <button v-if="listButton && listButton.show" @click="$emit('list-button-clicked')" style="margin-top: 10px;">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: Array,
    itemButton: Object,
    listButton: Object,
  }
}
</script>

<style scoped>
body {
  color : red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  margin: 3px;
  font-size: 13px;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent !important;
  color: red;
}

button:hover {
  -webkit-box-shadow: 0px 0px 83px 15px;
  -moz-box-shadow: 0px 0px 83px 15px;
  box-shadow: 0px 0px 83px 15px;
  transition: all 0.5s ease-in;
}
</style>
