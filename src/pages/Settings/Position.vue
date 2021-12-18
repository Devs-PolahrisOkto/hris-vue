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
            <b-tooltip label="Add Position">
              <b-button
                icon-right="plus"
                class="mr-3"
                @click="add"
              />
            </b-tooltip>
          </div>
          <b-table
            :data="isEmpty ? [] : filteredPositions"
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
      <add-position-modal
        :active="addPositionModal"
        @close="addPositionModal = !addPositionModal"
      ></add-position-modal>

      <edit-position-modal
        :active="editPositionModal"
        @close="editPositionModal = !editPositionModal"
      ></edit-position-modal>
      <!-- End Modals -->
    </div>
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddPositionModal: () => import('@/components/Settings/Position/AddModal.vue'),
    EditPositionModal: () => import('@/components/Settings/Position/EditModal.vue'),
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
      addPositionModal: false,
      editPositionModal: false,
      searchField: '',
    };
  },

  computed: {
    ...mapGetters({
      positions: 'position/list',
    }),
    filteredPositions () {
      return this.positions.filter(position => position
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
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

  created () {
    this.getList();
  },
};
</script>
