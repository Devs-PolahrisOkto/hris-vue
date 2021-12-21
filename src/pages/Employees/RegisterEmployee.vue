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
          <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
            <form @submit.prevent="passes(save)">
              <h6 class="is-size-6 has-text-weight-light mb-4">Basic Information</h6>
              <div class="columns">
                <div class="column">
                  <text-field
                    v-model="form.user.extension"
                    label-position="on-border"
                    label="Extension"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.firstname"
                    label-position="on-border"
                    label="First Name"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.middlename"
                    label-position="on-border"
                    label="Middle Name"
                    mode="passive"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.lastname"
                    label-position="on-border"
                    label="Last Name"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.title"
                    label-position="on-border"
                    label="Title"
                  ></text-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <text-field
                    v-model="form.user.nickname"
                    label-position="on-border"
                    label="Nickname"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.username"
                    label-position="on-border"
                    label="Username"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.email"
                    label-position="on-border"
                    label="Email"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.password"
                    label-position="on-border"
                    label="Password"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <select-field
                    v-model="form.user.gender_id"
                    label-position="on-border"
                    label="Gender"
                    rules="required"
                    mode="eager"
                    :options="gendersState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    v-model="form.user.civilstatus_id"
                    label-position="on-border"
                    label="Civil Status"
                    rules="required"
                    mode="eager"
                    :options="civilStatusesState"
                  ></select-field>
                </div>
                <div class="column">
                  <date-picker-field
                    v-model="form.user.birthDate"
                    label-position="on-border"
                    label="Birthdate"
                    rules="required"
                    mode="eager"
                  ></date-picker-field>
                </div>
              </div>

              <h6 class="is-size-6 has-text-weight-light mb-4">Basic Employment Information</h6>
              <div class="columns">
                <div class="column">
                  <select-field
                    v-model="form.user.employment_type_id"
                    label-position="on-border"
                    label="Employment Type"
                    rules="required"
                    mode="eager"
                    :options="employmentTypesState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    v-model="form.positions"
                    label-position="on-border"
                    label="Position"
                    rules="required"
                    mode="eager"
                    :options="positionsState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    v-model="form.company_id"
                    label-position="on-border"
                    label="Company"
                    rules="required"
                    mode="eager"
                    :options="companiesState"
                  ></select-field>
                </div>
                <div class="column">
                  <select-field
                    v-model="form.department_id"
                    label-position="on-border"
                    label="Department"
                    rules="required"
                    mode="eager"
                    :options="departmentsState"
                  ></select-field>
                </div>
              </div>

              <!-- Contact -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-light">Contact No.</h6>
                <b-button
                  icon-right="plus"
                  @click="addContact"
                />
              </div>
              <template v-for="contact in form.contacts">
                <div :key="contact.id" class="columns">
                  <div class="column is-6">
                      <text-field
                        v-model="contact.name"
                        label-position="on-border"
                        label="Name"
                        rules="required"
                        mode="eager"
                      ></text-field>
                  </div>
                  <div class="column is-5">
                    <text-field
                      v-model="contact.description"
                      label-position="on-border"
                      label="Description"
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
              <!-- Contact -->

              <!-- Address -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-light">Addresses</h6>
                <b-button
                  icon-right="plus"
                  @click="addAddress"
                />
              </div>
              <template v-for="address in form.addresses">
                <div :key="address.id" class="columns">
                  <div class="column is-3">
                    <text-field
                      v-model="address.name"
                      label-position="on-border"
                      label="Name"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-3">
                    <text-field
                      v-model="address.address1"
                      label-position="on-border"
                      label="Address 1"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-3">
                    <text-field
                      v-model="address.address2"
                      label-position="on-border"
                      label="Address 2"
                    ></text-field>
                  </div>
                  <div class="column is-2">
                    <select-field
                      v-model="address.address_type_id"
                      label-position="on-border"
                      label="Type"
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

              <!-- Educational Background -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-light">Educational Background</h6>
                <b-button
                  icon-right="plus"
                  @click="addEducation"
                />
              </div>
              <template v-for="education in form.education">
                <div :key="education.id" class="columns">
                  <div class="column is-3">
                      <text-field
                        v-model="education.description"
                        label-position="on-border"
                        label="Description"
                        rules="required"
                        mode="eager"
                      ></text-field>
                  </div>
                  <div class="column is-2">
                    <text-field
                      v-model="education.school"
                      label-position="on-border"
                      label="School"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-2">
                    <text-field
                      v-model="education.degree"
                      label-position="on-border"
                      label="Degree"
                      rules="required"
                      mode="eager"
                    ></text-field>
                  </div>
                  <div class="column is-2">
                    <date-picker-field
                      v-model="education.start_at"
                      label-position="on-border"
                      label="Start at"
                      rules="required"
                      mode="eager"
                    ></date-picker-field>
                  </div>
                  <div class="column is-2">
                    <date-picker-field
                      v-model="education.end_at"
                      label-position="on-border"
                      label="End at"
                      rules="required"
                      mode="eager"
                    ></date-picker-field>
                  </div>
                  <div class="column is-1">
                    <b-button
                      class="is-pulled-right"
                      icon-right="delete"
                      @click="removeEducation(education)"
                    />
                  </div>
                </div>
              </template>
              <!-- Educational Background -->

              <b-field class="file">
                <b-upload v-model="form.profile_photo">
                  <a class="button">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload Profile Photo</span>
                  </a>
                </b-upload>
                <span v-if="form.profile_photo" class="is-size-6 px-3 py-2">
                  {{ form.profile_photo.name }}
                </span>
              </b-field>

              <b-button
                native-type="submit"
                class="is-primary mt-6 mr-auto"
                :disabled="invalid"
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
import { mapActions, mapGetters } from 'vuex';
import { uniqueId } from 'lodash';
import EmployeeRepresentation from '@/api/representations/EmployeeRepresentation';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
  },

  data () {
    return {
      form: new EmployeeRepresentation(),
    };
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

  created () {
    this.getList();
  },

  methods: {
    ...mapActions({
      getList: 'setting/list',
      saveEmployee: 'employee/save',
    }),
    save () {
      const form = { ...this.form };
      form.education = form.education.map(obj => ({
        ...obj,
        start_at: this.$moment(obj.start_at).format('YYYY-MM-DD hh:mm:ss'),
        end_at: this.$moment(obj.end_at).format('YYYY-MM-DD hh:mm:ss'),
      }));
      this.saveEmployee(form);
    },
    resetForm () {
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
    addContact () {
      this.form.contacts.push({ id: uniqueId(), name: '', description: '' });
    },
    removeContact (contact) {
      const index = this.form.contacts.indexOf(contact);
      this.form.contacts.splice(index, 1);
    },
    addAddress () {
      this.form.addresses.push({
        id: uniqueId(), name: '', address1: '', address2: '', address_type_id: '',
      });
    },
    removeAddress (address) {
      const index = this.form.addresses.indexOf(address);
      this.form.addresses.splice(index, 1);
    },
    addEducation () {
      this.form.education.push({
        id: uniqueId(), description: '', school: '', degree: '', start_at: null, end_at: null,
      });
    },
    removeEducation (education) {
      const index = this.form.education.indexOf(education);
      this.form.education.splice(index, 1);
    },
  },
};
</script>
