<template>
  <b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form 
      :modal-form="addressTypeForm"
      @submit="update"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Edit Address Type
      </template>
    </modal-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ModalForm: () => import("@/components/Settings/Common/Form.vue"),
  },

  props: {
    active: {
      type: Boolean
    },
  },

  computed: {
    ...mapGetters({
      addressTypeForm: 'addressType/addressTypeForm'
    })
  },

  methods: {
    ...mapActions({
      updateAddressType: 'addressType/update',
    }),
    update(form) {
      this.updateAddressType(form).then(this.$emit('close'));
    }
  }
}
</script>
