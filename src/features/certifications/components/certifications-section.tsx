import React from 'react'

import Header from './Header'
import CertificateList from './CertificateList'

export function CertificationsSection() {
  return (
    <section 
      id="certificates" 
      className="py-6 relative"
    >
        <Header/>
        <CertificateList />
    </section>
  )
}
