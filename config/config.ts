import { defineConfig } from '@umijs/max';
import routes from './router';

export default defineConfig({
  antd: {
    configProvider: {},
    appConfig: {},
  },
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: '',
  },
  layout: {},
  routes,
  npmClient: 'pnpm',

  // 代理
  proxy: {
    '/apis': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/apis': '' },
    },
  },
});
