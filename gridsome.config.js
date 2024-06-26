// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/posts/**/*.md',
        typeName: 'markdownPost',
        remark: {
          //Config options can be added here
        }
      }
    }
  ],
  pathPrefix: "/",
  transformers: {
    remark: {
      //Config options can be added here
    }
  }
}
