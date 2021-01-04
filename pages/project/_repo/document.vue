<template>
    <div>
        <h1 class="title">{{repo.title}} document</h1>
        <div v-if="loading">
            <b-skeleton width="20%"></b-skeleton>
            <div style="margin: 1rem 0">
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
            <b-skeleton width="100%"></b-skeleton>
            <b-skeleton width="40%"></b-skeleton>
            <b-skeleton height="150px"></b-skeleton>
            <b-skeleton width="40%"></b-skeleton>
            <b-skeleton width="40%"></b-skeleton>
            <b-skeleton height="150px"></b-skeleton>
            <b-skeleton width="60%"></b-skeleton>
            <b-skeleton width="40%"></b-skeleton>
            <b-skeleton height="200px"></b-skeleton>
        </div>
        <div v-if="readme && !loading" class="content" v-html="readme"></div>
    </div>
</template>

<script>
    const showdown = require('showdown');
    export default {
        name: "document",
        props: {
            repo: {}
        },
        data() {
            return {
                readme: null,
                loading: true
            }
        },
        async created() {
            await this.$axios.$get(`https://raw.githubusercontent.com/${this.repo.meta['full_name']}/master/README.md`).then(res => {
                const converter = new showdown.Converter({emoji: true});
                this.readme = converter.makeHtml(res);
                this.loading = false;
            }).catch(e => {
                this.readme = null;
                this.loading = false;
            });
        }
    }
</script>

<style scoped>

</style>
