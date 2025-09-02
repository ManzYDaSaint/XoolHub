import React from 'react'
import AuthT from '../../hooks/tauth'
import Layout from '../../components/layout'
import DisciplinaryComponent from './index'

const Disciplinary = () => {
  return (
    <AuthT>
      <Layout>
        <DisciplinaryComponent />
      </Layout>
    </AuthT>
  )
}

export default Disciplinary