<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="form"
      @submit="save"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Add Document Type
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
      form: 'documenttype/form',
    }),
  },

  methods: {
    ...mapActions({
      saveDocumentType: 'documenttype/save',
    }),
    save (form) {
      this.saveDocumentType(form).then(this.$emit('close'));
    },
  },
};
</script>
