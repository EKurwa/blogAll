import { BulbOutlined, LogoutOutlined } from '@ant-design/icons';
import type { RequestConfig } from '@umijs/max';
import { RunTimeLayoutConfig, RuntimeAntdConfig, history } from '@umijs/max';
import { Dropdown, MenuProps, message, theme } from 'antd';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

// 登录函数返回内容
export async function getInitialState(): Promise<{
  name: string;
  avatar?: string;
}> {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const userInfoObj = JSON.parse(userInfo);
    return {
      name: userInfoObj.nickName || userInfoObj.username,
      avatar: `http://127.0.0.1:8080/${userInfoObj.avatar}`,
    };
  }
  return {
    name: '小荣',
    avatar:
      'https://p26-passport.byteacctimg.com/img/user-avatar/312989b46037c16843b1eb44aea82fa2~180x180.awebp?',
  };
}
//布局运行时基本布局配置
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const DropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
    {
      key: 'theam',
      icon: <BulbOutlined />,
      label: '切换主题',
    },
  ];
  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout':
        localStorage.removeItem('userInfo');
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        message.success('退出成功');
        history.push('/login');
        break;
      case 'theam':
        message.success('切换主题成功');
        break;
      default:
        break;
    }
  };

  return {
    // 常用属性
    title: '博客管理',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false, //菜单是否国际化
    },
    layout: 'mix', //菜单的方式，有mix,top,side三种，这里用mix
    splitMenus: true, // 这里用了mix才会生效,bia
    avatarProps: {
      src: initialState?.avatar || undefined,
      title: initialState?.name || '用户',
      size: 'small',
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: DropdownItems,
              onClick: DropdownOnClick,
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },

    token: {
      //菜单的样式配置
      //   colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
      //   colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
      //   colorTextAppListIcon: 'rgba(255,255,255,0.85)',
      sider: {
        //侧边菜单的配置 ，这里具体看文档
        // colorBgCollapsedButton: '#fff',
        // colorTextCollapsedButtonHover: '#1677ff',
        // colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
        colorMenuBackground: '#fff',
        // colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
        colorMenuItemDivider: 'rgba(255,255,255,0.15)',
        colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
        colorBgMenuItemSelected: 'rgba(0,0,0,0.05)',
        colorTextMenuSelected: '#1677ff',
        colorTextMenuItemHover: '#1677ff',
        // colorTextMenu: 'rgba(255,255,255,0.75)',
        // colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
        colorTextMenuTitle: 'rgba(255,255,255,0.95)',
        colorTextMenuActive: '#1677ff',
        colorTextSubMenuSelected: '#1677ff',
      },
    },
  };
};

// 请求运行时
export const request: RequestConfig = {
  baseURL: '/apis',
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler(error: any) {
      const { code, message: msg } = error.response.data;
      if (error.response && (code === 400 || code === 401)) {
        message.error(msg);
      }
    },
    errorThrower() {},
  },
  // 请求拦截
  requestInterceptors: [
    (config: any) => {
      let token = localStorage.getItem('token') || '';
      if (token.startsWith('"')) {
        token = JSON.parse(token);
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    (error: any) => {
      return error;
    },
  ],
  // 相应拦截
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
};

// 布局
export const antd: RuntimeAntdConfig = (memo) => {
  memo.theme ??= {
    token: {
      colorPrimary: '#00b96b',
      borderRadius: 2,
    },
  };
  memo.theme.algorithm = theme.defaultAlgorithm; // 配置 antd5 的预设 dark 算法

  memo.appConfig = {
    message: {
      // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
      maxCount: 3,
    },
  };

  return memo;
};

// 路由切换监控
export function onRouteChange({ location }) {
  if (
    location.pathname !== '/login' &&
    document.cookie.indexOf('token') === -1
  ) {
    window.location.href = '/login';
  }
}
