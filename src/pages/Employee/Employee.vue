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
            <div class="is-flex is-justify-content-end p-2">
              <b-tooltip label="Edit Personal Details">
                <a
                  class="icon is-clickable mx-2"
                  @click="editPersonalModal = true"
                >
                  <i class="mdi mdi-pencil"></i>
                </a>
              </b-tooltip>
            </div>
            <div
              class="is-flex is-flex-direction-column
              is-justify-content-center is-align-items-center"
            >
              <figure class="image is-128x128 mb-2 avatar--editable">
                <img
                  class="avatar--editable__img is-rounded"
                  :src="getProfileImageUrl(employee)"
                >
                <a
                  class="avatar--editable__btn icon is-clickable mx-2"
                  @click="editAvatarModal = true"
                >
                  <i class="mdi mdi-camera"></i>
                </a>
              </figure>
              <h5 v-show="employeeName" class="is-size-5">{{ employeeName }}</h5>
              <h6 v-show="position" class="is-size-6">{{ position }}</h6>
            </div>
            <div class="card-content">
              <div v-show="employeeNumber" class="pt-2">
                <h6 class="is-size-7 has-text-grey-light">Employee No.</h6>
                <h6 class="is-size-6">{{ employeeNumber }}</h6>
              </div>
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
            <b-tab-item label="Personal" icon="card-account-details-outline">
              <personal-data></personal-data>
            </b-tab-item>
            <b-tab-item label="Documents" icon="file-document-multiple">
              <personal-documents></personal-documents>
            </b-tab-item>
            <b-tab-item label="Timekeeping" icon="account-clock">
              <timekeeping-record></timekeeping-record>
            </b-tab-item>
            <b-tab-item label="Payroll" icon="cash-multiple">
              <payroll-record></payroll-record>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>

    <!-- Start Modals -->
    <edit-modal
      :active="editPersonalModal"
      @close="editPersonalModal = !editPersonalModal"
    ></edit-modal>
    <edit-avatar
      :active="editAvatarModal"
      @close="editAvatarModal = !editAvatarModal"
    ></edit-avatar>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Avatar from '@/mixins/avatar';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    PersonalData: () => import('@/components/Employee/Personal/PersonalData.vue'),
    PersonalDocuments: () => import('@/components/Employee/Documents/Documents.vue'),
    PayrollRecord: () => import('@/components/Employee/Payroll/Payroll.vue'),
    TimekeepingRecord: () => import('@/components/Employee/Timekeeping/Timekeeping.vue'),
    EditModal: () => import('@/components/Employee/Personal/EditModal.vue'),
    EditAvatar: () => import('@/components/Employee/Personal/EditAvatar.vue'),
  },

  data () {
    return {
      activeTab: 0,
      editPersonalModal: false,
      editAvatarModal: false,
    };
  },

  mixins: [ Avatar ],

  computed: {
    ...mapGetters({
      employee: 'employee/selected',
      employeeAvatar: 'employee/selected/employeeAvatar',
      employeeName: 'employee/selected/employeeName',
      employeeNumber: 'employee/selected/employeeNumber',
      employmentType: 'employee/selected/employmentType',
      position: 'employee/selected/position',
      contact: 'employee/selected/contact',
      address: 'employee/selected/address',
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
