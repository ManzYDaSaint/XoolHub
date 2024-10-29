import React from 'react'
import UniversalTable from '../../components/table.jsx'
import api from '../../services/apiServices.jsx';
import toast from 'react-hot-toast';

const ReportTable = ({ reportData, data }) => {

  const handleSubmit = async (data) => {
    try {
      const res = await api.getCode({ data });
      const code = res.data.codes
      console.log(code)

      // if (code.length === 0) {
      //   const reportData = data.map((item, index) => ({
      //     print: "",
      //     sr: "",
      //     agg: "",
      //     name: "No records found...",
      //   }));
      // }
      // else {
      //   const reportData = code.map((item, index) => ({

      //   }));
      // }

    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const reportColumn = [
    { key: 'print', label: 'Print', width: '10%' },
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'agg', label: 'Agg', width: '10%' },
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'subject', label: 'Subject', width: '10%' },
  ];


  return (
    <div>
        <UniversalTable columns={reportColumn} data={reportData} />
    </div>
  )
}

export default ReportTable