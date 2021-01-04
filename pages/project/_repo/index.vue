<template>
    <div>
        <div class="widget" v-if="score">
            <div class="widget_title tag">Rating</div>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-left"><h4 class="widget_title">Maintenance</h4></div>
                                <div class="level-right">
                                    <div class="set-size charts-container">
                                        <div class="pie-wrapper style-2">
                                            <span class="label">{{ score.detail['maintenance'].toFixed(2) * 100 }}<span
                                                class="smaller">%</span></span>
                                            <div class="pie" v-bind:style="cc('maintenance').c">
                                                <div class="left-side half-circle"
                                                     v-bind:style="cc('maintenance').l"></div>
                                                <div class="right-side half-circle"
                                                     v-bind:style="cc('maintenance').r"></div>
                                            </div>
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-left"><h4 class="widget_title">Popularity</h4></div>
                                <div class="level-right">
                                    <div class="set-size charts-container">
                                        <div class="pie-wrapper progress-45 style-2">
                                            <span class="label">{{ score.detail.popularity.toFixed(2) * 100 }}<span
                                                class="smaller">%</span></span>
                                            <div class="pie" v-bind:style="cc('popularity').c">
                                                <div class="left-side half-circle"
                                                     v-bind:style="cc('popularity').l"></div>
                                                <div class="right-side half-circle"
                                                     v-bind:style="cc('popularity').r"></div>
                                            </div>
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-left"><h4 class="widget_title">Quality</h4></div>
                                <div class="level-right">
                                    <div class="set-size charts-container">
                                        <div class="pie-wrapper progress-45 style-2">
                                            <span class="label">{{ score.detail.quality.toFixed(2) * 100 }}<span
                                                class="smaller">%</span></span>
                                            <div class="pie" v-bind:style="cc('quality').c">
                                                <div class="left-side half-circle" v-bind:style="cc('quality').l"></div>
                                                <div class="right-side half-circle"
                                                     v-bind:style="cc('quality').r"></div>
                                            </div>
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget">
            <div class="columns">
                <div class="column is-8">
                    <h2 class="widget_title tag">Weekly Downloads</h2>
                    <chart type="line" :label="repo.title" :data="downloads"/>
                </div>
                <div class="column">
                    <div class="statistic">
                        <div class="widget_title tag">Information</div>
                        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <tbody>
                            <tr v-if="data_npm">
                                <th>Downloads</th>
                                <td>{{ getSD(data_npm, 'download') }}</td>
                            </tr>
                            <tr v-if="data_npm">
                                <th>Stars</th>
                                <td>{{ getSD(data_github, 'star') }}</td>
                            </tr>
                            <tr v-if="data_github && data_github.issues">
                                <th>Issues</th>
                                <td>{{ data_github.issues.count }}</td>
                            </tr>
                            <tr v-if="data_meta">
                                <th>Version</th>
                                <td>{{ data_meta.version }}</td>
                            </tr>
                            <tr v-if="data_meta">
                                <th>License</th>
                                <td>{{ data_meta['license'] }}</td>
                            </tr>
                            <tr v-if="data_github">
                                <th>Updated</th>
                                <td>{{ formatDate(data_github['updated_at']) }}</td>
                            </tr>
                            <tr v-if="data_github">
                                <th>Created</th>
                                <td>{{ formatDate(data_github['created_at']) }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget" v-if="data_meta && data_meta['dependencies']">
            <div class="widget_title tag">Dependencies</div>
            <div class="columns is-multiline">
                <div class="column is-4" v-for="(value, key) in data_meta['dependencies']" :key="key">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content is-bold">{{ key }}</div>
                                <div class="media-right">
                                    <div class="tag">{{ value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getStarHistory from '../../../helper/getStarHistory';

export default {
    name: "ProjectOverview",
    props: {
        repo: {}
    },
    data() {
        return {
            downloads: [],
            stars: []
        }
    },
    methods: {
        cc(flag) {
            let process = this.score.detail[flag].toFixed(2) * 100;
            let c = {}, r = {}, l = {
                'transform': `rotate(${process * 3.6}deg)`
            };
            if (process <= 50) {
                r['display'] = 'none';
            } else {
                r['transform'] = 'rotate(180deg)';
                c['clip'] = 'rect(auto, auto, auto, auto)';
            }
            return {
                r, l, c
            }
        },
        fetchDownload() {
            this.$axios.get(`https://api.npmjs.org/downloads/range/last-month/${this.repo.title}`).then(res => {
                if (res) {
                    let data = res.data.downloads.map(x => {
                        return {
                            label: x.day,
                            count: x.downloads
                        }
                    });
                    this.downloads = data.splice(15, 30);
                }
            })
        },
        async fetchStar() {
            if (this.repo.meta['full_name']) {
                const history = await getStarHistory(`${this.repo.meta.full_name}`, null)
                    .catch(err => {
                    });
                if (history) {
                    let temp = history.map(x => {
                        return {
                            label: x.date,
                            count: x.starNum
                        }
                    });
                    this.stars = temp.splice(temp.length - 15, temp.length);
                }
            }
        },
    },
    async created() {
        await this.fetchStar();
        await this.fetchDownload();
    },
    computed: {
        data_meta() {
            return this.repo.meta['data_meta']
        },
        data_npm() {
            return this.repo.meta['data_npm']
        },
        data_github() {
            return this.repo.meta['data_github']
        },
        score() {
            return this.repo.meta['score']
        }
    }
}
</script>

<style scoped>

</style>
