<template>
    <div class="container">
        <h1 class="title">{{repo.title}} contributors</h1>
        <div v-if="repo.meta['contributors']" class="columns is-multiline">
            <div class="column is-3" v-for="c in repo.meta['contributors']" :key="c.id">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <div class="image is-64x64" v-bind:class="{'is-empty': c.avatar_url === null}">
                                    <img v-if="c.avatar_url" :src="c.avatar_url" :alt="c.full_name">
                                </div>
                            </div>
                            <div class="media-content is-bold">{{c.full_name || c.username}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contributors",
        props: {
            repo: {}
        }
    }
</script>

<style scoped>

</style>
