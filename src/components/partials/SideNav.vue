<template>
<div 
    class="l-navbar" 
    :class="{'show': toggleState}"
    id="nav-bar"
>
    <nav class="nav">
        <router-link to="/" class="nav__logo">
            <salary-icon></salary-icon>
            <span class="nav__logo-name">POLAHRIS</span>
        </router-link>
        <div class="nav__menu">
            <div class="nav__list">
                <router-link to="/dashboard" class="nav__link">
                    <i class="mdi mdi-chart-bar nav__icon"></i>
                    <span class="nav__name">Dashboard</span>
                </router-link>

                <router-link to="/employees" class="nav__link">
                    <i class="mdi mdi-account-group nav__icon"></i>
                    <span class="nav__name">Employees</span>
                </router-link>
                
                <a class="nav__link collapse" @click="toggleDropdown('dropdown1')">
                    <i class="mdi mdi-calendar-clock nav__icon"></i>
                    <span class="nav__name">Time Record</span>

                    <i class="mdi mdi-chevron-down nav__icon collapse__link"></i>
                    <ul class="collapse__menu" id="dropdown1">
                        <router-link to="/" class="collapse__sublink">TimeInOut</router-link>
                        <router-link to="/" class="collapse__sublink">Group</router-link>
                        <router-link to="/" class="collapse__sublink">Members</router-link>
                    </ul>
                </a>

                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-cash-multiple nav__icon"></i>
                    <span class="nav__name">Payroll</span>
                </router-link>

                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-file-chart nav__icon"></i>
                    <span class="nav__name">Reports</span>
                </router-link>

                <a to="/" class="nav__link collapse" @click="toggleDropdown('dropdown2')">
                    <i class="mdi mdi-cog nav__icon"></i>
                    <span class="nav__name">Settings</span>

                    <i class="mdi mdi-chevron-down nav__icon collapse__link"></i>
                    <ul class="collapse__menu" id="dropdown2">
                        <router-link to="/" class="collapse__sublink">Company</router-link>
                        <router-link to="/" class="collapse__sublink">Branch</router-link>
                        <router-link to="/" class="collapse__sublink">Department</router-link>
                        <router-link to="/" class="collapse__sublink">Holiday</router-link>
                        <router-link to="/" class="collapse__sublink">Leaves</router-link>
                        <router-link to="/" class="collapse__sublink">Loans</router-link>
                    </ul>
                </a>
            </div>
        </div>
        <a href="#" class="nav__link">
            <i class="mdi mdi-logout nav__icon"></i>
            <span class="nav__name">Log Out</span>
        </a>
    </nav>
</div>
</template>

<script>
export default {
    components: {
        SalaryIcon: () => import("@/components/icons/SalaryIcon.vue"),
    },

    props: {
        toggleState: {
            type: Boolean
        }
    },

    methods: {
        toggleDropdown(id) {
            const collapseMenu = document.getElementById(id);
            collapseMenu.classList.toggle('expand'); 
            const rotate = collapseMenu.previousElementSibling
            rotate.classList.toggle('rotate')
        }
    }
}
</script>