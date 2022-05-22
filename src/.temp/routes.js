const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/miska/public_html/Blog/src/templates/post.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/miska/public_html/Blog/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/miska/public_html/Blog/src/pages/Index.vue")

export default [
  {
    path: "/post/how-to-upload-files-in-a-wordpress-theme-using-xmlhttprequest/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
