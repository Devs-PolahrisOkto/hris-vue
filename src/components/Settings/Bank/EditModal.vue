<template>
  <b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form 
      :modal-form="bankForm"
      @submit="update"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Edit Bank
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
      bankForm: 'bank/bankForm'
    })
  },

  methods: {
    ...mapActions({
      updateBank: 'bank/update',
    }),
    update(form) {
      this.updateBank(form).then(this.$emit('close'));
    }
  }
}
</script>
