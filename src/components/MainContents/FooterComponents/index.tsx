import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const FooterComponents = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Malab Reseach @{new Date().getFullYear()} Created By Kosei
    </Footer>
  )
}

export default FooterComponents