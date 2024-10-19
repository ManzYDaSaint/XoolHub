import React, { useEffect, useState } from 'react'
import api from '../../services/apiServices';
import AveTable from '../table/avetable';

const AveData = () => {
    const [aveData, setAveData] = useState([]);

    // Fetch all the exams
    const fetchData = async () => {
        const res = await api.getAveSubject();

        if(res.data.length === 0) {
            const data = [
                {
                    'sr': "",
                    'subject': "No records found...",
                    'average': "",
                    'year': "",
                    'term': "",
                    'exam': "",
                    'class': "",
                }
            ];
            const aveData = data.map((item, index) => ({
                sr: '',
                subject: item.subject,
                average: "",
                year: "",
                term: "",
                exam: "",
                class: "",
                }));
            setAveData(aveData);
        }
        else {
            const data = res.data.topSubject[0].subject;
            const aveData = data.map((item, index) => ({
            sr: index + 1,
            subject: item.subject,
            average: item.average,
            year: item.year,
            term: item.term,
            exam: item.exam,
            class: item.class,
            }));
            setAveData(aveData);
        }
      };
    
      useEffect(() => {
          fetchData();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
        <table class="custom__table table-hover mt-4 w-100" id="class__table">
            <AveTable aveData={aveData}/>
        </table>
    </div>
  )
}

export default AveData