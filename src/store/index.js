import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin
  },
  state: {
    positionData: [], // 当前用户所处网站位置
    routePath: '', // 当前路由
  },
  mutations: {
    SET_POSITIONDATA(state, data) {
      const routerTable = {
        '/website': [{
          name: '网站',
          path: '/website'
        }],
        '/website/create': [{
          name: '网站',
          path: '/website'
        }, {
          name: '创建网站',
          path: '/website/create'
        }],
        '/finance': [{
          name: '财务',
          path: '/finance'
        }],
        '/finance/monthDetail': [{
          name: '财务',
          path: '/finance'
        }, {
          name: '月份详情',
          path: '/finance/monthDetail'
        }],
        '/finance/addInfo': [{
          name: '财务',
          path: '/finance'
        }, {
          name: '添加收款信息',
          path: '/finance/addInfo'
        }],
        '/finance/editInfo': [{
          name: '财务',
          path: '/finance'
        }, {
          name: '收款信息',
          path: '/finance/checkInfo'
        }, {
          name: '修改收款信息',
          path: '/finance/editInfo'
        }],
        '/finance/checkInfo': [{
          name: '财务',
          path: '/finance'
        }, {
          name: '收款信息',
          path: '/finance/checkInfo'
        }],
      };
      state.positionData = routerTable[data];
      state.routePath = data;
    }
  },
  actions: {
    setPositionData({ commit }, data) {
      commit('SET_POSITIONDATA', data);
    },
  }
})
