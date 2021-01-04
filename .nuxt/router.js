import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7f77de73 = () => interopDefault(import('../pages/author/_username.vue' /* webpackChunkName: "pages/author/_username" */))
const _374e6d89 = () => interopDefault(import('../pages/project/_repo.vue' /* webpackChunkName: "pages/project/_repo" */))
const _6f0ae94c = () => interopDefault(import('../pages/project/_repo/index.vue' /* webpackChunkName: "pages/project/_repo/index" */))
const _1a156f24 = () => interopDefault(import('../pages/project/_repo/contributors.vue' /* webpackChunkName: "pages/project/_repo/contributors" */))
const _83aa97de = () => interopDefault(import('../pages/project/_repo/document.vue' /* webpackChunkName: "pages/project/_repo/document" */))
const _51355964 = () => interopDefault(import('../pages/project/_repo/review.vue' /* webpackChunkName: "pages/project/_repo/review" */))
const _7888c147 = () => interopDefault(import('../pages/project/_repo/screenshots.vue' /* webpackChunkName: "pages/project/_repo/screenshots" */))
const _122c06cf = () => interopDefault(import('../pages/project/_repo/tutorials.vue' /* webpackChunkName: "pages/project/_repo/tutorials" */))
const _26570fa4 = () => interopDefault(import('../pages/_tax.vue' /* webpackChunkName: "pages/_tax" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/author/:username?",
    component: _7f77de73,
    name: "author-username"
  }, {
    path: "/project/:repo?",
    component: _374e6d89,
    children: [{
      path: "",
      component: _6f0ae94c,
      name: "project-repo"
    }, {
      path: "contributors",
      component: _1a156f24,
      name: "project-repo-contributors"
    }, {
      path: "document",
      component: _83aa97de,
      name: "project-repo-document"
    }, {
      path: "review",
      component: _51355964,
      name: "project-repo-review"
    }, {
      path: "screenshots",
      component: _7888c147,
      name: "project-repo-screenshots"
    }, {
      path: "tutorials",
      component: _122c06cf,
      name: "project-repo-tutorials"
    }]
  }, {
    path: "/:tax?",
    component: _26570fa4,
    name: "tax"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
