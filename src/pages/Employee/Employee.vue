<template>
<main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
        <ul class="px-3 pt-3">
            <li><a href="#">Admin</a></li>
            <li><a href="#">Employees</a></li>
            <li class="is-active"><a href="#" aria-current="page">Employee Profile</a></li>
        </ul>
    </nav>
    <!-- End Breadcrumb -->

    <div class="container is-fluid my-5">
        <div class="columns">
            <div class="column is-3">
                <div class="card">
                    <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center py-5">
                        <figure class="image is-128x128 mb-2">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                        <h5 class="is-size-5">John Doe</h5>
                        <h6 class="is-size-6">IT Staff</h6>
                    </div>
                    <div class="card-content">
                        <div class="pb-2">
                            <h6 class="is-size-7 has-text-grey-light">Department</h6>
                            <h6 class="is-size-6">IT Department</h6>
                        </div>
                        <div class="pt-2">
                            <h6 class="is-size-7 has-text-grey-light">Employment Type</h6>
                            <h6 class="is-size-6">Probationary</h6>
                        </div>
                        <div class="pt-2">
                            <h6 class="is-size-7 has-text-grey-light">Contact No.</h6>
                            <h6 class="is-size-6">21-254-456</h6>
                        </div>
                        <div class="pt-2">
                            <h6 class="is-size-7 has-text-grey-light">Address</h6>
                            <h6 class="is-size-6">Makati City, Philippines</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-9">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Personal">
                        <personal-data></personal-data>
                    </b-tab-item>
                    <b-tab-item label="Documents">
                        <personal-documents></personal-documents>
                    </b-tab-item>
                    <b-tab-item label="Timekeeping">
                        <timekeeping-record></timekeeping-record>
                    </b-tab-item>
                    <b-tab-item label="Payroll">
                        <payroll-record></payroll-record>
                    </b-tab-item>
                </b-tabs>
            </div>
        </div>
    </div>
</main-layout>
</template>

<script>
export default {
    components: {
        MainLayout: () => import("@/layouts/MainLayout.vue"),
        PersonalData: () => import("@/components/Employee/Personal/PersonalData.vue"),
        PersonalDocuments: () => import("@/components/Employee/Documents/Documents.vue"),
        PayrollRecord: () => import("@/components/Employee/Payroll/Payroll.vue"),
        TimekeepingRecord: () => import("@/components/Employee/Timekeeping/Timekeeping.vue"),
    },

    data() {
        return {
            activeTab: 0
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .tab-content {
    padding: 1rem 0;
}
</style>