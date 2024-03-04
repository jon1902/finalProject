import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Typography, Row } from 'antd';
import { api } from '../../config/api'
import './register.css'

const { Title, Text } = Typography;

export const  RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
      try{
        await api.post('/auth/register', values);

        navigate('/')

        toast.success('You are now logged !')
      } catch(err) {
        console.error(err)
      }
    };

      
    return <div className='register-page'>
      <Title>Register</Title>
      <Form
          style={{ minWidth: 300 }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
    >

    <Form.Item
        label="Username"
        name="username"
        rules={[
          {
              required: true,
              message: 'Please input your email!'
          }
      ]}
      >
        <Input />
      </Form.Item>
      
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
          Register
        </Button>
      </Form.Item>
      <Row justify="center">
        <Text>
            Already have an account ? 
            <Link to='/'> Login here</Link>
        </Text>
      </Row>

    </Form>
  </div>
}