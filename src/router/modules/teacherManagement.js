const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export const teacherManagement = [{
  path: '/teacherManagement',
  name: 'teacherManagement',
  meta: {
    auth: true,
    cache: true,
    title: '教师管理'
  },
  component: _import('page/teacherManagement/index')
}]
