import { UpdatePassword } from '@components/forms/UpdatePassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword/>
    </Suspense>
  )
}

export default page
