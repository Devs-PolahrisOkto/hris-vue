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
              <template v-if="item.type === 'docx'">
                <ms-new-word-file-illustration></ms-new-word-file-illustration>
              </template>
              <template v-else-if="item.type === 'doc'">
                <ms-old-word-file-illustration></ms-old-word-file-illustration>
              </template>
              <template v-else-if="item.type === 'xlsx'">
                <ms-new-excel-file-illustration></ms-new-excel-file-illustration>
              </template>
              <template v-else-if="item.type === 'xls'">
                <ms-old-excel-file-illustration></ms-old-excel-file-illustration>
              </template>
              <template v-else-if="item.type === 'pdf'">
                <pdf-file-illustration></pdf-file-illustration>
              </template>
              <template v-else-if="isImageFile(item.type)">
                <img :src="item.file">
              </template>
              <template v-else>
                <default-file-type-illustration></default-file-type-illustration>
              </template>
            </p>
          </figure>
          <div class="is-flex is-flex-direction-column">
            <h6 class="is-size-6">{{ item.name }}</h6>
            <h6 class="is-size-7 has-text-weight-light">{{ item.lastModified }}</h6>
          </div>
        </div>
        <b-tooltip label="Option" class="is-align-self-center">
          <b-dropdown aria-role="list" position="is-bottom-left">
            <template #trigger>
              <b-button
                type="is-ghost"
                size="is-medium"
                icon-right="dots-vertical"
              />
            </template>
            <b-dropdown-item
              aria-role="listitem"
              @click="deleteDocument(item.id)"
            >Delete</b-dropdown-item>
          </b-dropdown>
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
import { mapActions, mapGetters } from 'vuex';

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
    MsNewWordFileIllustration: () => import('@/components/Illustrations/MsNewWordFileIllustration.vue'),
    MsOldWordFileIllustration: () => import('@/components/Illustrations/MsOldWordFileIllustration.vue'),
    MsNewExcelFileIllustration: () => import('@/components/Illustrations/MsNewExcelFileIllustration.vue'),
    MsOldExcelFileIllustration: () => import('@/components/Illustrations/MsOldExcelFileIllustration.vue'),
    PdfFileIllustration: () => import('@/components/Illustrations/PdfFileIllustration.vue'),
    DefaultFileTypeIllustration: () => import('@/components/Illustrations/DefaultFileTypeIllustration.vue'),
  },

  methods: {
    ...mapActions({
      delete: 'document/delete',
    }),
    isImageFile (type) {
      return [ 'jpeg', 'jpg', 'png' ].some(item => item === type);
    },
    deleteDocument (id) {
      this.delete(id);
    },
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
