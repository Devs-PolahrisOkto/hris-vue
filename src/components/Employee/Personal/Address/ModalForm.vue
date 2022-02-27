<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
    <form @submit.prevent="passes(submit)">
      <div class="modal-card">
        <header class="modal-card-head is-flex is-justify-content-space-between">
          <h6 class="is-size-6 has-text-weight-bold">{{ title }}</h6>
          <button
            type="button"
            class="delete"
            @click="$emit('close')"
          ></button>
        </header>
        <section class="modal-card-body py-5">
          <div class="columns">
            <div class="column is-6">
              <text-field
                v-model="form.name"
                label="House/Bldg No."
                rules="required"
                mode="eager"
              ></text-field>
            </div>
            <div class="column is-6">
              <text-field
                v-model="form.address1"
                label="Street"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <text-field
                v-model="form.barangay_id"
                label="Barangay"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
            <div class="column is-6">
              <text-field
                v-model="form.province_id"
                label="Province"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <text-field
                v-model="form.region_id"
                label="Region"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
            <div class="column is-6">
              <text-field
                v-model="form.state_id"
                label="City"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <text-field
                v-model="form.country_id"
                label="Country"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
            <div class="column is-6">
              <select-field
                v-model="form.address_type_id.id"
                label="Type"
                rules="required"
                mode="eager"
                :options="addressTypesState"
              ></select-field>
            </div>
          </div>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';
import AddressRepresentation from '@/api/representations/AddressRepresentation';

export default {
  props: {
    title: {
      type: String,
      default: 'Address',
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      addressForm: 'address/form',
      addressTypesState: 'setting/addressTypesState',
    }),
    form: {
      get () {
        const form = isEmpty(this.formData) ? this.addressForm : this.formData;
        return new AddressRepresentation(form);
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    ...mapActions({
      save: 'address/save',
      update: 'address/update',
    }),
    submit () {
      ((this.form.asPayload.id) ? this.update(this.form.asPayload) : this.save(this.form.asPayload)).then(this.$emit('close'));
    },
  },
};
</script>
