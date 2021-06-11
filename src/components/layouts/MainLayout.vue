<template>
<div>
    <top-nav
        :toggle-state="toggleState"
        @toggle-sidenav="toggleSideNav"
    ></top-nav>
    <side-nav
        :toggle-state="toggleState"
    ></side-nav>
    <div class="main-content" :class="{'show': toggleState}">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {
        TopNav: () => import("@/components/partials/TopNav.vue"),
        SideNav: () => import("@/components/partials/SideNav.vue"),
    },

    data() {
        return {
            toggleState: false,
        }
    },

    methods: {
        toggleSideNav() {
            this.toggleState = !this.toggleState;      
        }
    }
}
</script>