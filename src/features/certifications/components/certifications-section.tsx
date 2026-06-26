import React from 'react'

import Header from './Header'
import SingleCertificate from './SingleCertificate'
import { useSectionTracking } from '@/hooks/useSectionTracking'

export function CertificationsSection() {

  useSectionTracking("certificates");

  return (
    <section 
      id="certificates" 
      className="py-6 relative"
    >
        <Header/>
        <SingleCertificate />
    </section>
  )
}
