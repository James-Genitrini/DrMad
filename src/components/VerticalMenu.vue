<template>
    <div class="vertical-menu">
        <ul class="menu-list">
            <li v-for="(item, index) in items" :key="index" class="menu-item">
                <template v-if="item.type === 'title'">
                    <slot name="menu-title" :label="item.label">
                        <div class="menu-title">{{ item.label }}</div>
                    </slot>
                </template>
                <template v-else-if="item.type === 'link'">
                    <span @click="goTo(item.to)" class="menu-link">
                        <slot name="menu-link" :label="item.label">
                            <button class="menu-button">{{ item.label }}</button>
                        </slot>
                    </span>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: "VerticalMenu",
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    methods: {
        goTo(to) {
            router.push({ path: to });
        },
    },
};
</script>

<style scoped>
.vertical-menu {
    padding: 10px;
    border-radius: 8px;
    margin: 5px auto;
    transition: ease-in-out 0.1s;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    margin: 10px 0;
}

.menu-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.menu-link {
    cursor: pointer;
    display: inline-block;
}

.menu-button {
    background-color: #00ff00;
    border: 2px solid transparent;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.menu-button:enabled:hover {
    background-color: #00cc00;
    border-color: #00cc00;
}

.menu-button:disabled {
    cursor: not-allowed;
}
</style>