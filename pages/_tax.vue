<template>
    <div class="wrapper">
        <section class="hero" style="border-bottom: 1px solid #e1e4e8;">
            <div class="hero-body">
                <div class="container">
                    <div class="media" style="margin-bottom: 1.5rem">
                        <div class="media-left">
                            <div class="image is-96x96">
                                <img src="/logo.png" alt="Logo">
                            </div>
                        </div>
                        <div class="media-content">
                            <h1 class="title is-uppercase is-spaced">{{ title }}</h1>
                            <p class="subtitle">{{ description }}</p>
                        </div>
                    </div>
                    <div class="field has-addons">
                        <div class="control">
                            <span class="button">
                                <x-icon name="search"></x-icon>
                            </span>
                        </div>
                        <div class="control">
                            <input class="input" type="text" placeholder="Find a repository"/>
                        </div>
                    </div>
                    <div class="buttons">
                        <n-link v-for="ta in taxonomyRES.results" :to="`/${ta['term'].slug}`" class="button"
                                :key="ta.id">
                            <x-icon class="is-small" name="pound"></x-icon>
                            <span>{{ ta['term'].title }}</span>
                        </n-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="section is-light">
            <div class="container">
                <div class="field">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="dropdown is-hoverable" v-bind:class="{'is-active': isActive}"
                                 @click="isActive = !isActive">
                                <div class="dropdown-trigger">
                                    <button class="button is-text" aria-haspopup="true"
                                            aria-controls="dropdown-menu">
                                        <x-icon name="down"></x-icon>
                                        <span>{{ capitalizeFirst(query.order_by) }}</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <n-link
                                            v-for="i in orders" :key="i"
                                            @click.native="selectOrder(i)"
                                            :to="`${pathOder}=${i.toLowerCase()}`"
                                            class="dropdown-item"
                                            v-bind:class="{'is-active': i.toLowerCase() === query.order_by}"
                                        >{{ i }}
                                        </n-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="level-right">
                            <small>{{ response.count }} Results</small>
                        </div>
                    </div>
                </div>
                <div class="columns is-variable is-2 is-multiline">
                    <div class="column is-6" v-for="(repo, i) in response.results" :key="i">
                        <div class="card repo">
                            <div class="card-content">
                                <h3 class="widget_title">
                                    <n-link :to="`/project/${repo.id}`">{{ repo.title }}</n-link>
                                </h3>
                                <p>{{ repo.description }}</p>
                            </div>
                            <div class="medal" v-if="repo.meta">
                                <small class="button is-small is-text">
                                    <x-icon name="star"></x-icon>
                                    <span class="value">{{ getSD(repo.meta['data_github'], 'star') }}</span>
                                </small>
                                <small class="button is-small is-text">
                                    <x-icon name="download"></x-icon>
                                    <span class="value">{{ getSD(repo.meta['data_npm'], 'star') }}</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <b-pagination
                    :total="response.count"
                    :current.sync="query.page"
                    :per-page="12">
                    <b-pagination-button
                        @click.native="changePage(props.page.number, false)"
                        slot-scope="props"
                        :page="props.page"
                        :id="`page-${props.page.number}`"
                        tag="nuxt-link"
                        :href="pathPage(props.page.number)"
                        :to="pathPage(props.page.number)">
                        {{ props.page.number }}
                    </b-pagination-button>
                    <b-pagination-button
                        @click.native="changePage(props.page.number, false)"
                        slot="previous"
                        slot-scope="props"
                        :page="props.page"
                        :tag="props.page.number > 0 ? 'nuxt-link' : 'a'"
                        :href="pathPage(props.page.number)"
                        :to="pathPage(props.page.number)">
                        Previous
                    </b-pagination-button>
                    <b-pagination-button
                        @click.native="changePage(props.page.number, true)"
                        slot="next"
                        slot-scope="props"
                        :page="props.page"
                        :tag="props.page.number < totalPage ? 'nuxt-link' : 'a'"
                        :href="pathPage(props.page.number)"
                        :to="pathPage(props.page.number)">
                        Next
                    </b-pagination-button>
                </b-pagination>
            </div>
        </section>
        <footer class="footer">
            <div class="container">
                <p><strong>Made</strong> with ❤️</p>
            </div>
        </footer>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    name: 'Taxonomy',
    async asyncData({$api, params, query}) {
        query.page_size = 12;
        query.page = query.page ? Number.parseInt(query.page) : 1;
        query.order_by = query.order_by ? query.order_by : 'best';
        query.publication = process.env.PUBLICATION;
        let tax = params.tax ? await $api['taxonomy'].get(params.tax, {
            params: {
                taxonomy: 'tag'
            }
        }) : null;
        return {
            taxonomy: tax,
            response: await $api['post'].list({
                taxonomies: tax ? tax.id : undefined,
                ...query
            }),
            taxonomyRES: await $api['taxonomy'].list({
                taxonomy: 'tag'
            }),
            query
        }
    },
    data() {
        return {
            isActive: false,
            orders: [
                'Best', 'Newest', 'Downloads', 'Stars', 'Quality', 'Popularity', 'Maintenance'
            ]
        }
    },
    components: {},
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.response.count / 10);
        },
        pathOder() {
            return `?page=1&order_by`;
        },
        title() {
            let title = process.env.SITE_TITLE + ' Packages';
            if (this.taxonomy) {
                title = this.taxonomy['term']['title'] + ' Packages for ' + process.env.SITE_TITLE;
            }
            let main_flag = '';
            if (['best', 'newest'].includes(this.query.order_by)) {
                title = `${this.capitalizeFirst(this.query.order_by)} ${title} ${main_flag}`
            } else {
                title = `Top ${title} ${main_flag} by ${this.capitalizeFirst(this.query.order_by)}`
            }
            if (this.query.page > 1) {
                title = title + ' | Page ' + this.query.page
            }
            return title;
        },
        description() {
            return this.taxonomy ? this.taxonomy['term']['description'] : process.env.SITE_DESCRIPTION
        }
    },
    methods: {
        async fetch() {
            this.response = await this.$api['pub_post'].list({
                taxonomies: this.taxonomy ? this.taxonomy.id : undefined,
                ...this.query
            }).then(res => {
                const myDiv = document.getElementById('__layout');
                myDiv.scrollTop = 0;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                return res
            })
        },
        async changePage(p, flag) {
            if (typeof flag === 'boolean') {
                if ((flag && p <= this.totalPage) || (!flag && p > 0)) {
                    this.query.page = p
                }
            } else {
                this.query.page = p
            }
        },
        selectOrder(order) {
            this.query.page = 1;
            this.query.order_by = order.toLowerCase()
        },
        searchTax: debounce(function (text) {
            this.$api['term_taxonomy'].list({
                parent: this.taxonomy.id,
                search: text.data
            }).then(res => {
                this.taxonomyRES = res
            })
        }, 500),
        pathPage(page) {
            return `?page=${page}&order_by=${this.query.order_by}`
        }
    },
    watch: {
        'query.page': {
            handler: function () {
                this.fetch()
            }
        },
        'query.order_by': {
            handler: function () {
                this.fetch()
            }
        }
    }
}
</script>

<style lang="scss">
</style>
