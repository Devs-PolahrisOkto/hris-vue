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
                                    v-model="employee_details.last_name"
                                    rules="required"
                                    mode="eager"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="First Name"
                                    v-model="employee_details.first_name"
                                    rules="required"
                                    mode="eager"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="Middle Name"
                                    v-model="employee_details.middle_name"
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
                                    v-model="employee_details.gender"
                                    rules="required"
                                    mode="eager"
                                    :options="GENDERS"
                                ></select-field>
                            </div>
                            <div class="column">
                                <select-field
                                    label-position="on-border"
                                    label="Civil Status"
                                    v-model="employee_details.civil_status"
                                    rules="required"
                                    mode="eager"
                                    :options="CIVIL_STATUS"
                                ></select-field>
                            </div>
                            <div class="column">
                                <date-picker-field
                                    label-position="on-border"
                                    label="Birthdate"
                                    v-model="employee_details.birthdate"
                                    rules="required"
                                    mode="eager"
                                ></date-picker-field>
                                <!-- <ValidationProvider name="Birthdate" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Birthdate"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-datepicker v-model="employee_details.birthdate"></b-datepicker>
                                    </b-field>
                                </ValidationProvider> -->
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Contact No.</h6>
                        <div class="columns">
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="Contact No.1"
                                    v-model="employee_details.contact_no1"
                                    rules="required"
                                    mode="eager"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="Contact No.2"
                                    v-model="employee_details.contact_no2"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="Contact No.3"
                                    v-model="employee_details.contact_no3"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Basic Employment Information</h6>
                        <div class="columns">
                            <div class="column">
                                <select-field
                                    label-position="on-border"
                                    label="Employment Type"
                                    v-model="employee_details.employment_type"
                                    rules="required"
                                    mode="eager"
                                    :options="EMPLOYMENT_TYPES"
                                ></select-field>
                            </div>
                            <div class="column">
                                <select-field
                                    label-position="on-border"
                                    label="Position"
                                    v-model="employee_details.position"
                                    rules="required"
                                    mode="eager"
                                    :options="POSITIONS"
                                ></select-field>
                            </div>
                            <div class="column">
                                <select-field
                                    label-position="on-border"
                                    label="Department"
                                    v-model="employee_details.department"
                                    rules="required"
                                    mode="eager"
                                    :options="DEPARTMENTS"
                                ></select-field>
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Government ID's</h6>
                        <div class="columns">
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="SSS"
                                    v-model="employee_details.sss"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="PhilHealth"
                                    v-model="employee_details.philhealth"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="HDMF"
                                    v-model="employee_details.hdmf"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                            <div class="column">
                                <text-field
                                    label-position="on-border"
                                    label="TIN"
                                    v-model="employee_details.tin"
                                    rules=""
                                    mode="passive"
                                ></text-field>
                            </div>
                        </div>

                        <b-field class="file">
                            <b-upload v-model="employee_details.profile_photo">
                                <a class="button">
                                    <b-icon icon="upload"></b-icon>
                                    <span>Upload Profile Photo</span>
                                </a>
                            </b-upload>
                            <span class="is-size-6 px-3 py-2" v-if="employee_details.profile_photo">
                                {{ employee_details.profile_photo.name }}
                            </span>
                        </b-field>

                        <!-- Address -->
                        <b-collapse class="mt-4" animation="slide" aria-id="contentIdForA11y3">
                            <template #trigger="props">
                                <div
                                    class="is-flex is-justify-content-space-between is-align-items-center mb-1"
                                    role="button"
                                    aria-controls="contentIdForA11y3"
                                >
                                    <h6 class="is-size-6 has-text-weight-light">Address</h6>
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
                                            label="Street/House/Building"
                                            rules=""
                                            mode="passive"
                                        ></text-field>
                                    </div>
                                    <div class="column">
                                        <text-field
                                            label-position="on-border"
                                            label="Barangay"
                                            rules=""
                                            mode="passive"
                                        ></text-field>
                                    </div>
                                    <div class="column">
                                        <text-field
                                            label-position="on-border"
                                            label="City/Municipality"
                                            rules=""
                                            mode="passive"
                                        ></text-field>
                                    </div>
                                    <div class="column">
                                        <text-field
                                            label-position="on-border"
                                            label="Province/State"
                                            rules=""
                                            mode="passive"
                                        ></text-field>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>
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
import {
    GENDERS,
    CIVIL_STATUS,
    EMPLOYMENT_TYPES,
    POSITIONS,
    DEPARTMENTS
} from '@/constants/index';

export default {
    components: {
        MainLayout: () => import("@/layouts/MainLayout.vue"),
    },

    data() {
        return {
            GENDERS: GENDERS,
            CIVIL_STATUS: CIVIL_STATUS,
            EMPLOYMENT_TYPES: EMPLOYMENT_TYPES,
            POSITIONS: POSITIONS,
            DEPARTMENTS: DEPARTMENTS,
            employee_details:{
                last_name: "",
                first_name: "",
                middle_name: "",
                gender: "",
                civil_status: "",
                birthdate: null,
                // Contact
                contact_no1: "",
                contact_no2: "",
                contact_no3: "",
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

    methods:{
        save() {
            console.log(this.employee_details);
        },
        resetForm() {
            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });
        }
    }
}
</script>