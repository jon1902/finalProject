import React from 'react';
import { Modal, Form, Input } from 'antd';
import { api } from '../../../config/api';
import { IProperty } from '../../../pages/Home';

import './AddPropertyModal.css'

interface IAddPropertyModalProps {
    open: boolean;
    onSave: (newProperty: IProperty) => {};
    onCancel: () => {};
}



export const AddPropertyModal = ({ open, onSave, onCancel }: IAddPropertyModalProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try{
            const formValues = await form.validateFields();

            const res = await api.post('/properties', formValues)
    
            form.resetFields();
    
            onSave(res?.data)
        } catch(err) {
            console.error(err)
        }
      };
      
    return <Modal title="ADD PROPERTY" cancelText="cancel" okText='save' open={open} onOk={onFinish} onCancel={onCancel}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            form={form}
        >
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the property name !' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the property address !' }]}
            >
                <Input />
            </Form.Item>
        </Form>
  </Modal>
}