<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li><a href="#">Employees</a></li>
        <li class="is-active"><a href="#" aria-current="page">Register Employee</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <div class="container is-fluid my-5">
      <div class="card">
        <header class="py-2 px-3">
          <h5 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="account-plus"></b-icon> 
            <h5 class="is-size-5 has-text-weight-semibold px-3">Register Employee</h5>
          </h5>
        </header>
        <div class="card-content">
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <form @submit.prevent="passes(save)">
              <h6 class="is-size-6 has-text-weight-light mb-4">Basic Information</h6>
              <div class="columns">
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="Last Name"
                    v-model="employeeDetails.last_name"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="First Name"
                    v-model="employeeDetails.first_name"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="Middle Name"
                    v-model="employeeDetails.middle_name"
                    rules=""
                    mode="passive"
                  ></text-field>
                </div> 
              </div>

              <div class="columns">
                <div class="column">
                  <select-field
                    label-position="on-border"
                    label="Gender"
                    v-model="employeeDetails.gender"
                    rules="required"
                    mode="eager"
                    :options="gendersState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    label-position="on-border"
                    label="Civil Status"
                    v-model="employeeDetails.civil_status"
                    rules="required"
                    mode="eager"
                    :options="CIVIL_STATUS"
                  ></select-field>
                </div>
                <div class="column">
                  <date-picker-field
                    label-position="on-border"
                    label="Birthdate"
                    v-model="employeeDetails.birthdate"
                    rules="required"
                    mode="eager"
                  ></date-picker-field>
                </div>
              </div>

              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-light">Contact No.</h6>
                <b-button
                  icon-right="plus"
                  @click="addContact"
                />
              </div>
              <template v-for="contact in employeeDetails.contacts">
                <div class="columns" :key="contact.id">
                  <div class="column is-6">
                      <text-field
                        label-position="on-border"
                        label="Name"
                        v-model="contact.name"
                        rules="required"
                        mode="eager"
                      ></text-field>
                  </div>
                  <div class="column is-5">
                    <text-field
                      label-position="on-border"
                      label="Description"
                      v-model="contact.description"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-1">
                    <b-button
                      class="is-pulled-right"
                      icon-right="delete"
                      @click="removeContact(contact)"
                    />
                  </div>
                </div>
              </template>

              <h6 class="is-size-6 has-text-weight-light mb-4">Basic Employment Information</h6>
              <div class="columns">
                <div class="column">
                  <select-field
                    label-position="on-border"
                    label="Employment Type"
                    v-model="employeeDetails.employment_type"
                    rules="required"
                    mode="eager"
                    :options="employmentTypesState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    label-position="on-border"
                    label="Position"
                    v-model="employeeDetails.position"
                    rules="required"
                    mode="eager"
                    :options="positionsState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    label-position="on-border"
                    label="Department"
                    v-model="employeeDetails.department"
                    rules="required"
                    mode="eager"
                    :options="departmentsState"
                  ></select-field>
                </div>
              </div>

              <h6 class="is-size-6 has-text-weight-light mb-4">Government ID's</h6>
              <div class="columns">
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="SSS"
                    v-model="employeeDetails.sss"
                    rules=""
                    mode="passive"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="PhilHealth"
                    v-model="employeeDetails.philhealth"
                    rules=""
                    mode="passive"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="HDMF"
                    v-model="employeeDetails.hdmf"
                    rules=""
                    mode="passive"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    label-position="on-border"
                    label="TIN"
                    v-model="employeeDetails.tin"
                    rules=""
                    mode="passive"
                  ></text-field>
                </div>
              </div>

              <b-field class="file">
                <b-upload v-model="employeeDetails.profile_photo">
                  <a class="button">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload Profile Photo</span>
                  </a>
                </b-upload>
                <span class="is-size-6 px-3 py-2" v-if="employeeDetails.profile_photo">
                  {{ employeeDetails.profile_photo.name }}
                </span>
              </b-field>

              <!-- Address -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-light">Addresses</h6>
                <b-button
                  icon-right="plus"
                  @click="addAddress"
                />
              </div>
              <template v-for="address in employeeDetails.addresses">
                <div class="columns" :key="address.id">
                  <div class="column is-3">
                    <text-field
                      label-position="on-border"
                      label="Name"
                      v-model="address.name"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-3">
                    <text-field
                      label-position="on-border"
                      label="Address 1"
                      v-model="address.address1"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-3">
                    <text-field
                      label-position="on-border"
                      label="Address 2"
                      v-model="address.address2"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-2">
                    <select-field
                      label-position="on-border"
                      label="Type"
                      v-model="address.address_type_id"
                      rules="required"
                      mode="eager"
                      :options="addressTypesState"
                    ></select-field>
                  </div>
                  <div class="column is-1">
                    <b-button
                      class="is-pulled-right"
                      icon-right="delete"
                      @click="removeAddress(address)"
                    />
                  </div>
                </div>
              </template>
              <!-- Address -->

              <!-- Educational Attainment -->
              <b-collapse class="mt-4" animation="slide" aria-id="contentIdForA11y3">
                <template #trigger="props">
                  <div
                    class="is-flex is-justify-content-space-between is-align-items-center mb-1"
                    role="button"
                    aria-controls="contentIdForA11y3"
                  >
                    <h6 class="is-size-6 has-text-weight-light">Educational Attainment</h6>
                    <a class="card-header-icon">
                      <b-icon
                        :icon="props.open ? 'chevron-down' : 'chevron-up'">
                      </b-icon>
                    </a>
                  </div>
                </template>
                <div class="content">
                  <div class="columns">
                    <div class="column">
                      <text-field
                        label-position="on-border"
                        label="School Name"
                        rules=""
                        mode="passive"
                      ></text-field>
                    </div>
                    <div class="column">
                      <text-field
                        label-position="on-border"
                        label="Level/Degree/Major"
                        rules=""
                        mode="passive"
                      ></text-field>
                    </div>
                    <div class="column">
                      <text-field
                        label-position="on-border"
                        label="Inclusive Dates"
                        rules=""
                        mode="passive"
                      ></text-field>
                    </div>
                  </div>
                </div>
              </b-collapse>
              <!-- Educational Attainment -->

              <b-button 
                native-type="submit" 
                class="is-primary mt-6 mr-auto"
              >
                <span class="has-text-weight-bold px-5">Register</span>
              </b-button>
              
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
      
  </main-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {uniqueId} from 'lodash';

export default {
  components: {
    MainLayout: () => import("@/layouts/MainLayout.vue"),
  },

  data() {
    return {
      GENDERS: [],
      CIVIL_STATUS: [],
      EMPLOYMENT_TYPES: [],
      POSITIONS: [],
      DEPARTMENTS: [],
      employeeDetails:{
        lastname: "",
        firstname: "",
        middlename: "",
        gender: "",
        civilstatus: "",
        birthdate: null,
        contacts:[
          { id: uniqueId(), name: '', description: '', },
        ],
        addresses:[
          { id: uniqueId(), name: '', address1: '', address2: '', address_type_id: '' },
        ],
        // Employment
        employment_type:"",
        position: "",
        department:"",
        // Government ID
        sss: "",
        philhealth: "",
        hdmf: "",
        tin: "",
        profile_photo: null,
      },
    }
  },

  computed: {
    ...mapGetters({
      companiesState: 'setting/companiesState',
      departmentsState: 'setting/departmentsState',
      positionsState: 'setting/positionsState',
      employmentTypesState: 'setting/employmentTypesState',
      addressTypesState: 'setting/addressTypesState',
      documentTypesState: 'setting/documentTypesState',
      banksState: 'setting/banksState',
      civilStatusesState: 'setting/civilStatusesState',
      gendersState: 'setting/gendersState',
    }),
  },

  methods:{
    ...mapActions({
      getList: 'setting/list',
    }),
    save() {
      console.log(this.employeeDetails);
    },
    resetForm() {
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
    addContact() {
      this.employeeDetails.contacts.push({ id: uniqueId(), name: '', description: '', });
    },
    removeContact(contact) {
      const index = this.employeeDetails.contacts.indexOf(contact);
      this.employeeDetails.contacts.splice(index, 1);
    },
    addAddress() {
      this.employeeDetails.addresses.push({ id: uniqueId(), name: '', address1: '', address2: '', address_type_id: '' });
    },
    removeAddress(address) {
      const index = this.employeeDetails.addresses.indexOf(address);
      this.employeeDetails.addresses.splice(index, 1);
    }
  },

  created() {
    this.getList();
  }
}
</script>