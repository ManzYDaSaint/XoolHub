import React from 'react';
import { Slack } from 'lucide-react';

const schools = [
  { school: 'Atsikana Pa Ulendo Private Secondary School', logo: Slack },
  { school: 'Mchinji Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
  { school: 'Salima Secondary School', logo: Slack },
];

const Schools = () => {
  return (
    <div className="schools">
      <h2>Our Clients</h2>
      <h5>Trusted and partnered <br />with leading schools</h5>
      <p>Our platform is trusted and partnered with leading schools across <br />the country and used by teachers, administrators, and parents daily.</p>
      <div className="plan-cards">
        {schools.map((sid, index) => (
          <div key={index} className="plan-card">
            <sid.logo size={40} />
            <h3>{sid.school}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
