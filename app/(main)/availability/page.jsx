import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import AvailabilityForm from './_components/AvailabilityForm'
import { defaultAvailability } from './data'

export default async function AvailabilityPage() {
  
    const availability = await getUserAvailability()
 
    
    return (
    <AvailabilityForm initialData={availability || defaultAvailability} />
  )
}
