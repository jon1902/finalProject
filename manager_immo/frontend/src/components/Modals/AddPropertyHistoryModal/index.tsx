import React from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import { api } from '../../../config/api';
import { IProperty } from '../../../pages/Home';

import './AddPropertyHistoryModal.css'

interface IAddPropertyModalProps {
    open: boolean;
    onSave: (newProperty: IProperty) => {};
    onCancel: () => {};
    propertyId: number;
}

const { RangePicker } = DatePicker;

export const AddPropertyHistoryModal = ({ open, onSave, onCancel, propertyId }: IAddPropertyModalProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try{
            const formValues = await form.validateFields();

            const res = await api.post(`/propertyHistory/properties/${propertyId}`, {
            name: formValues.name,
            incomea: formValues.incomea,
            startAt: formValues.date[0]['$d'],
            endAt: formValues.date[1]['$d']
           })
    
            form.resetFields();
    
            onSave(res?.data)
        } catch(err) {
            console.error(err)
        }
      };
      
    return <Modal title="ADD PROPERTY HISTORY" cancelText="cancel" okText='save' open={open} onOk={onFinish} onCancel={onCancel}>
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
            label="Customer name"
            name="name"
            rules={[{ required: true, message: 'Please input the customer name !' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Incomea"
            name="incomea"
            rules={[{ required: true, message: 'Please input the incomea !', type: 'number' }]}
            >
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item 
                label="reservation date" 
                name="date"             
                rules={[{ required: true, message: 'Please input the date !' }]}
            >
                <RangePicker />
            </Form.Item>
        </Form>
  </Modal>
}