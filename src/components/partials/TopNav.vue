<template>
<header 
    class="header" 
    :class="{'show': toggleState}"
    id="header"
>
    <div class="header__toggle" @click="toggleSideNav">
        <i id="header-toggle" class="mdi mdi-menu-open nav__icon" v-show="!toggleState"></i>
        <i id="header-toggle" class="mdi mdi-backburger nav__icon" v-show="toggleState"></i>
    </div>

    <div class="header__menu">

    </div>
</header>
</template>

<script>
export default {
    props: {
        toggleState: {
            type: Boolean
        }
    },

    methods: {
        toggleSideNav() {
            this.$emit('toggle-sidenav');
        },
    }
}
</script>