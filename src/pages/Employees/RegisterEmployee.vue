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
              <h6 class="is-size-6 has-text-weight-medium has-text-grey mb-4">
                Personal
              </h6>
              <div class="columns">
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
              </div>

              <div class="columns">
                <div class="column">
                  <text-field
                    v-model="form.user.extension"
                    label-position="on-border"
                    label="Extension"
                  ></text-field>
                </div>
                <div class="column">
                  <select-field
                    v-model="form.user.title"
                    label-position="on-border"
                    label="Title"
                    :options="TITLES"
                  ></select-field>
                </div>
                <div class="column">
                  <text-field
                    v-model="form.user.nickname"
                    label-position="on-border"
                    label="Nickname"
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
                    v-model="form.user.civil_status_id"
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

              <h6 class="is-size-6 has-text-weight-medium has-text-grey mb-4">
                Authentication
              </h6>
              <div class="columns">
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
                    type="password"
                    rules="required"
                    mode="eager"
                  ></text-field>
                </div>
              </div>

              <h6 class="is-size-6 has-text-weight-medium has-text-grey mb-4">
                Employment
              </h6>
              <div class="columns">
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
                <div class="column">
                  <select-field
                    v-model="form.user.branch_id"
                    label-position="on-border"
                    label="Branch"
                    rules="required"
                    mode="eager"
                    :options="branchesState"
                  ></select-field>
                </div>
              </div>
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
                  <b-field label="Positions" label-position="on-border">
                    <b-taginput
                      v-model="form.positions"
                      :data="positionsState"
                      :allow-new="false"
                      :open-on-focus="true"
                      field="text"
                      autocomplete
                      ellipsis
                      placeholder="Select positions"
                      aria-close-label="Delete this tag"
                      class="pt-0">
                    </b-taginput>
                  </b-field>
                </div>
              </div>

              <!-- Contact -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-medium has-text-grey">
                  Contacts
                </h6>
                <b-button
                  v-if="form.contacts.length > 0"
                  icon-left="playlist-edit"
                  type="is-ghost"
                  class="px-2"
                  @click="addContact"
                >
                  Add Contact
                </b-button>
              </div>
              <template v-if="form.contacts.length > 0">
                <template v-for="contact in form.contacts">
                  <div :key="contact.id" class="columns">
                    <div class="column is-6">
                        <text-field
                          v-model="contact.name"
                          label-position="on-border"
                          label="Contact No."
                          rules="required"
                          mode="eager"
                        ></text-field>
                    </div>
                    <div class="column is-5">
                      <text-field
                        v-model="contact.description"
                        label-position="on-border"
                        label="Contact Name"
                        rules="required"
                        mode="eager"
                      ></text-field>
                    </div>
                    <div class="column is-1 is-flex is-justify-content-flex-end">
                      <b-tooltip label="Remove">
                        <b-button
                          class="is-pulled-right px-4"
                          icon-right="delete"
                          rounded
                          @click="removeContact(contact)"
                        />
                      </b-tooltip>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="is-flex is-justify-content-center">
                  <b-button
                    icon-left="playlist-edit"
                    type="is-ghost"
                    @click="addContact"
                  >
                    Add Contact
                  </b-button>
                </div>
              </template>
              <!-- Contact -->

              <!-- Address -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-medium has-text-grey">
                  Addresses
                </h6>
                <b-button
                  v-if="form.addresses.length > 0"
                  icon-left="playlist-edit"
                  type="is-ghost"
                  class="px-2"
                  @click="addAddress"
                >
                  Add Address
                </b-button>
              </div>
              <template v-if="form.addresses.length > 0">
                <template v-for="address in form.addresses">
                  <div :key="address.id">
                    <div class="columns">
                      <div class="column is-6">
                        <text-field
                          v-model="address.name"
                          label-position="on-border"
                          label="House/Bldg No."
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-5">
                        <text-field
                          v-model="address.address1"
                          label-position="on-border"
                          label="Street"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-1 is-flex is-justify-content-flex-end">
                        <b-tooltip label="Remove">
                          <b-button
                            class="is-pulled-right px-4"
                            icon-right="delete"
                            rounded
                            @click="removeAddress(address)"
                          />
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-4">
                        <text-field
                          v-model="address.barangay_id"
                          label-position="on-border"
                          label="Barangay"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-4">
                        <text-field
                          v-model="address.province_id"
                          label-position="on-border"
                          label="Province"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-4">
                        <text-field
                          v-model="address.region_id"
                          label-position="on-border"
                          label="Region"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-4">
                        <text-field
                          v-model="address.state_id"
                          label-position="on-border"
                          label="City"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-4">
                        <text-field
                          v-model="address.country_id"
                          label-position="on-border"
                          label="Country"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-4">
                        <select-field
                          v-model="address.address_type_id"
                          label-position="on-border"
                          label="Type"
                          rules="required"
                          mode="eager"
                          :options="addressTypesState"
                        ></select-field>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="is-flex is-justify-content-center">
                  <b-button
                    icon-left="playlist-edit"
                    type="is-ghost"
                    @click="addAddress"
                  >
                    Add Address
                  </b-button>
                </div>
              </template>
              <!-- Address -->

              <!-- Educational Background -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-medium has-text-grey">
                  Educational Background
                </h6>
                <b-button
                  v-if="form.education.length > 0"
                  icon-left="playlist-edit"
                  type="is-ghost"
                  class="px-2"
                  @click="addEducation"
                >
                  Add Education
                </b-button>
              </div>
              <template v-if="form.education.length > 0">
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
                    <div class="column is-1 is-flex is-justify-content-flex-end">
                      <b-tooltip label="Remove" class="px-0">
                        <b-button
                          class="is-pulled-right px-4"
                          icon-right="delete"
                          rounded
                          @click="removeEducation(education)"
                        />
                      </b-tooltip>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="is-flex is-justify-content-center">
                  <b-button
                    icon-left="playlist-edit"
                    type="is-ghost"
                    @click="addEducation"
                  >
                    Add Education
                  </b-button>
                </div>
              </template>
              <!-- Educational Background -->

              <!-- Employment History -->
              <div class="is-flex is-justify-content-space-between is-align-items-center my-4">
                <h6 class="is-size-6 has-text-weight-medium has-text-grey">
                  Employment History
                </h6>
                <b-button
                  v-if="form.education.length > 0"
                  icon-left="playlist-edit"
                  type="is-ghost"
                  class="px-2"
                  @click="addExperience"
                >
                  Add Experience
                </b-button>
              </div>
              <template v-if="form.experiences.length > 0">
                <template v-for="experience in form.experiences">
                  <div :key="experience.id">
                    <div class="columns">
                      <div class="column is-4">
                          <text-field
                            v-model="experience.company"
                            label-position="on-border"
                            label="Company"
                            rules="required"
                            mode="eager"
                          ></text-field>
                      </div>
                      <div class="column is-4">
                        <text-field
                          v-model="experience.project_name"
                          label-position="on-border"
                          label="Project Name"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-3">
                        <text-field
                          v-model="experience.description"
                          label-position="on-border"
                          label="Description"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-1 is-flex is-justify-content-flex-end">
                        <b-tooltip label="Remove" class="px-0">
                          <b-button
                            class="is-pulled-right px-4"
                            icon-right="delete"
                            rounded
                            @click="removeExperience(experience)"
                          />
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-3">
                        <text-field
                          v-model="experience.role"
                          label-position="on-border"
                          label="Role"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-3">
                        <text-field
                          v-model="experience.salary"
                          label-position="on-border"
                          label="Salary"
                          rules="required"
                          mode="eager"
                        ></text-field>
                      </div>
                      <div class="column is-3">
                        <date-picker-field
                          v-model="experience.start_at"
                          label-position="on-border"
                          label="Start at"
                          rules="required"
                          mode="eager"
                        ></date-picker-field>
                      </div>
                      <div class="column is-3">
                        <date-picker-field
                          v-model="experience.end_at"
                          label-position="on-border"
                          label="End at"
                          rules="required"
                          mode="eager"
                        ></date-picker-field>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="is-flex is-justify-content-center">
                  <b-button
                    icon-left="playlist-edit"
                    type="is-ghost"
                    @click="addExperience"
                  >
                    Add Experience
                  </b-button>
                </div>
              </template>
              <!-- Employment History -->

              <!-- Avatar -->
              <h6 class="is-size-6 has-text-weight-medium has-text-grey mb-4">
                Avatar
              </h6>
              <span v-show="avatarName" class="tag is-primary my-3">{{ avatarName }}</span>
              <b-field class="file">
                <b-upload v-model="form.profile_photo">
                  <input ref="fileInput" type="file" @change="change">
                  <a class="button">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload Profile Photo</span>
                  </a>
                </b-upload>
              </b-field>

              <div class="is-flex is-justify-content-end">
                <b-button
                  native-type="submit"
                  class="is-primary mt-6 mr-auto"
                  :disabled="invalid"
                >
                  <span class="has-text-weight-bold px-6">Register</span>
                </b-button>
              </div>
              <!-- Avatar -->

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
import { TITLES } from '@/constants';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
  },

  data () {
    return {
      form: new EmployeeRepresentation(),
      TITLES,
      avatarName: '',
    };
  },

  computed: {
    ...mapGetters({
      companiesState: 'setting/companiesState',
      branchesState: 'setting/branchesState',
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
      form.experiences = form.experiences.map(obj => ({
        ...obj,
        start_at: this.$moment(obj.start_at).format('YYYY-MM-DD hh:mm:ss'),
        end_at: this.$moment(obj.end_at).format('YYYY-MM-DD hh:mm:ss'),
      }));
      form.positions = form.positions.map(position => position.value);
      this.saveEmployee(form).then(() => {
        this.$buefy.snackbar.open({
          message: 'Employee has been successfully registered.',
          position: 'is-top',
          queue: true,
        });
        this.$router.push({ path: '/employees' });
      });
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
        id: uniqueId(),
        name: '',
        address1: '',
        address2: '',
        barangay_id: '',
        province_id: '',
        region_id: '',
        state_id: '',
        country_id: '',
        address_type_id: '',
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
    addExperience () {
      this.form.experiences.push({
        id: uniqueId(),
        company: '',
        project_name: '',
        description: '',
        role: '',
        salary: '',
        start_at: null,
        end_at: null,
      });
    },
    removeExperience (experience) {
      const index = this.form.experiences.indexOf(experience);
      this.form.experiences.splice(index, 1);
    },
    change (evt) {
      const file = evt.target.files;
      const [ firstFile ] = file;
      this.form.profile_photo = firstFile;
      this.avatarName = firstFile.name;
    },
  },
};
</script>
