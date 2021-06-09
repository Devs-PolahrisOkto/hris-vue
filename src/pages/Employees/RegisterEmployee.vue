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
                    <b-icon icon="account-group-outline"></b-icon> 
                    <h5 class="is-size-5 has-text-weight-semibold px-3">Register Employee</h5>
                </h5>
            </header>
            <div class="card-content">
                <ValidationObserver ref="observer" v-slot="{ passes }">
                    <form @submit.prevent="passes(save)">

                        <h6 class="is-size-6 has-text-weight-light mb-4">Basic Information</h6>
                        <div class="columns">
                            <div class="column">
                                <ValidationProvider name="Last Name" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Last Name"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-input v-model="employee_details.last_name"></b-input>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <ValidationProvider name="First Name" rules="required"  v-slot="{ errors, valid }">
                                    <b-field 
                                        label="First Name"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-input v-model="employee_details.first_name"></b-input>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <b-field
                                    label="Middle Name"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.middle_name"></b-input>
                                </b-field>
                            </div> 
                        </div>

                        <div class="columns">
                            <div class="column">
                                <ValidationProvider name="Gender" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Gender"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-select v-model="employee_details.gender" expanded>
                                            <option value="">Select a gender</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </b-select>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <ValidationProvider name="Civil Status" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Civil Status"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-select v-model="employee_details.civil_status" expanded>
                                            <option value="">Select civil status</option>
                                            <option value="1">Single</option>
                                            <option value="2">Married</option>
                                            <option value="3">Widowed</option>
                                            <option value="4">Separated</option>
                                            <option value="5">Annulled</option>
                                            <option value="6">Divorced</option>
                                        </b-select>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <ValidationProvider name="Birthdate" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Birthdate"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-datepicker v-model="employee_details.birthdate"></b-datepicker>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Contact No.</h6>
                        <div class="columns">
                            <div class="column">
                                <ValidationProvider name="Contact No.1" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Contact No.1"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-input v-model="employee_details.contact_no1"></b-input>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <b-field 
                                    label="Contact No.2"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.contact_no2"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field 
                                    label="Contact No.3"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.contact_no3"></b-input>
                                </b-field>
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Basic Employment Information</h6>
                        <div class="columns">
                            <div class="column">
                                <ValidationProvider name="Employment Type" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Employment Type"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-select v-model="employee_details.employment_type" expanded>
                                            <option value="">Select type</option>
                                            <option value="1">Probationary</option>
                                            <option value="2">Regular</option>
                                        </b-select>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <ValidationProvider name="Position" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Position"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-select v-model="employee_details.position" expanded>
                                            <option value="">Select type</option>
                                            <option value="1">IT Staff</option>
                                            <option value="2">Office Staff</option>
                                        </b-select>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                            <div class="column">
                                <ValidationProvider name="Department" rules="required" v-slot="{ errors, valid }">
                                    <b-field 
                                        label="Department"
                                        label-position="on-border" 
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
                                        :message="errors"
                                    >
                                        <b-select v-model="employee_details.department" expanded>
                                            <option value="">Select type</option>
                                            <option value="1">HR Department</option>
                                            <option value="2">IT Department</option>
                                        </b-select>
                                    </b-field>
                                </ValidationProvider>
                            </div>
                        </div>

                        <h6 class="is-size-6 has-text-weight-light mb-4">Government ID's</h6>
                        <div class="columns">
                            <div class="column">
                                <b-field 
                                    label="SSS"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.sss"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field 
                                    label="PhilHealth"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.philhealth"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field 
                                    label="HDMF"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.hdmf"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field 
                                    label="SSS"
                                    label-position="on-border" 
                                >
                                    <b-input v-model="employee_details.tin"></b-input>
                                </b-field>
                            </div>
                        </div>

                        <b-field class="file">
                            <b-upload v-model="employee_details.profile_photo">
                                <a class="button">
                                    <b-icon icon="upload"></b-icon>
                                    <span>Upload Profile Photo</span>
                                </a>
                            </b-upload>
                            <span class="is-size-7" v-if="employee_details.profile_photo">
                                {{ employee_details.profile_photo.name }}
                            </span>
                        </b-field>

                        <b-button 
                            native-type="submit" 
                            class="is-primary mt-4 mr-auto"
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
export default {
    components: {
        MainLayout: () => import("@/components/layouts/MainLayout.vue"),
    },

    data() {
        return {
            employee_details:{
                last_name: "",
                first_name: "",
                middle_name: "",
                gender: "",
                birthdate: null,
                birthplace: "",
                civil_status: "",
                contact_no1: "",
                contact_no2: "",
                contact_no3: "",
                sss: "",
                philhealth: "",
                hdmf: "",
                tin: "",
                profile_photo: null,
                //Employment
                company:"",
                department:"",
                payroll_group:"",
                employment_type:"",
                payroll_type:"",
                pay_period:"",
                designation:"",
                manager:"",
                schedule:"",
                schedule_type:"",
                exempt_type:"",
                monthly_rate:"",
                work_hours:"",
                hiring_date:null,
                resignation_date:null,
                effectivity_date:null,
                remark:"",
                note:"",
                approver:"",
                search_company:"",
                search_department:"",
                search_payroll_group:"",
                search_designation:"",
                search_manager:"",
                search_schedule:"",
                search_approver:"",
            },
        }
    },

    methods:{
        save() {
            console.log('form saved');
        },
        resetForm() {
            requestAnimationFrame(() => {
                this.$refs.observer.reset();
            });
        }
    }
}
</script>