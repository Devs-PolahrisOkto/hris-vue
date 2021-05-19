<template>
<div class="card">
    <header class="has-background-light is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
        <h6 class="has-text-weight-medium has-text-grey">{{ data.notification }}</h6>
        <b-button size="is-small" icon-right="cog" />
    </header>
    <div class="py-4 px-5">
        <div class="is-flex is-justify-content-space-between is-align-items-center">
            <div>
                <h5 class="is-size-5">{{ data.title }}</h5>
                <h3 class="is-size-3 has-text-weight-semibold">{{ data.total }}</h3>
            </div>
            <b-icon size="is-large" :icon="data.icon"></b-icon>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
        },
    },
}
</script>