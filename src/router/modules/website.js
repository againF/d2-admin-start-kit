const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export const website = [{
  path: '/website',
  name: 'website',
  meta: {
    auth: true,
    cache: true,
    title: '网站'
  },
  component: _import('page/website/index')
},
{
  path: '/website/create',
  name: 'createWebsite',
  meta: {
    auth: true,
    cache: true,
    title: '创建网站'
  },
  component: _import('page/website/createWebSite')
}]
