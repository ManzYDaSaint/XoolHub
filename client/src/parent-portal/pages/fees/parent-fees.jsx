/*************  ✨ Codeium Command ⭐  *************/
import React, { useState, useEffect } from 'react';
import { Table, Header, Icon, Segment } from 'semantic-ui-react';
import api from '../../../services/apiServices';
import TopNav from '../../components/topnav';
import ParentNavBar from '../../components/navbar';

const ParentFees = () => {
  const [feesStructure, setFeesStructure] = useState([]);
  const [feesHistory, setFeesHistory] = useState([]);

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        const structureRes = await api.getFeeStructure();
        setFeesStructure(structureRes.data);

        const historyRes = await api.getFeeHistory();
        setFeesHistory(historyRes.data);
      } catch (error) {
        console.error('Error fetching fees data:', error);
      }
    };

    fetchFeesData();
  }, []);

  return (
    <div className="parent_container">
      <div className="parent_content">
    <div className="parent-fees">
        <TopNav />
      <Segment>
        <Header as="h2">
          <Icon name="dollar sign" />
          <Header.Content>Fees Structure</Header.Content>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SR</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {feesStructure.map((fee, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{fee.name}</Table.Cell>
                <Table.Cell>{fee.amount}</Table.Cell>
                <Table.Cell>{fee.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>

      <Segment>
        <Header as="h2">
          <Icon name="history" />
          <Header.Content>Fees History</Header.Content>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SR</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {feesHistory.map((history, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{new Date(history.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{history.amount}</Table.Cell>
                <Table.Cell>{history.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      <ParentNavBar />
    </div>
    </div>
    </div>
  );
};

export default ParentFees;

