import { userLogin } from '@/apis/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';

export default () => {
  const { setUserInfo } = useModel('user');
  const { setInitialState } = useModel('@@initialState');

  const onSubmit = async (formData: any) => {
    const { data } = await userLogin(formData);
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));

    setInitialState({
      name: data.nickName || data.username,
      avatar: `http://127.0.0.1:8080/${data.avatar}`,
    });
    history.push('/');
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        width: '100vw',
      }}
    >
      <LoginFormPage
        onFinish={onSubmit}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          ></div>
        }
      >
        {
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入账号/邮箱/电话号码'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        }
        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码 </a>
        </div>
      </LoginFormPage>
    </div>
  );
};
