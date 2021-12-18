<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="documentTypeForm"
      @submit="update"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Edit Document Type
      </template>
    </modal-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ModalForm: () => import('@/components/Settings/Common/Form.vue'),
  },

  props: {
    active: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({
      documentTypeForm: 'documentType/documentTypeForm',
    }),
  },

  methods: {
    ...mapActions({
      updateDocumentType: 'documentType/update',
    }),
    update (form) {
      this.updateDocumentType(form).then(this.$emit('close'));
    },
  },
};
</script>
