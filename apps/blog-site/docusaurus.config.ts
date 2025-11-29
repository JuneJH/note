import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '小橘子-个人博客',
  tagline: '自由之路',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://blog.junejh.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'JuneJH', // Usually your GitHub org/user name.
  projectName: 'blog_site', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          path: "../../packages/note",
          editUrl:
            'https://github.com/JuneJH',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/JuneJH',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '小橘子-个人博客',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '技术',
        },
        // { to: '/blog', label: '博客', position: 'left' },
        {
          label: '小游戏',
          position: 'right',
          items: [
            {
              label: "贪吃蛇",
              href: "https://junejh.github.io/overview/snake/",
            }, {
              label: "像素鸟",
              href: "https://junejh.github.io/overview/bird-game/",
            }
          ]
        },
        {
          href: 'https://github.com/JuneJH',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '技术',
          items: [
            {
              label: '技术',
              to: '/docs',
            },
          ],
        },
        {
          title: '其他',
          items: [
            {
              label: '小橘子-博客',
              href: 'http://blog.junejh.cn/',
            },
            {
              label: '小橘子-英语(TODO)',
              href: 'http://eglish-admin.junejh.cn/',
            },
            {
              label: '小橘子-脚手架',
              href: 'http://cli.junejh.cn/',
            },
            {
              label: '小橘子-拓扑图(TODO)',
              href: 'http://cli.junejh.cn/',
            },
          ],
        },
        {
          title: '链接',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/JuneJH',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 小橘子-个人技术`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
