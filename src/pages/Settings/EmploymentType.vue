<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Employment Types</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Employment Type Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Employment Type">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="meta.isEmpty ? [] : filteredEmploymentTypes"
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
    <!-- Employment Type Table -->

    <!-- Start Modals -->
    <add-employment-type-modal
      :active="addEmploymentTypeModal"
      @close="addEmploymentTypeModal = !addEmploymentTypeModal"
    ></add-employment-type-modal>

    <edit-employment-type-modal
      :active="editEmploymentTypeModal"
      @close="editEmploymentTypeModal = !editEmploymentTypeModal"
    ></edit-employment-type-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddEmploymentTypeModal: () => import('@/components/Settings/EmploymentType/AddModal.vue'),
    EditEmploymentTypeModal: () => import('@/components/Settings/EmploymentType/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      searchField: '',
      addEmploymentTypeModal: false,
      editEmploymentTypeModal: false,
    };
  },

  computed: {
    ...mapGetters({
      columns: 'employmenttype/table/columns',
      list: 'employmenttype/table/list',
      meta: 'employmenttype/table/meta',
    }),
    filteredEmploymentTypes () {
      return this.list.filter(employmentType => employmentType
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
      setForm: 'employmenttype/setForm',
      getList: 'employmenttype/list',
    }),
    add () {
      const employmentType = {
        name: '',
        description: '',
      };
      this.setForm(employmentType);
      this.addEmploymentTypeModal = true;
    },
    edit (employmentType) {
      this.setForm(employmentType);
      this.editEmploymentTypeModal = true;
    },
  },
};
</script>
