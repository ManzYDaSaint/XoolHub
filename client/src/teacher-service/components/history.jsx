import React from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import FinData from './tabs/financial/feesData'

const panes = [
  {
    menuItem: 'Academics',
    render: () => <TabPane attached={false}>
      <h5>Academics</h5>
    </TabPane>,
  },
  {
    menuItem: 'Fees History',
    render: () => <TabPane attached={false}>
      <FinData />
    </TabPane>,
  },
  {
    menuItem: 'Attendance',
    render: () => <TabPane attached={false}>Tab 3 Content</TabPane>,
  },
]

const StudentHistory = () => <Tab menu={{ pointing: true }} panes={panes} />

export default StudentHistory