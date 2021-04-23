<template>
<div>
    <top-nav></top-nav>
    <div class="p-2">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {
        TopNav: () => import("@/components/partials/TopNav.vue"),
    }
}
</script>