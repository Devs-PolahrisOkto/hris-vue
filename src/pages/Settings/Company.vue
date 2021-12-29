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

    <!-- Company Table-->
    <setting-layout>
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
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="meta.isEmpty ? [] : filteredCompanies"
        :striped="meta.isStriped"
        :hoverable="meta.isHoverable"
        :mobile-cards="meta.hasMobileCards"
        :paginated="meta.isPaginated"
        :per-page="meta.perPage"
        :current-page.sync="meta.currentPage"
        :pagination-simple="meta.isPaginationSimple"
        :pagination-position="meta.paginationPosition"
        :default-sort-direction="meta.defaultSortDirection"
        :pagination-rounded="meta.isPaginationRounded"
        :sort-icon="meta.sortIcon"
        :sort-icon-size="meta.sortIconSize"
        :default-sort="meta.defaultSortColumn"
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
          <no-record></no-record>
        </template>
      </b-table>
    </setting-layout>
    <!-- Company Table -->

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
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddCompanyModal: () => import('@/components/Settings/Company/AddModal.vue'),
    EditCompanyModal: () => import('@/components/Settings/Company/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      searchField: '',
      addCompanyModal: false,
      editCompanyModal: false,
    };
  },

  computed: {
    ...mapGetters({
      columns: 'company/table/columns',
      list: 'company/table/list',
      meta: 'company/table/meta',
    }),
    filteredCompanies () {
      return this.list.filter(company => company
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  created () {
    this.getList();
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
};
</script>
