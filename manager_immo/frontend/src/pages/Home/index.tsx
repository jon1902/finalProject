import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button, Table, Space } from 'antd';
import { api } from '../../config/api';
import { HomeCard } from '../../components/Home/Card/index';
import { AddPropertyModal } from '../../components/Modals/AddPropertyModal/index';
import { EditPropertyModal } from '../../components/Modals/EditPropertyModal/index';
import "./HomePage.css"

export interface IProperty {
  id: number;
  name: string;
  address: string;
  userId: number;
}

export const HomePage = () => {
    const navigate = useNavigate()

    const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
    const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] = useState(false);
    const [propertyToEdit, setPropertyToEdit] = useState<IProperty | null>(null);
    const [properties, setProperties] = useState<IProperty[]>([])
    const [totalIncomea, setTotalIncomea] = useState(0);

    useEffect(() => {
        const getProperties = async () => {
          try{
            const res = await api.get('/properties')

            setProperties(res?.data)
          } catch(err) {
            console.error(err)
          }
        }
      
        getProperties()

        const getTotalIncomea = async () => {
          try{
            const res = await api.get('/propertyHistory/get-total-incomea')

            setTotalIncomea(res?.data?.totalIncomea || 0)
          } catch(err) {
            console.error(err)
          }
        }
      
        getTotalIncomea()
    }, [])

    const showAddPropertyModal = () => {
      setIsAddPropertyModalOpen(true);
    };

    const onSaveAddPropertyModal = (newProperty: IProperty) => {
      const newProperties = [...properties, newProperty]

      setProperties(newProperties)
      setIsAddPropertyModalOpen(false);
    };

    const onCancelAddPropertyModal = () => {
      setIsAddPropertyModalOpen(false);
    };

    const showEditPropertyModal = (property: IProperty) => {
      setIsEditPropertyModalOpen(true);
      setPropertyToEdit(property)
    };

    const onSaveEditPropertyModal = (newProperty: IProperty) => {
      const updatedProperties = [...properties];

      const indexToUpdate = updatedProperties.findIndex((property) => property.id === newProperty.id);
      updatedProperties[indexToUpdate] = newProperty;


      setProperties(updatedProperties)
      setIsEditPropertyModalOpen(false);
    };

    const onCancelEditPropertyModal = () => {
      setIsEditPropertyModalOpen(false);
    };

    const onDeleteProperty = async (propertyId: number) => {
      try{
        await api.delete(`/properties/${propertyId}`)

        const newProperties = properties.filter((property) => property.id !== propertyId)

        setProperties(newProperties)
      } catch(err) {
        console.error(err)
      }
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '',
        key: 'action',
        align: 'right',
        render: (property) => {
          //TODO: mettre une modal de confirmation
          return (
            <Space size="middle">
              <Button onClick={() => navigate(`/property/${property.id}`)}>Details</Button>
              <Button onClick={() => showEditPropertyModal(property)}>Edit</Button>
              <Button danger onClick={() => onDeleteProperty(property.id)}>Delete</Button>
            </Space>
          )
        },
      },
    ]

    return <div className="home-page-wrapper">
      <AddPropertyModal 
        open={isAddPropertyModalOpen}
        onSave={onSaveAddPropertyModal} 
        onCancel={onCancelAddPropertyModal} 
      />
      <EditPropertyModal 
        open={isEditPropertyModalOpen}
        onSave={onSaveEditPropertyModal} 
        onCancel={onCancelEditPropertyModal} 
        property={propertyToEdit}
      />
      <div className="home-page-header">
        <Row gutter={16} className="home-row">
        <Col span={8} className='home-col'>
          <HomeCard title="Nombre de propriétés" content={properties?.length || 0} />
        </Col>
        <Col span={8} className='home-col'>
          <HomeCard title="Total du revenu" content={`${totalIncomea}€`} />
        </Col>
      </Row>
      <Button onClick={showAddPropertyModal}>Add property</Button>
    </div>
    <Table columns={columns} dataSource={properties} pagination={{ pageSize: 8 }} />
  </div>
}