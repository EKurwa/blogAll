export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '文章',
    path: '/article',
    component: './Article',
    routes: [
      {
        name: '添加文章',
        path: '/article/edit',
        component: './Article/edit',
        hideInMenu: true,
      },
      {
        name: '添加文章',
        path: '/article/preview',
        component: './Article/preview',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '标签',
    path: '/label',
    component: './Labels',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: 'Login',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/*',
    component: './other/404.tsx',
    layout: false,
  },
];
