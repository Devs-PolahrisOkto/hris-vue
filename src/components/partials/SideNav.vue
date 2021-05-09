<template>
<div 
    class="l-navbar" 
    :class="{'show': toggleState}"
    id="nav-bar"
>
    <nav class="nav">
        <div>
            <router-link to="/" class="nav__logo">
                <salary-icon></salary-icon>
                <span class="nav__logo-name">POLAHRIS</span>
            </router-link>

            <div class="nav__list">
                <router-link to="/dashboard" class="nav__link">
                    <i class="mdi mdi-chart-bar nav__icon"></i>
                    <span class="nav__name">Dashboard</span>
                </router-link>

                <router-link to="/login" class="nav__link">
                    <i class="mdi mdi-account-group nav__icon"></i>
                    <span class="nav__name">Employees</span>
                </router-link>
                
                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-calendar-clock nav__icon"></i>
                    <span class="nav__name">Time Record</span>
                </router-link>

                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-cash-multiple nav__icon"></i>
                    <span class="nav__name">Payroll</span>
                </router-link>

                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-file-chart nav__icon"></i>
                    <span class="nav__name">Reports</span>
                </router-link>

                <router-link to="/" class="nav__link">
                    <i class="mdi mdi-cog nav__icon"></i>
                    <span class="nav__name">Settings</span>
                </router-link>
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
}
</script>