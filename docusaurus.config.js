// @ts-check

const config = {
  title: 'Fab Lab Joinville Wiki',
  themes: ['@docusaurus/theme-mermaid'],
  tagline: 'Documentação, guias e referências do Fab Lab Joinville.',
  url: 'https://wiki.fablabjoinville.com.br',
  baseUrl: '/',
  organizationName: 'fablabjoinville',
  projectName: 'fablabjoinville.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/fablabjoinville/fablabjoinville.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      mermaid: {
        theme: { light: 'default', dark: 'dark' },
      },
      navbar: {
        title: 'Fab Lab Joinville',
        items: [
          {
            to: '/guias',
            position: 'left',
            label: 'Guias',
          },
          {
            to: '/contato',
            position: 'left',
            label: 'Contato',
          },
          {
            href: 'https://github.com/fablabjoinville',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Fab Lab Joinville',
            items: [
              {
                label: 'Site oficial',
                href: 'https://www.fablabjoinville.com.br',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/fablabjoinville',
              },
              {
                label: 'Contato',
                to: '/contato',
              },
            ],
          },
          {
            title: 'Redes',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/fablabjoinville',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/fablabjoinville',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/fablabjoinville',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fab Lab Joinville.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;
