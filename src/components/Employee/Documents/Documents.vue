<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <div class="is-flex px-2">
        <b-icon icon="file-document-outline"></b-icon>
        <h6 class="is-size-6 has-text-weight-light px-3">Documents</h6>
      </div>
      <b-tooltip label="Upload Document">
        <b-button
          type="is-ghost"
          size="is-medium"
          icon-right="plus-circle-outline"
          @click="uploadModal = true"
        />
      </b-tooltip>
    </header>
    <!-- Documents -->
    <template v-for="item in documents">
      <div
        :key="item.id"
        class="is-flex is-justify-content-space-between p-3"
      >
        <div class="is-flex">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="item.file">
            </p>
          </figure>
          <div class="is-flex is-flex-direction-column">
            <h6 class="is-size-6">{{ item.name }}</h6>
            <h6 class="is-size-7 has-text-weight-light">{{ item.lastModified }}</h6>
          </div>
        </div>
        <b-tooltip label="Option" class="is-align-self-center">
          <b-button
            type="is-ghost"
            size="is-medium"
            icon-right="dots-vertical"
          />
        </b-tooltip>
      </div>
    </template>
    <!-- Documents -->
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
    };
  },

  computed: {
    ...mapGetters({
      documents: 'employee/selected/documents',
    }),
  },

  components: {
    UploadModal: () => import('@/components/Employee/Documents/UploadModal.vue'),
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
