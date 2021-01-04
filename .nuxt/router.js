import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fccb14fe = () => interopDefault(import('../pages/author/_username.vue' /* webpackChunkName: "pages/author/_username" */))
const _4da3e13b = () => interopDefault(import('../pages/project/_repo.vue' /* webpackChunkName: "pages/project/_repo" */))
const _33596104 = () => interopDefault(import('../pages/project/_repo/index.vue' /* webpackChunkName: "pages/project/_repo/index" */))
const _3c88e5fc = () => interopDefault(import('../pages/project/_repo/contributors.vue' /* webpackChunkName: "pages/project/_repo/contributors" */))
const _5f516ec2 = () => interopDefault(import('../pages/project/_repo/document.vue' /* webpackChunkName: "pages/project/_repo/document" */))
const _4929b35c = () => interopDefault(import('../pages/project/_repo/review.vue' /* webpackChunkName: "pages/project/_repo/review" */))
const _6a6439f9 = () => interopDefault(import('../pages/project/_repo/screenshots.vue' /* webpackChunkName: "pages/project/_repo/screenshots" */))
const _45920401 = () => interopDefault(import('../pages/project/_repo/tutorials.vue' /* webpackChunkName: "pages/project/_repo/tutorials" */))
const _4946b43c = () => interopDefault(import('../pages/_tax.vue' /* webpackChunkName: "pages/_tax" */))

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
    component: _fccb14fe,
    name: "author-username"
  }, {
    path: "/project/:repo?",
    component: _4da3e13b,
    children: [{
      path: "",
      component: _33596104,
      name: "project-repo"
    }, {
      path: "contributors",
      component: _3c88e5fc,
      name: "project-repo-contributors"
    }, {
      path: "document",
      component: _5f516ec2,
      name: "project-repo-document"
    }, {
      path: "review",
      component: _4929b35c,
      name: "project-repo-review"
    }, {
      path: "screenshots",
      component: _6a6439f9,
      name: "project-repo-screenshots"
    }, {
      path: "tutorials",
      component: _45920401,
      name: "project-repo-tutorials"
    }]
  }, {
    path: "/:tax?",
    component: _4946b43c,
    name: "tax"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
