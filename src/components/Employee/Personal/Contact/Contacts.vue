<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <div class="is-flex px-2">
        <b-icon icon="phone-log-outline"></b-icon>
        <h6 class="is-size-6 has-text-weight-light px-3">Contacts</h6>
      </div>
      <b-tooltip label="Add Contact">
        <b-button
          type="is-ghost"
          size="is-medium"
          icon-right="plus-circle-outline"
          @click="add"
        />
      </b-tooltip>
    </header>
    <!-- Contacts -->
    <template v-if="hasContacts">
      <div
        v-for="item in contacts"
        :key="item.id"
        class="p-3"
      >
        <div class="is-flex ">
          <h6 class="is-size-6 has-text-weight-medium">{{ item.name }}</h6>
          <a
            class="icon is-clickable mx-2"
            @click="edit(item)"
          >
            <i class="mdi mdi-pencil"></i>
          </a>
        </div>
        <h6 class="is-size-6">{{ item.description }}</h6>
      </div>
    </template>
    <template v-else>
      <no-record width="200" height="200"></no-record>
    </template>
    <!-- Contacts -->
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
    ModalForm: () => import('@/components/Employee/Personal/Contact/ModalForm.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      modalState: false,
      formTitle: 'Add Contact',
      formData: {},
    };
  },

  computed: {
    ...mapGetters({
      hasContacts: 'employee/selected/hasContacts',
      contacts: 'employee/selected/contacts',
    }),
  },

  methods: {
    add () {
      this.formTitle = 'Add Contact';
      this.formData = {};
      this.modalState = true;
    },
    edit (item) {
      this.formTitle = 'Edit Contact';
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
