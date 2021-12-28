<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Departments</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Department Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Department">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="meta.isEmpty ? [] : filteredDepartments"
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
    <!-- Department Table -->

    <!-- Start Modals -->
    <add-department-modal
      :active="addDepartmentModal"
      @close="addDepartmentModal = !addDepartmentModal"
    ></add-department-modal>

    <edit-department-modal
      :active="editDepartmentModal"
      @close="editDepartmentModal = !editDepartmentModal"
    ></edit-department-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddDepartmentModal: () => import('@/components/Settings/Department/AddModal.vue'),
    EditDepartmentModal: () => import('@/components/Settings/Department/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      searchField: '',
      addDepartmentModal: false,
      editDepartmentModal: false,
    };
  },

  computed: {
    ...mapGetters({
      columns: 'department/table/columns',
      list: 'department/table/list',
      meta: 'department/table/meta',
    }),
    filteredDepartments () {
      return this.list.filter(department => department
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
      setForm: 'department/setForm',
      getList: 'department/list',
    }),
    add () {
      const department = {
        name: '',
        description: '',
      };
      this.setForm(department);
      this.addDepartmentModal = true;
    },
    edit (department) {
      this.setForm(department);
      this.editDepartmentModal = true;
    },
  },
};
</script>
