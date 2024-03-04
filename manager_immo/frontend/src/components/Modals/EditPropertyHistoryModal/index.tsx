import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import { api } from '../../../config/api';

import './EditPropertyHistoryModal.css'

export interface IPropertyHistory {
	id: number;
	name: string;
    startAt: Date;
    endAt: Date;
    incomea: number;
	propertyId: number;
    userId: number;
}

interface IEditPropertyModalProps {
    open: boolean;
    onSave: (propertyHistoryEdited: IPropertyHistory) => void;
    onCancel: () => void;
    propertyHistory: IPropertyHistory;
}

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


export const EditPropertyHistoryModal = ({ open, onSave, onCancel, propertyHistory }: IEditPropertyModalProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try{
            const formValues = await form.validateFields();

            const res = await api.patch(`/propertyHistory/${propertyHistory.id}`, {
            name: formValues.name,
            incomea: formValues.incomea,
            startAt: formValues.date[0]['$d'],
            endAt: formValues.date[1]['$d']
           })
    
            form.resetFields();
    
            onSave(res?.data)

            onCancel()
        } catch(err) {
            console.error(err)
        }
      };

      useEffect(() => {
        if(!propertyHistory) {
            onCancel()
        } else {
            form.setFieldsValue({
                name: propertyHistory?.name,
                incomea: propertyHistory?.incomea,
                date: [dayjs(propertyHistory?.startAt, dateFormat), dayjs(propertyHistory?.endAt, dateFormat)]
            })
        }
      }, [propertyHistory])
      
    return <Modal title="EDIT PROPERTY HISTORY" cancelText="cancel" okText='save' open={open} onOk={onFinish} onCancel={onCancel}>
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