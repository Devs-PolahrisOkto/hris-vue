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
                    <b-icon icon="filter" size="is-small"></b-icon> 
                    <h6 class="is-size-6 has-text-weight-bold px-3">Filter</h6>
                </h6>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <form class="py-4">
                    <b-field label="Position" label-position="on-border" class="mb-5">
                        <b-autocomplete
                            v-model="position"
                            :data="filteredPositions"
                            placeholder="e.g. Accounting Staff"
                            icon="magnify"
                            clearable
                            @select="option => selectedPosition = option">
                            <template #empty>No results found</template>
                        </b-autocomplete>
                    </b-field>
                    <b-field label="Department" label-position="on-border" class="mb-5">
                        <b-autocomplete
                            v-model="department"
                            :data="filteredDepartments"
                            placeholder="e.g. Accounting Department"
                            icon="magnify"
                            clearable
                            @select="option => selectedDepartment = option">
                            <template #empty>No results found</template>
                        </b-autocomplete>
                    </b-field>
                    <b-field label="Employment Type" label-position="on-border" class="mb-5">
                        <b-autocomplete
                            v-model="employmentType"
                            :data="filteredEmploymentTypes"
                            placeholder="e.g. Probationary"
                            icon="magnify"
                            clearable
                            @select="option => selectedEmploymentType = option">
                            <template #empty>No results found</template>
                        </b-autocomplete>
                    </b-field>
                    <b-field label="Batch" label-position="on-border" class="mb-5">
                        <b-autocomplete
                            v-model="batch"
                            :data="filteredBatches"
                            placeholder="e.g. Batch 1"
                            icon="magnify"
                            clearable
                            @select="option => selectedBatch = option">
                            <template #empty>No results found</template>
                        </b-autocomplete>
                    </b-field>
                    <button class="button is-primary">Filter Employee</button>
                </form>
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