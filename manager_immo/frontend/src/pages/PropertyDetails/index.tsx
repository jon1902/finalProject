import { useEffect, useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';
import { useParams } from 'react-router-dom'
import { api } from '../../config/api';
import { AddPropertyHistoryModal } from '../../components/Modals/AddPropertyHistoryModal/index';
import { formatDate } from '../../utils/formatDate';
import { IPropertyHistory, EditPropertyHistoryModal } from '../../components/Modals/EditPropertyHistoryModal'
import './PropertyDetails.css'

const { Title } = Typography

export const PropertyDetailsPage = () => {
    const { propertyId } = useParams();

    const [property, setProperty] = useState(null);
    const [propertyHistory, setPropertyHistory] = useState<any[]>([])
    const [currentPropertyHistory, setCurrentPropertyHistory] = useState({})
    const [isAddPropertyHistoryModalOpen, setIsAddPropertyHistoryModalOpen] = useState(false);
    const [isEditPropertyHistoryModalOpen, setIsEditPropertyHistoryModalOpen] = useState(false);
    
    useEffect(()=> {
        const getPropertyById = async () => {
            try {
              const res = await api.get(`/properties/${propertyId}`)

              setProperty(res?.data)
            } catch (err) {
                console.error(err)
            }
        }

        const getPropertyHistoryById = async () => {
            try {
                const res = await api.get(`/propertyHistory/properties/${propertyId}`)
                console.log(res)

                setPropertyHistory(res?.data)
            } catch (err) {
                console.error(err)
            }
        }
        
        getPropertyHistoryById()
        getPropertyById()
    }, [propertyId])

    const showAddPropertyHistoryModal = () => {
        setIsAddPropertyHistoryModalOpen(true);
    }


    const showEditPropertyHistoryModal = (propertyHistory: IPropertyHistory) => {
      setCurrentPropertyHistory(propertyHistory);
      setIsEditPropertyHistoryModalOpen(true);
    }
    
    const onSaveAddPropertyHistoryModal = (newPropertyHistory: any) => {
        const newPropertyHistoryTab = [...propertyHistory, newPropertyHistory]
  
        setPropertyHistory(newPropertyHistoryTab)
        setIsAddPropertyHistoryModalOpen(false);
      };

      const onSaveEditPropertyHistoryModal = (propertyHistoryEdited: IPropertyHistory) => {
        const newPropertyHistoryTab = propertyHistory.map((el) => {
          return el.id === propertyHistoryEdited.id ? propertyHistoryEdited : el
        })
  
        setPropertyHistory(newPropertyHistoryTab)
        setIsAddPropertyHistoryModalOpen(false);
      };

      const onDeletePropertyHistory = async (propertyHistoryId: number) => {
        try{
          await api.delete(`/propertyHistory/${propertyHistoryId}`)
  
          const newPropertiHistory = propertyHistory.filter((property) => property.id !== propertyHistoryId)
  
          setPropertyHistory(newPropertiHistory)
        } catch(err) {
          console.error(err)
        }
      }  
  
      const onCancelAddPropertyHistoryModal = () => {
        setIsAddPropertyHistoryModalOpen(false);
      };

      const onCancelEditPropertyHistoryModal = () => {
        setIsEditPropertyHistoryModalOpen(false);
      };

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Incomea',
          dataIndex: 'incomea',
          key: 'incomea',
        },
        {
            title: 'StartAt',
            dataIndex: 'startAt',
            key: 'startAt',  
        },
        {
            title: 'EndAt',
            dataIndex: 'endAt',
            key: 'endAt',  
            render: (endAt) => <>{formatDate(endAt)}</>
        },
        {
          title: '',
          key: 'action',
          align: 'right',
          render: (propertyHistory) => {
            //TODO: mettre une modal de confirmation
            return (
              <Space size="middle">
                <Button onClick={() => showEditPropertyHistoryModal(propertyHistory)}>Edit</Button>
                <Button danger onClick={() => onDeletePropertyHistory(propertyHistory.id)}>Delete</Button>
              </Space>
            )
          },
        },
      ]
    
    return <div className='details-page-wrapper'>
        <AddPropertyHistoryModal 
            open={isAddPropertyHistoryModalOpen}
            onSave={onSaveAddPropertyHistoryModal} 
            onCancel={onCancelAddPropertyHistoryModal} 
            propertyId={propertyId}
        />
        <EditPropertyHistoryModal
            open={isEditPropertyHistoryModalOpen}
            onSave={onSaveEditPropertyHistoryModal} 
            onCancel={onCancelEditPropertyHistoryModal} 
            propertyHistory={currentPropertyHistory}
        />
        <Title type="secondary">{property?.['name']}</Title>
        <Button className='add-property-history-button' onClick={showAddPropertyHistoryModal}>Add property history</Button>
        <Table columns={columns} dataSource={propertyHistory} pagination={{ pageSize: 8 }} />
    </div>
}



