const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/miska/public_html/Portfolio/src/templates/post.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--blog-vue" */ "/home/miska/public_html/Portfolio/src/pages/Blog.vue")
const c3 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/miska/public_html/Portfolio/node_modules/gridsome/app/pages/404.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/miska/public_html/Portfolio/src/pages/Index.vue")

export default [
  {
    path: "/blog/post/how-to-upload-files-in-a-wordpress-theme-using-xmlhttprequest/",
    component: c1
  },
  {
    path: "/blog/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
