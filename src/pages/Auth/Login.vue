<template>
  <auth-layout>
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form class="card" @submit.prevent="passes(handleLogin)">
        <header class="card-header has-background-light p-2">
          <p class="card-header-title">
            <span>
              <b-icon size="is-small" icon="lock" class="mr-2"></b-icon>
              <span class="has-text-weight-medium">Login</span>
            </span>
          </p>
        </header>
        <div class="card-content">
          <request-error-messages
            v-if="hasErrors"
            :errors="errors"
          ></request-error-messages>
          <div class="content">
            <text-field
              v-model="form.email"
              label="Email"
              rules="required"
              mode="eager"
              field-class="mb-5"
            ></text-field>
            <text-field
              v-model="form.password"
              label="Password"
              type="password"
              rules="required"
              mode="eager"
              field-class="mb-5"
            ></text-field>
          </div>
        </div>
        <footer class="card-footer is-flex is-flex-direction-column p-5">
          <button
            class="button is-primary has-text-weight-semibold"
            :disabled="invalid"
            expanded
          >
            LOGIN
          </button>
          <b-button
            type="is-ghost"
            class="has-text-dark mt-2"
          >
            Forgot Password ?
          </b-button>
        </footer>
      </form>
    </ValidationObserver>
  </auth-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    AuthLayout: () => import('@/layouts/AuthLayout.vue'),
    RequestErrorMessages: () => import('@/components/Notification/RequestErrorMessages.vue'),
  },

  data () {
    return {
      form: {
        email: '',
        password: '',
        device_name: 'kuyabixby',
      },
    };
  },

  computed: {
    ...mapGetters({
      hasErrors: 'authentication/hasErrors',
      errors: 'authentication/errors',
    }),
  },

  methods: {
    ...mapActions({
      login: 'authentication/login',
    }),
    async handleLogin () {
      const status = await this.login(this.form);
      if (status) { this.$router.push({ name: 'Dashboard' }); }
    },
  },
};
</script>
