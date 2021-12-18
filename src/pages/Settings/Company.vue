<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Companies</a></li>
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
            <b-tooltip label="Add Company">
              <b-button
                icon-right="plus"
                class="mr-3"
                @click="add"
              />
            </b-tooltip>
          </div>
          <b-table
            :data="isEmpty ? [] : filteredCompanies"
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
                v-slot="props"
                :label="column.title"
                :field="column.field"
                :visible="column.visible"
                sortable
              >
                {{ props.row[column.field] }}
              </b-table-column>
            </template>
            <b-table-column
              v-slot="props" field="option"
              width="100"
              centered
            >
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
      <div class="column is-3"></div>

      <!-- Start Modals -->
      <add-company-modal
        :active="addCompanyModal"
        @close="addCompanyModal = !addCompanyModal"
      ></add-company-modal>

      <edit-company-modal
        :active="editCompanyModal"
        @close="editCompanyModal = !editCompanyModal"
      ></edit-company-modal>
      <!-- End Modals -->
    </div>
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddCompanyModal: () => import('@/components/Settings/Company/AddModal.vue'),
    EditCompanyModal: () => import('@/components/Settings/Company/EditModal.vue'),
  },

  data () {
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
      addCompanyModal: false,
      editCompanyModal: false,
      searchField: '',
    };
  },

  computed: {
    ...mapGetters({
      companies: 'company/list',
    }),
    filteredCompanies () {
      return this.companies.filter(company => company
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  methods: {
    ...mapActions({
      setForm: 'company/setForm',
      getList: 'company/list',
    }),
    add () {
      const company = {
        name: '',
        description: '',
      };
      this.setForm(company);
      this.addCompanyModal = true;
    },
    edit (company) {
      this.setForm(company);
      this.editCompanyModal = true;
    },
  },

  created () {
    this.getList();
  },
};
</script>
