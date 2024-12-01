import React from 'react'
import { AlarmClock, MonitorCog, Workflow } from 'lucide-react'

const propers = [
    { title: 'Save Time', description: 'Save almost 70% of your time by automating tasks on administrative work.', logo: AlarmClock },
    { title: 'Your-One-Stop-Solution', description: 'Stay in control of your schools operations anywhere,anytime.', logo: MonitorCog },
    { title: 'Enhance Workflow', description: 'Streamline tasks and improve efficiency, accuracy, collaboration with parents.', logo: Workflow },
  ];

const Props = () => {
  return (
    <div className='props-container'>
        {propers.map((prop, index) => (
        <div className="props-card" key={index}>
            <prop.logo size={50} />
            <h4>{prop.title}</h4>
            <p>{prop.description}</p>
        </div>
        ))}
    </div>
  )
}

export default Props