require('dotenv').config();

export default {
    mode: 'universal',
    env: {
        PUBLICATION: process.env.PUBLICATION || 1,
        PRIMARY_SITE_ID: process.env.PRIMARY_SITE_ID || 1,
        BASE_URL: process.env.BASE_URL || 'https://vuerepository.com',
        API_DOMAIN: process.env.API_DOMAIN || 'https://expo.bubblask.com',
        SITE_TITLE: process.env.SITE_TITLE || 'CMS Repository',
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || 'CMS Repository'
    },
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#333'},
    /*
    ** Global CSS
    */
    css: [
        '@mdi/font/css/materialdesignicons.css',
        '@/style/app.sass',
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/component'},
        {src: '~/plugins/repository'},
        {src: '~/plugins/axios'},
        {src: '~/plugins/auth'},
        {src: '~/plugins/generic'},
        {src: '~/plugins/front', mode: 'client'}
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        ['@nuxtjs/google-analytics', {
            id: 'UA-170272055-1'
        }]
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        ['cookie-universal-nuxt', {alias: 'ck'}],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.API_DOMAIN
    },
    /*
    ** Build configuration
    */
    build: {
        // extractCSS: true,
        /*
        ** You can extend webpack config here
        */
        extractCSS: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        extend(config, ctx) {
        }
    }
}
