import React from 'react'

import Header from './Header'
import SingleCertificate from './SingleCertificate'

export function CertificationsSection() {
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
