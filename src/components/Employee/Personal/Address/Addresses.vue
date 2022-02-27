<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Addresses</h6>
      <b-button
        size="is-small"
        icon-right="plus"
        @click="add"
      />
    </header>
    <!-- Addresses -->
    <template v-for="item in addresses">
      <div
        :key="item.id"
        class="p-3"
      >
        <h6 class="is-size-6 has-text-weight-medium">{{ item.address }}</h6>
        <h6 class="is-size-6">{{ item.type }}</h6>
        <b-button
          size="is-small"
          icon-right="pencil"
          @click="edit(item)"
        />
      </div>
    </template>
    <!-- Addresses -->
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
    ModalForm: () => import('@/components/Employee/Personal/Address/ModalForm.vue'),
  },

  data () {
    return {
      modalState: false,
      formTitle: 'Add Address',
      formData: {},
    };
  },

  computed: {
    ...mapGetters({
      addresses: 'employee/selected/addresses',
    }),
  },

  methods: {
    add () {
      this.formTitle = 'Add Address';
      this.formData = {};
      this.modalState = true;
    },
    edit (item) {
      this.formTitle = 'Edit Address';
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
