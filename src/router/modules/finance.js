const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export const finance = [{
  path: '/finance',
  name: 'finance',
  meta: {
    auth: true,
    cache: true,
    title: '财务'
  },
  component: _import('page/finance/index')
}, {
  path: '/finance/monthDetail',
  name: 'monthDetail',
  meta: {
    auth: true,
    cache: true,
    title: '月份详情'
  },
  component: _import('page/finance/monthDetail')
}, {
  path: '/finance/addInfo',
  name: 'addInfo',
  meta: {
    auth: true,
    cache: true,
    title: '添加收款信息'
  },
  component: _import('page/finance/addInfo')
}, {
  path: '/finance/editInfo',
  name: 'editInfo',
  meta: {
    auth: true,
    cache: true,
    title: '修改收款信息'
  },
  component: _import('page/finance/editInfo')
}, {
  path: '/finance/checkInfo',
  name: 'checkInfo',
  meta: {
    auth: true,
    cache: true,
    title: '收款信息'
  },
  component: _import('page/finance/checkInfo')
}]
