<template>
<div 
    class="l-navbar" 
    :class="{'show': toggleState}"
    id="nav-bar"
    @mouseenter="addClass"
    @mouseleave="removeClass"
>
    <div class="nav">
        <nav class="nav__container">
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
                    <div class="nav__items">
                        <h3 class="nav__subtitle">Management</h3>
                        <div class="nav__dropdown">
                            <a class="nav__link">
                                <i class="mdi mdi-account-group nav__icon"></i>
                                <span class="nav__name">Employee</span>
                                <i class="mdi mdi-chevron-down nav__icon nav__dropdown-icon"></i>
                            </a>
                            <div class="nav__dropdown-collapse">
                                <div class="nav__dropdown-content">
                                    <router-link to="/employees" class="nav__dropdown-item">All Employees</router-link>
                                    <router-link to="/employees/register" class="nav__dropdown-item">Register Employees</router-link>
                                    <router-link to="/employees/import" class="nav__dropdown-item">Import Employees</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="nav__dropdown">
                            <a class="nav__link">
                                <i class="mdi mdi-calendar-clock nav__icon"></i>
                                <span class="nav__name">Timekeeping</span>
                                <i class="mdi mdi-chevron-down nav__icon nav__dropdown-icon"></i>
                            </a>
                            <div class="nav__dropdown-collapse">
                                <div class="nav__dropdown-content">
                                    <router-link to="/" class="nav__dropdown-item">Time In/Out</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Schedules</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Leaves</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="nav__dropdown">
                            <a class="nav__link">
                                <i class="mdi mdi-cash-multiple nav__icon"></i>
                                <span class="nav__name">Payroll</span>
                                <i class="mdi mdi-chevron-down nav__icon nav__dropdown-icon"></i>
                            </a>
                            <div class="nav__dropdown-collapse">
                                <div class="nav__dropdown-content">
                                    <router-link to="/" class="nav__dropdown-item">Payroll Summary</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Compensations</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Deductions</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Loans</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nav__items">
                        <h3 class="nav__subtitle">Reports</h3>
                        <router-link to="/" class="nav__link">
                            <i class="mdi mdi-file-chart nav__icon"></i>
                            <span class="nav__name">Monthly Report</span>
                        </router-link>
                        <router-link to="/" class="nav__link">
                            <i class="mdi mdi-file-chart nav__icon"></i>
                            <span class="nav__name">Annual Report</span>
                        </router-link>
                    </div>
                    <div class="nav__items">
                        <h3 class="nav__subtitle">General</h3>
                        <div class="nav__dropdown">
                            <a class="nav__link">
                                <i class="mdi mdi-cog nav__icon"></i>
                                <span class="nav__name">Settings</span>
                                <i class="mdi mdi-chevron-down nav__icon nav__dropdown-icon"></i>
                            </a>
                            <div class="nav__dropdown-collapse">
                                <div class="nav__dropdown-content">
                                    <router-link to="/" class="nav__dropdown-item">Company</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Branch</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Department</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Holiday</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Employment Types</router-link>
                                    <router-link to="/" class="nav__dropdown-item">Positions</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="nav__link">
                <i class="mdi mdi-logout nav__icon"></i>
                <span class="nav__name">Log Out</span>
            </a>
        </nav>
    </div>
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
        addClass(e) {
            if (!e.target.classList.contains("show")) {
                e.target.classList.add("show");
            }
        },
        removeClass(e) {
            if (e.target.classList.contains("show") && !this.toggleState) {
                e.target.classList.remove("show");
            }
        }
    }
}
</script>