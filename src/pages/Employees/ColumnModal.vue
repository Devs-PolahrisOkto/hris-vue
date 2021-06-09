<template>
<b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head is-flex is-justify-content-space-between">
                <h6 class="is-flex is-align-items-center">
                    <b-icon icon="table-column" size="is-small"></b-icon> 
                    <h6 class="is-size-6 has-text-weight-bold px-3">Columns</h6>
                </h6>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <div class="has-background-light px-5 py-3 mb-2 is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-6 has-text-weight-semibold">Name</span>
                    <b-checkbox></b-checkbox>
                </div>
                <div class="has-background-light px-5 py-3 mb-2 is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-6 has-text-weight-semibold">Position</span>
                    <b-checkbox></b-checkbox>
                </div>
                <div class="has-background-light px-5 py-3 mb-2 is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-6 has-text-weight-semibold">Employment Type</span>
                    <b-checkbox></b-checkbox>
                </div>
                <div class="has-background-light px-5 py-3 mb-2 is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-6 has-text-weight-semibold">Department</span>
                    <b-checkbox></b-checkbox>
                </div>
                <div class="has-background-light px-5 py-3 mb-2 is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-6 has-text-weight-semibold">Gender</span>
                    <b-checkbox></b-checkbox>
                </div>
            </section>
            <footer class="modal-card-foot">
                <b-button
                    label="Cancel"
                    @click="$emit('close')" />
                <b-button
                    label="Save as default"
                    type="is-primary" />
            </footer>
        </div>
    </form>
</b-modal>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean
        }
    },

    data() {
        return {
            // Array Options
            positions: [
                'Office Staff',
                'Sales Staff',
                'Accounting Staff',
                'HR',
                'Customer Service',
                'IT Staff',
                'Supervisor',
                'Manager',
            ],
            departments: [
                'IT Department',
                'Sales Department',
                'Accounting Department',
                'HR Department',
                'Gen. Admin',
            ],
            employmentTypes: [
                'Regular',
                'Probationary',
                'Contractual',
                'Part-time',
                'Freelance',
            ],
            batches: [
                'Batch 1',
                'Batch 2',
                'Batch 3',
            ],
            // Selected Option
            selectedPosition: null,
            selectedDepartment: null,
            selectedEmploymentType: null,
            selectedBatch: null,
            // Input Value
            position: '',
            department: '',
            employmentType: '',
            batch: '',
        }
    },

    computed: {
        filteredPositions() {
            return this.filteredDataArray(this.positions, this.position);
        },
        filteredDepartments() {
            return this.filteredDataArray(this.departments, this.department);
        },
        filteredEmploymentTypes() {
            return this.filteredDataArray(this.employmentTypes, this.employmentType);
        },
        filteredBatches() {
            return this.filteredDataArray(this.batches, this.batch);
        },
    },

    methods: {
        filteredDataArray(dataArray, query) {
            return dataArray.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) >= 0
            })
        },
    }
}
</script>