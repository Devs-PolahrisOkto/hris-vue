<template>
<div class="is-fullheight py-4">
    <div class="columns mt-5 p-5">
        <div class="column is-6-desktop is-tablet-12 is-12-mobile p-5">
            <h2 class="is-size-2 has-text-weight-bold">POLAHRIS</h2>
            <div class="is-size-5 has-text-justified py-5">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 
                'Content here, content here', making it look like readable English.
            </div>
            <b-button class="button is-primary px-6 my-5" tag="router-link" to="/login">
                <span class="has-text-weight-bold px-5">Log In</span>
            </b-button>
        </div>
        <div class="column is-6-desktop is-tablet-12 is-12-mobile is-hidden-mobile">
            <div class="has-text-centered p-5">
                <img src="./../../assets/calculator.svg" alt="calculator" class="calculator">
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.is-fullheight {
    height: 100vh;
    background-color: #fff;
}
.calculator {
    width: 520px;
}
</style>