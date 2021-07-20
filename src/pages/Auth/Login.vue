<template>
<auth-layout>
    <form class="card" @submit.prevent="handleLogin">
        <header class="card-header has-background-light p-2">
            <p class="card-header-title is-flex is-justify-content-space-between">
                <span>
                    <b-icon size="is-small" icon="lock" class="mr-2"></b-icon>
                    <span class="has-text-weight-medium">Login</span>
                </span>
                <b-button tag="router-link" to="/dashboard" size="is-small">Dashboard</b-button>
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <b-field label="E-Mail Address">
                    <b-input 
                        v-model="form.email" 
                        expanded>
                    </b-input>
                </b-field>
                <b-field label="Password">
                    <b-input type="password"
                        v-model="form.password"
                        password-reveal>
                    </b-input>
                </b-field>
                <b-field>
                    <b-checkbox>Remember Me</b-checkbox>
                </b-field>
            </div>
        </div>
        <footer class="card-footer is-flex is-flex-direction-column p-5">
            <button class="button is-primary has-text-weight-semibold" expanded>LOGIN</button>
            <b-button type="is-ghost" class="has-text-dark mt-2">Forgot Password ?</b-button>
        </footer>
    </form>
</auth-layout>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    components: {
        AuthLayout: () => import("@/components/layouts/AuthLayout.vue"),
    },

    data() {
        return {
            form: {
                email: 'test@test.com',
                password: 'password',
                device_name: "kuyabixby"
            }
        }
    },

    methods: {
        ...mapActions({
            login: 'authentication/login',
        }),
        async handleLogin() {
            await this.login(this.form);
            console.log('logged in')
        }
    }
}
</script>