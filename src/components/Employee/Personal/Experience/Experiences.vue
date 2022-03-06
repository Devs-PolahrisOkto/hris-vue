<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Experiences</h6>
      <b-button
        size="is-small"
        icon-right="plus"
        @click="add"
      />
    </header>
    <!-- Experiences -->
    <template v-for="item in experiences">
      <div
        :key="item.id"
        class="p-3"
      >
        <div class="is-flex ">
          <h6 class="is-size-6 has-text-weight-medium">{{ item.company }}</h6>
          <a
            class="icon is-clickable mx-2"
            @click="edit(item)"
          >
            <i class="mdi mdi-pencil"></i>
          </a>
        </div>
        <h6 class="is-size-6">{{ item.role }}</h6>
        <h6 class="is-size-6">{{ item.inclusiveDates }}</h6>
      </div>
    </template>
    <!-- Experiences -->
    <!-- Start Modals -->
    <b-modal
      v-model="modalState"
      :width="800"
      :can-cancel="['x']"
    >
      <modal-form
        :title="formTitle"
        :form-data="formData"
        @close="modalState = false"
      ></modal-form>
    </b-modal>
    <!-- End Modals -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    ModalForm: () => import('@/components/Employee/Personal/Experience/ModalForm.vue'),
  },

  data () {
    return {
      modalState: false,
      formTitle: 'Add Experience',
      formData: {},
    };
  },

  computed: {
    ...mapGetters({
      experiences: 'employee/selected/experiences',
    }),
  },

  methods: {
    add () {
      this.formTitle = 'Add Experience';
      this.formData = {};
      this.modalState = true;
    },
    edit (item) {
      this.formTitle = 'Edit Experience';
      this.formData = item;
      this.modalState = true;
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
