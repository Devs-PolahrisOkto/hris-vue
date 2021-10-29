<template>
<main-layout>

<!-- Start Breadcrumb -->
<nav class="breadcrumb px-5" aria-label="breadcrumbs">
  <ul class="px-3 pt-3">
    <li><a href="#">Admin</a></li>
    <li class="is-active"><a href="#" aria-current="page">Civil Statuses</a></li>
  </ul>
</nav>
<!-- End Breadcrumb -->

<div class="columns">
  <div class="column is-9">
    <div class="container is-fluid pr-0">
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Civil Status">
          <b-button 
            icon-right="plus" 
            class="mr-3" 
            @click="add" 
          />
        </b-tooltip>
      </div>
      <b-table
        :data="isEmpty ? [] : filteredCivilStatuses"
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
        <b-table-column field="option" v-slot="props" width="100" centered>
          <b-button 
            size="is-small" 
            type="is-primary" 
            icon-right="pencil" 
            @click="edit(props.row)"
          />
        </b-table-column>
        <template #empty>
          <div class="has-text-centered">No records</div>
        </template>
      </b-table>
    </div>
  </div>
  <div class="column is-3">

  </div>

  <!-- Start Modals -->
  <add-civil-status-modal 
    :active="addCivilStatusModal"
    @close="addCivilStatusModal = !addCivilStatusModal"
  ></add-civil-status-modal>

  <edit-civil-status-modal 
    :active="editCivilStatusModal"
    @close="editCivilStatusModal = !editCivilStatusModal"
  ></edit-civil-status-modal>
  <!-- End Modals -->
</div>

</main-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {
    MainLayout: () => import("@/layouts/MainLayout.vue"),
    AddCivilStatusModal: () => import("@/components/Settings/CivilStatus/AddModal.vue"),
    EditCivilStatusModal: () => import("@/components/Settings/CivilStatus/EditModal.vue"),
  },

  data() {
    return {
      layout: 'table',
      columns: [
        { title: 'Name', field: 'name', visible: true },
        { title: 'Description', field: 'description', visible: true },
      ],
      isEmpty: false,
      isStriped: false,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: false,  
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      addCivilStatusModal: false,
      editCivilStatusModal: false,
      searchField: ''
    }
  },

  computed: {
    ...mapGetters({
      civilStatuses: 'civilStatus/list'
    }),
    filteredCivilStatuses() {
      return this.civilStatuses.filter(civilStatus => {
        return civilStatus.name.toLowerCase().includes(this.searchField.toLowerCase());
      });
    },
  },

  methods: {
    ...mapActions({
      setForm: 'civilStatus/setForm',
      getList: 'civilStatus/list',
    }),
    add() {
      const civilStatus = {
        name: '',
        description: ''
      }
      this.setForm(civilStatus);
      this.addCivilStatusModal = true;
    },
    edit(civilStatus) {
      this.setForm(civilStatus);
      this.editCivilStatusModal = true;
    }
  },

  created() {
    this.getList();
  }
}
</script>