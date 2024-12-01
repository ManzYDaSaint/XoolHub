import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    
    if (!message) {
      newErrors.message = 'Message cannot be empty.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Message sent successfully!');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section className="contact-form">
      <div className="row">
        <div className="col-lg-6">
          <div className="contact-left">
            <h4>Let's Chat</h4>
            <p>Tell us what you want, think or believe <br />might help us deliver the best solution for you.</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="contact-right">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && <p className="error">{errors.message}</p>}
              
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
