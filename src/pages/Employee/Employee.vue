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
            <div
              class="is-flex is-flex-direction-column
              is-justify-content-center is-align-items-center py-5"
            >
              <figure class="image is-128x128 mb-2">
                <img class="is-rounded" :src="employee.avatar">
              </figure>
              <h5 class="is-size-5">{{ employee.employeeName }}</h5>
              <h6 v-show="position" class="is-size-6">{{ position }}</h6>
            </div>
            <div class="card-content">
              <div v-show="employmentType" class="pt-2">
                <h6 class="is-size-7 has-text-grey-light">Employment Type</h6>
                <h6 class="is-size-6">{{ employmentType }}</h6>
              </div>
              <div v-show="contact" class="pt-2">
                <h6 class="is-size-7 has-text-grey-light">Contact No.</h6>
                <h6 class="is-size-6">{{ contact }}</h6>
              </div>
              <div v-show="address" class="pt-2">
                <h6 class="is-size-7 has-text-grey-light">Address</h6>
                <h6 class="is-size-6">{{ address }}</h6>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    PersonalData: () => import('@/components/Employee/Personal/PersonalData.vue'),
    PersonalDocuments: () => import('@/components/Employee/Documents/Documents.vue'),
    PayrollRecord: () => import('@/components/Employee/Payroll/Payroll.vue'),
    TimekeepingRecord: () => import('@/components/Employee/Timekeeping/Timekeeping.vue'),
  },

  data () {
    return {
      activeTab: 0,
    };
  },

  computed: {
    ...mapGetters({
      employee: 'employee/selected',
      position: 'employee/selected/position',
      contact: 'employee/selected/contact',
      address: 'employee/selected/address',
      employmentType: 'employee/selected/employmentType',
    }),
  },

  created () {
    this.findEmployee(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      findEmployee: 'employee/find',
    }),
  },
};
</script>

<style lang="scss" scoped>
/deep/ .tab-content {
    padding: 1rem 0;
}
</style>
