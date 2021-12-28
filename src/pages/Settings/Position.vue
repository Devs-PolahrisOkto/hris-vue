<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Positions</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Position Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Position">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="meta.isEmpty ? [] : filteredPositions"
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
    <!-- Position Table -->

    <!-- Start Modals -->
    <add-position-modal
      :active="addPositionModal"
      @close="addPositionModal = !addPositionModal"
    ></add-position-modal>

    <edit-position-modal
      :active="editPositionModal"
      @close="editPositionModal = !editPositionModal"
    ></edit-position-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddPositionModal: () => import('@/components/Settings/Position/AddModal.vue'),
    EditPositionModal: () => import('@/components/Settings/Position/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      searchField: '',
      addPositionModal: false,
      editPositionModal: false,
    };
  },

  computed: {
    ...mapGetters({
      columns: 'position/table/columns',
      list: 'position/table/list',
      meta: 'position/table/meta',
    }),
    filteredPositions () {
      return this.list.filter(position => position
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
      setForm: 'position/setForm',
      getList: 'position/list',
    }),
    add () {
      const position = {
        name: '',
        description: '',
      };
      this.setForm(position);
      this.addPositionModal = true;
    },
    edit (position) {
      this.setForm(position);
      this.editPositionModal = true;
    },
  },
};
</script>
