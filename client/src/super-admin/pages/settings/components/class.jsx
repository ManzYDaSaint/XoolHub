import React from 'react'
import ClassData from '../../../../helpers/class/classData'
import TermPro from './assets/classPro.png'

const Class = () => {
  return (
    <div class="border-2 border-gray-300 rounded-lg p-4">
      <div class="flex items-center border-b-2 border-gray-300 pb-3">
        <img src={TermPro} alt="contentIcon" className="h-16" />
        <h5 className="text-lg font-semibold text-gray-600 border-l-2 border-gray-300 pl-4 ml-4">
          Classes
        </h5>
      </div>
      <div class="col-lg-12">
        <div class="examination__container mt-4">
          <ClassData />
        </div>
      </div>
    </div>
  )
}

export default Class