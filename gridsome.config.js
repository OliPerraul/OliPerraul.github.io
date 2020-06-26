// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TutorialQuest',
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation',
        baseDir: './documentations',       
		siteUrl: 'https://OliPerraul.github.io',
		pathPrefix: '',
        template: './src/templates/Documentation.vue',
        route: '/documentations/:slug',
        plugins: [
          '@gridsome/remark-prismjs',
          'gridsome-plugin-remark-youtube'

        ]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        // Add remark-mermaid plugin
        'gridsome-plugin-remark-youtube',
        'gridsome-plugin-remark-mermaid',
        '@gridsome/remark-prismjs'
      ]
    }
  },
  template: {
    Documentation: [
      {
        path: '/documentation/:slug',
        component: '/src/templates/Documentation.vue'
      }
    ]
  }
}
