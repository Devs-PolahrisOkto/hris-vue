<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Documents</h6>
      <b-button
        size="is-small"
        icon-right="plus"
        @click="uploadModal = true"
      />
    </header>
    <b-table
      :data="isEmpty ? [] : documents"
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
      default-sort="school"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        v-slot="props" field="file"
        label="File"
        sortable
      >
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="props.row.file">
          </p>
        </figure>
      </b-table-column>

      <b-table-column
        v-slot="props" field="name"
        label="Name"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="description"
        label="Description"
        sortable
      >
        {{ props.row.description }}
      </b-table-column>

      <template #empty>
        <no-record :width="160" :height="160"></no-record>
      </template>
    </b-table>
    <!-- Upload Modal -->
    <upload-modal
      :active="uploadModal"
      @close="uploadModal = !uploadModal"
    ></upload-modal>
    <!-- Upload Modal -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      uploadModal: false,
      isEmpty: false,
      isStriped: true,
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
    };
  },

  computed: {
    ...mapGetters({
      documents: 'employee/selected/documents',
    }),
  },

  components: {
    UploadModal: () => import('@/components/Employee/Documents/UploadModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },
};
</script>

<style lang="scss" scoped>
/deep/ .table td,
/deep/ .table th {
    border: none;
}

/deep/ .pagination {
    padding-bottom: 10px;
    padding-right: 10px;
}
</style>
