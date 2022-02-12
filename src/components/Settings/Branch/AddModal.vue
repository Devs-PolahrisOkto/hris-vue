<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(save)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Add Branch
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body">
            <text-field
              v-model="modalForm.name"
              label="Name"
              rules="required"
              mode="eager"
            ></text-field>
            <text-field
              v-model="modalForm.description"
              label="Description"
              rules="required"
              mode="eager"
            ></text-field>
            <select-field
              v-model="modalForm.company_id"
              label="Company"
              rules="required"
              mode="eager"
              :options="companiesState"
            ></select-field>
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-end">
            <b-button
              label="Cancel"
              @click="$emit('close')"
            />
            <b-button
              :disabled="invalid"
              native-type="submit"
              label="Save"
              type="is-primary"
            />
          </footer>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({
      form: 'branch/form',
      companiesState: 'setting/companiesState',
    }),
    modalForm: {
      get () {
        return { ...this.form };
      },
      set (value) {
        return value;
      },
    },
  },

  created () {
    this.getList();
  },

  methods: {
    ...mapActions({
      getList: 'setting/list',
      saveBranch: 'branch/save',
    }),
    save () {
      this.saveBranch(this.modalForm).then(this.$emit('close'));
    },
  },
};
</script>
