<template>
<b-navbar>
    <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <h6 class="is-size-6 has-text-weight-bold">HRIS</h6>
        </b-navbar-item>
    </template>
    <template #start>
    </template>

    <template #end> 
        <b-navbar-item>
            <b-icon
                class="px-5"
                icon="bell"
                size="is-small">
            </b-icon>
        </b-navbar-item>
        <b-navbar-dropdown>
            <template #label>
                <b-icon
                    class="px-5"
                    icon="account-circle"
                    size="is-small">
                </b-icon>
                John Doe
            </template>
            <b-navbar-item href="#">
                <b-icon
                    class="px-5"
                    icon="account"
                    size="is-small">
                </b-icon>
                My Profile
            </b-navbar-item>
            <b-navbar-item href="#">
                <b-icon
                    class="px-5"
                    icon="cog"
                    size="is-small">
                </b-icon>
                Settings
            </b-navbar-item>
            <b-navbar-item href="#">
                <b-icon
                    class="px-5"
                    icon="logout"
                    size="is-small">
                </b-icon>
                Logout
            </b-navbar-item>
        </b-navbar-dropdown>
    </template>
</b-navbar>
</template>