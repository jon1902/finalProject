import { IProperty } from "@/app/(tabs)"
import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from "react";
import { api } from "@/config/api";
import { router } from 'expo-router';
import { usePropertyContext } from "./propertyContext";

export interface IPropertyHistory {
	id: number;
	name: string;
    startAt: Date;
    endAt: Date;
    incomea: number;
	propertyId: number;
    userId: number;
}

export interface IPropertyHistoryForm {
    name: string;
    startAt: Date;
    endAt: Date;
    incomea: number;
}


interface IReservationContext {
    reservations: IPropertyHistory[];
    currentReservation: IPropertyHistory | null;
    onSetCurrentReservation: (reservation: IPropertyHistory | null) => void;
    onSaveReservation: (reservation: IPropertyHistoryForm) => void;
    onChangePropertySelected: (propertyId: number) => void;
    onDeleteHistoryProperty: (propertyHistoryId: number) => void;
}

export const ReservationContext = createContext<IReservationContext>({
    reservations: [],
    currentReservation: null,
    onSetCurrentReservation: (reservation: IPropertyHistory | null) => {},
    onSaveReservation: (reservation: IPropertyHistoryForm) => {},
    onChangePropertySelected: (propertyId: number) => {},
    onDeleteHistoryProperty: (propertyHistoryId: number) => {},
})

export const ReservationContextProvider = ({ children }: { children: ReactNode }) => {
    const { properties, getProperties } = usePropertyContext();

    const [currentReservation, setCurrentReservation] = useState<IPropertyHistory | null>(null);
    const [currentPropertyId, setCurrentPropertyId] = useState(properties?.[0]?.id || 1)
    const [reservations, setReservations] = useState<IPropertyHistory[]>([])

    const getReservations = async (propertyId: number) => {
        try{
          const res = await api.get(`/propertyHistory/properties/${propertyId}`)
  
          setReservations(res?.data)
        } catch(err) {
          console.error(err)
        }
    }
    
    useEffect(() => {
        getReservations(currentPropertyId)
    }, [currentPropertyId])

    useEffect(() => {
        setCurrentPropertyId(properties?.[0]?.id || 1)
    }, [])

    const onChangePropertySelected = (propertyId: number) => {
        setCurrentPropertyId(propertyId)
    }

    const onSetCurrentReservation = (reservation: IPropertyHistory | null) => {
        setCurrentReservation(reservation)
    }
    
    const onSaveReservation = async (values: IPropertyHistoryForm) => {
        try{
            console.log(currentReservation, values)
          if(currentReservation) {
            await api.patch(`/propertyHistory/${currentReservation.id}`, values) 

            getProperties()
            getReservations(currentPropertyId)

            setCurrentReservation(null)

            router.navigate('(tabs)/reservations')

            return;
          }
    
          await api.post(`/propertyHistory/properties/${currentPropertyId}`, values) 
    
          getProperties()
          getReservations(currentPropertyId)

          router.navigate('(tabs)/reservations')
        } catch(err) {
            console.error(err)
        }
      };

      const onDeleteHistoryProperty = async (propertyHistoryId: number) => {
        try {
            if(propertyHistoryId) {
                await api.delete(`/propertyHistory/${propertyHistoryId}`) 
    
                getProperties()
                getReservations(currentPropertyId)
        
                return;
              }
        } catch(err) {
            console.error(err)
        }
      }
    
    const value = useMemo(() => {
        return {
            currentReservation,
            reservations,
            onSaveReservation,
            onSetCurrentReservation,
            onChangePropertySelected,
            onDeleteHistoryProperty
        }
    }, [currentReservation, reservations])

    return <ReservationContext.Provider value={value}>
        {children}
    </ReservationContext.Provider>
}

export const useReservationContext = () => {
    return useContext(ReservationContext)
}
