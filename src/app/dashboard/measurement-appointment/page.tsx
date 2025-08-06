import { fetchAppointments } from 'config/fetch';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React from 'react'
const Measurement = dynamic(() => import('./Measurement'));
const Page = async () => {
   const allCookies = await cookies();
   const token =
     allCookies.get("super_admin_access_token")?.value ||
     allCookies.get("admin_access_token")?.value;
   
  const appointments = await fetchAppointments(token);
  return (
    <Measurement appointments={appointments} title='Measurement Appointment' />
  )
}

export default Page