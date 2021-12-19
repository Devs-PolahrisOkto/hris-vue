<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Document Types</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Document Type Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Document Type">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="isEmpty ? [] : filteredDocumentTypes"
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
    </setting-layout>
    <!-- Document Type Table -->

    <!-- Start Modals -->
    <add-document-type-modal
      :active="addDocumentTypeModal"
      @close="addDocumentTypeModal = !addDocumentTypeModal"
    ></add-document-type-modal>

    <edit-document-type-modal
      :active="editDocumentTypeModal"
      @close="editDocumentTypeModal = !editDocumentTypeModal"
    ></edit-document-type-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddDocumentTypeModal: () => import('@/components/Settings/DocumentType/AddModal.vue'),
    EditDocumentTypeModal: () => import('@/components/Settings/DocumentType/EditModal.vue'),
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
      addDocumentTypeModal: false,
      editDocumentTypeModal: false,
      searchField: '',
    };
  },

  computed: {
    ...mapGetters({
      documentTypes: 'documentType/list',
    }),
    filteredDocumentTypes () {
      return this.documentTypes.filter(documentType => documentType
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  methods: {
    ...mapActions({
      setForm: 'documentType/setForm',
      getList: 'documentType/list',
    }),
    add () {
      const documentType = {
        name: '',
        description: '',
      };
      this.setForm(documentType);
      this.addDocumentTypeModal = true;
    },
    edit (documentType) {
      this.setForm(documentType);
      this.editDocumentTypeModal = true;
    },
  },

  created () {
    this.getList();
  },
};
</script>
