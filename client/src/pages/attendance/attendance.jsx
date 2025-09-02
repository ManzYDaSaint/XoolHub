import React from 'react'
import AuthT from '../../hooks/tauth'
import Layout from '../../components/layout'
import AttendanceComponent from './index'

const Attendance = () => {
  return (
    <AuthT>
      <Layout>
        <AttendanceComponent />
      </Layout>
    </AuthT>
  )
}

export default Attendance