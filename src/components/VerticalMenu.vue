<template>
    <div class="vertical-menu">
        <ul class="menu-list">
            <li v-for="(item, index) in items" :key="index" class="menu-item">
                <template v-if="item.type === 'title'">
                    <slot name="menu-title" :label="item.label" class="menu-title">
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
    padding: 20px;
    background-color: transparent;
    border-radius: 10px;
    border: none!important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: ease-in-out 0.2s;
}

.vertical-menu:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transition: ease-in-out 0.3s;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    margin: 15px 0;
}

.menu-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.menu-link {
    cursor: pointer;
    display: inline-block;
    width: 100%;
}

.menu-button {
    background-color: #4CAF50;
    padding: 12px 20px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    width: 100%;
    border-radius: 6px;
    transition: background-color 0.3s, transform 0.2s, color 0.2s;
    font-weight: 500;
}

.menu-button:enabled:hover {
    background-color: #3e8e41;
}

.menu-button:enabled:focus {
    outline: 2px solid #60e464;
    outline-offset: 2px;
}

.menu-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none!important;
}

.menu-button:disabled:hover {
    background-color: #ddd;
    transform: none!important;
}

@media (max-width: 768px) {
    .vertical-menu {
        padding: 15px;
    }

    .menu-title {
        font-size: 1.1rem;
    }

    .menu-button {
        font-size: 0.95rem;
        padding: 10px 15px;
    }
}
</style>
