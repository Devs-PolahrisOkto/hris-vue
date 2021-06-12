<template>
<main-layout>

<!-- Start Breadcrumb -->
<nav class="breadcrumb px-5" aria-label="breadcrumbs">
  <ul class="px-3 pt-3">
    <li><a href="#">Admin</a></li>
    <li class="is-active"><a href="#" aria-current="page">Employees</a></li>
  </ul>
</nav>
<!-- End Breadcrumb -->

<!-- Start Active Employees -->
<div class="container is-fluid my-5">
    <div class="is-flex is-justify-content-space-between py-2">
        <b-input 
            placeholder="Search..."
            type="search"
            icon="magnify">
        </b-input>
        <div>
            <b-tooltip label="Filter">
                <b-button 
                    icon-right="filter" 
                    class="mr-3" 
                    @click="isFilterModalActive = !isFilterModalActive" />
            </b-tooltip>
            <b-tooltip label="Layout">
                <b-button 
                    icon-right="grid-large" 
                    class="mr-1" 
                    @click="isLayoutModalActive = !isLayoutModalActive" />
            </b-tooltip>
            <b-tooltip label="Columns">
                <b-button 
                    icon-right="table-column" 
                    @click="isColumnModalActive = !isColumnModalActive" />
            </b-tooltip>
        </div>
    </div>

    <!-- Table Layout -->
    <div v-show="layout === 'table'">
        <b-table
            :data="isEmpty ? [] : data"
            :striped="isStriped"
            :hoverable="isHoverable"
            :mobile-cards="hasMobileCards"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :pagination-rounded="isPaginationRounded"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
        >

            <b-table-column field="id" width="40">
                <figure class="image is-24x24">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/24x24.png">
                </figure>
            </b-table-column>

            <template v-for="(column, index) in columns">
                <b-table-column
                    :key="index"
                    :label="column.title"
                    :field="column.field"
                    :visible="column.visible"
                    v-slot="props"
                    sortable
                >
                    {{ props.row[column.field] }}
                </b-table-column>
            </template>

            <b-table-column field="option">
                <b-button size="is-small" type="is-primary" icon-right="eye" />
            </b-table-column>

            <template #empty>
                <div class="has-text-centered">No records</div>
            </template>

        </b-table>
    </div>
    <!-- Table Layout -->

    <!-- Grid Layout -->
    <div v-show="layout === 'grid'">
        <div class="columns is-flex is-flex-wrap-wrap">
            <template v-for="(item, index) in data">
                <div class="column is-6-desktop is-12-tablet is-12-mobile" :key="index">
                    <article class="media has-background-white p-4">
                        <figure class="media-left">
                            <p class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <h5 class="is-size-5 has-text-weight-semibold">{{ item.name }}</h5>
                            <h6 class="is-size-6 has-text-grey">{{ item.position }}</h6>
                            <h6 class="is-size-6">{{ item.employment_type }}</h6>
                            <h6 class="is-size-6">{{ item.department }}</h6>
                        </div>
                        <div class="media-right">
                            <b-button size="is-small" type="is-primary" icon-right="eye" />
                        </div>
                    </article>
                </div>
            </template>
        </div>
    </div>
    <!-- Grid Layout -->

</div>
<!-- End Active Employees -->

<!-- Start Modals -->
<filter-modal
    :active="isFilterModalActive"
    @close="isFilterModalActive = !isFilterModalActive"
></filter-modal>

<column-modal
    :active="isColumnModalActive"
    :columns="columns"
    @close="isColumnModalActive = !isColumnModalActive"
></column-modal>

<layout-modal
    :active="isLayoutModalActive"
    :layout="layout"
    @change-layout="changeLayout"
    @close="isLayoutModalActive = !isLayoutModalActive"
></layout-modal> 

<!-- End Modals -->

</main-layout>
</template>

<script>

export default {
    components: {
        MainLayout: () => import("@/components/layouts/MainLayout.vue"),
        FilterModal: () => import("@/pages/Employees/FilterModal.vue"),
        ColumnModal: () => import("@/pages/Employees/ColumnModal.vue"),
        LayoutModal: () => import("@/pages/Employees/LayoutModal.vue"),
    },

    data() {
        return {
            layout: 'table',
            data: [
                { 'id': 1, 'name': 'Jesse Simmons', 'position': 'IT Staff', 'department': 'IT Department', 'employment_type': 'Regular' },
                { 'id': 2, 'name': 'John Jacobs', 'position': 'Accounting Staff', 'department': 'Accounting Department', 'employment_type': 'Regular' },
                { 'id': 3, 'name': 'Tina Gilbert', 'position': 'Tax Specialist', 'department': 'Accounting Department', 'employment_type': 'Regular' },
                { 'id': 4, 'name': 'Clarence Flores', 'position': 'Accounts Payable', 'department': 'Accounting Department', 'employment_type': 'Probationary' },
                { 'id': 5, 'name': 'Anne Lee', 'position': 'Sales Staff', 'department': 'Sales Department', 'employment_type': 'Regular' },
                { 'id': 6, 'name': 'Bill Gates', 'position': 'IT Programmer', 'department': 'IT Department', 'employment_type': 'Probationary' },
                { 'id': 7, 'name': 'Elon Musk', 'position': 'Software Engineer', 'department': 'IT Department', 'employment_type': 'Probationary' },
                { 'id': 8, 'name': 'Steve Jobs', 'position': 'Sales Specialist', 'department': 'Sales Department', 'employment_type': 'Probationary' },
                { 'id': 9, 'name': 'Warren Buffett', 'position': 'Accountant', 'department': 'Accounting Department', 'employment_type': 'Regular' },
                { 'id': 10, 'name': 'Jeff Bezos', 'position': 'Sales Manager', 'department': 'Sales Department', 'employment_type': 'Regular' },
            ],
            columns: [
                { title: 'ID', field: 'id', visible: false },
                { title: 'Name', field: 'name', visible: true },
                { title: 'Position', field: 'position', visible: true },
                { title: 'Department', field: 'department', visible: true },
                { title: 'Employment Type', field: 'employment_type', visible: true }
            ],
            isEmpty: false,
            isStriped: false,
            isHoverable: true,
            hasMobileCards: true,
            isPaginated: true,  
            isPaginationSimple: true,
            isPaginationRounded: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 10,
            // Modals
            isFilterModalActive: false,
            isColumnModalActive: false,
            isLayoutModalActive: false,
        }
    },

    methods: {
        changeLayout(requestedLayout) {
            this.layout = requestedLayout;
        }
    }
}
</script>