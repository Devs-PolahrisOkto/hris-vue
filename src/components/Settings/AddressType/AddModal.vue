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
        Add Address Type
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
      form: 'addresstype/form',
    }),
  },

  methods: {
    ...mapActions({
      saveAddressType: 'addresstype/save',
    }),
    save (form) {
      this.saveAddressType(form).then(this.$emit('close'));
    },
  },
};
</script>
