import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
        const response = await axios.post('http://10.4.222.25:1234/User/user_auth', {
            account: values.username,
            pw: values.password,
          }, {
            withCredentials: true,
          });
        console.log(response);
        console.log(response.data);
      // 根据服务器返回的内容进行处理
      if (response.data.status === 'success') {
        // 登录成功的处理，比如跳转到首页
        console.log('Login success!');
        setErrorMessage(''); // 清除错误消息

        // 获取 Authorization 头中的 token
        const token = response.headers['authorization']?.split(' ')[1];
        // 将 token 存储到 localStorage 或 sessionStorage
        localStorage.setItem('token', token);
        navigate('/chat');  // 跳转到 ChatPage 页面

      } else {
        // 登录失败的处理，比如显示错误信息
        setErrorMessage(response.data.message || 'Login failed!');
        console.log('Login failed!');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 捕获401错误并显示自定义消息
        setErrorMessage(error.response.data.message || 'Invalid username or password');
      } else {
        // 其他错误处理
        setErrorMessage('An error occurred. Please try again later.');
      }
      console.error('There was an error!', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Form onFinish={handleSubmit} style={{ width: 300 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>登录</Title>
        
        {errorMessage && (
          <Alert message={errorMessage} type="error" style={{ marginBottom: 20 }} />
        )}
        
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            prefix={<i className="anticon anticon-user" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<i className="anticon anticon-lock" />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
            记住我
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
