import React from 'react'
import TermPro from './assets/subjectPro.png'
import SubjectData from '../../../../helpers/subject/subjectData'

const Subject = () => {
  return (
    <div class="border-2 border-gray-300 rounded-lg p-4">
      <div class="flex items-center border-b-2 border-gray-300 pb-3">
        <img src={TermPro} alt="contentIcon" className="h-16" />
        <h5 className="text-lg font-semibold text-gray-600 border-l-2 border-gray-300 pl-4 ml-4">
          Subjects
        </h5>
      </div>
      <div class="col-lg-12">
        <div class="examination__container mt-4">
          <SubjectData />
        </div>
      </div>
    </div>
  )
}

export default Subject