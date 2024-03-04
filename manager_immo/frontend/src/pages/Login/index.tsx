import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Form, Input, Typography } from 'antd';
import { api } from '../../config/api'
import './Login.css'

const { Title, Text } = Typography;

export const  LoginPage = () => {
    const navigate = useNavigate();
    
    const onFinish = async (values: any) => {
      try{
        await api.post('/auth/login', values);

        navigate('/')

        toast.success('You are now logged !')
      } catch(err) {
        console.error(err)
      }
    };

      
    return <div className='login-page'>
      <Title>Login</Title>
      <Form
          style={{ minWidth: 300 }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
              required: true,
              type: "email",
              message: 'Please input your email!'
          }
      ]}
      >
          <Input type='email' />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <Row justify="center">
        <Text>
            Don't have an account ?
            <Link to='/register'> Register here </Link>
        </Text>
      </Row>
    </Form>
  </div>
}