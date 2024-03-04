import { IProperty } from "@/app/(tabs)"
import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { api } from "@/config/api";
import { router } from 'expo-router';

interface IPropertyContext {
    properties: IProperty[];
    currentProperty: IProperty | null;
    onSetCurrentProperty: (property: IProperty | null) => void;
    onSaveProperty: (property: {name: string; address: string;}) => void;
    onDeleteProperty: (propertyId: number) => void;
    getProperties: () => Promise<void>;
}

export const PropertyContext = createContext<IPropertyContext>({
    properties: [],
    currentProperty: null,
    onSetCurrentProperty: (property: IProperty | null) => {},
    onSaveProperty: (property: {name: string; address: string;}) => {},
    onDeleteProperty: (propertyId: number) => {},
    getProperties: async () => {}
})

export const PropertyContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentProperty, setCurrentProperty] = useState<IProperty | null>(null);
    const [properties, setProperties] = useState<IProperty[]>([])

    const getProperties = async () => {
        try{
          const res = await api.get('/properties/with/incomea')
  
          setProperties(res?.data)
        } catch(err) {
          console.error(err)
        }
    }
    
    useEffect(() => {
        getProperties()
    }, [])

    const onSetCurrentProperty = (property: IProperty | null) => {
        setCurrentProperty(property)
    }

    const onSaveProperty = async (values: {name: string; address: string;}) => {
        try{
          if(currentProperty) {
            await api.patch(`/properties/${currentProperty.id}`, values) 

            getProperties()

            setCurrentProperty(null)

            router.navigate('(tabs)/properties')

            return;
          }
    
          await api.post(`/properties`, values) 
    
          getProperties()
    
          router.navigate('(tabs)/properties')
        } catch(err) {
            console.error(err)
        }
      };

      const onDeleteProperty = async (propertyId: number) => {
        try {
            if(propertyId) {
                await api.delete(`/properties/${propertyId}`) 
    
                getProperties()
        
                return;
              }
        } catch(err) {
            console.error(err)
        }
      }
    

    const value = useMemo(() => {
        return {
            currentProperty,
            properties,
            onSaveProperty,
            onSetCurrentProperty,
            onDeleteProperty,
            getProperties
        }
    }, [currentProperty, properties])

    return <PropertyContext.Provider value={value}>
        {children}
    </PropertyContext.Provider>
}

export const usePropertyContext = () => {
    return useContext(PropertyContext)
}
