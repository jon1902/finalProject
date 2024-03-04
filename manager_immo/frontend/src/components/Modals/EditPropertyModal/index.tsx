import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { api } from '../../../config/api';
import { IProperty } from '../../../pages/Home';

import './EditPropertyModal.css'

interface IEditPropertyModalProps {
    open: boolean;
    onSave: (newProperty: IProperty) => void;
    onCancel: () => void;
    property: IProperty | null;
}



export const EditPropertyModal = ({ open, onSave, onCancel, property }: IEditPropertyModalProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try{
            const formValues = await form.validateFields();

            const res = await api.patch(`/properties/${property?.id}`, formValues)
    
            form.resetFields();
    
            onSave(res?.data)
        } catch(err) {
            console.error(err)
        }
      };

      useEffect(() => {
        if(!property) {
            onCancel()
        } else {
            form.setFieldsValue({
                name: property?.name,
                address: property?.address
            })
        }
      }, [property])

      
    return <Modal title="EDIT PROPERTY" cancelText="cancel" okText='save' open={open} onOk={onFinish} onCancel={onCancel} destroyOnClose>
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
            initialValues={property?.name}
            rules={[{ required: true, message: 'Please input the property name !' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Address"
            name="address"
            initialValues={property?.address}
            rules={[{ required: true, message: 'Please input the property address !' }]}
            >
                <Input />
            </Form.Item>
        </Form>
  </Modal>
}