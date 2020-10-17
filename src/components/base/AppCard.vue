<template>
  <div class="card">
        <div class="card-header">
            <slot name="code"></slot>
        </div>
        <div class="card-body">
            <span class="tag tag-teal">{{lang}}</span>
            <!-- <p>Numquam nemo magni temporibus quo reiciendis minima nostrum voluptas deserunt obcaecati exercitationem?</p> -->
            <div class="card-user" style="margin-top: 10px">
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        lang: {
            type: String,
            default: ''
        },
        fileName: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
    @import '../styles/card.css';
</style>