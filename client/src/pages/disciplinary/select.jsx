import React, { useState } from 'react';
import FormSelect from '../../components/input/formSelect';

const SelectExample = () => {
  const [formData, setFormData] = useState({
    category: '',
    severity: '',
    status: '',
    examType: '',
    grade: '',
    disabledField: 'disabled'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validation
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.severity) newErrors.severity = 'Severity level is required';
    if (!formData.status) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Reusable FormSelect Component Examples
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Select with Required Field */}
        <FormSelect
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          error={!!errors.category}
          errorMessage={errors.category}
          placeholder="Select category..."
        >
          <option value="Academic Misconduct">Academic Misconduct</option>
          <option value="Behavioral Issues">Behavioral Issues</option>
          <option value="Bullying">Bullying</option>
          <option value="Dress Code Violation">Dress Code Violation</option>
          <option value="Fighting">Fighting</option>
          <option value="Late Arrival">Late Arrival</option>
          <option value="Property Damage">Property Damage</option>
          <option value="Substance Abuse">Substance Abuse</option>
          <option value="Truancy">Truancy</option>
          <option value="Other">Other</option>
        </FormSelect>

        {/* Select with Different Options */}
        <FormSelect
          label="Severity Level"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
          error={!!errors.severity}
          errorMessage={errors.severity}
          placeholder="Choose severity..."
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </FormSelect>

        {/* Select with Status Options */}
        <FormSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          error={!!errors.status}
          errorMessage={errors.status}
          placeholder="Select status..."
        >
          <option value="Pending">Pending</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </FormSelect>

        {/* Optional Select (not required) */}
        <FormSelect
          label="Exam Type"
          name="examType"
          value={formData.examType}
          onChange={handleChange}
          placeholder="Choose exam type (optional)..."
        >
          <option value="JCE">JCE</option>
          <option value="MSCE">MSCE</option>
          <option value="IGCSE">IGCSE</option>
          <option value="A-Level">A-Level</option>
        </FormSelect>

        {/* Select with Grade Options */}
        <FormSelect
          label="Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Select grade..."
        >
          <option value="A+">A+ (Excellent)</option>
          <option value="A">A (Very Good)</option>
          <option value="B+">B+ (Good)</option>
          <option value="B">B (Satisfactory)</option>
          <option value="C+">C+ (Fair)</option>
          <option value="C">C (Pass)</option>
          <option value="D">D (Below Average)</option>
          <option value="F">F (Fail)</option>
        </FormSelect>

        {/* Disabled Select */}
        <FormSelect
          label="Disabled Field"
          name="disabledField"
          value={formData.disabledField}
          onChange={handleChange}
          disabled
          placeholder="This field is disabled"
        >
          <option value="disabled">Disabled Option</option>
        </FormSelect>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setFormData({
              category: '',
              severity: '',
              status: '',
              examType: '',
              grade: '',
              disabledField: 'disabled'
            })}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Usage Examples */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Usage Examples:</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Basic Usage:</strong></p>
          <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`<FormSelect
  label="Category"
  name="category"
  value={value}
  onChange={handleChange}
  required
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</FormSelect>`}
          </pre>
          
          <p className="mt-3"><strong>With Error Handling:</strong></p>
          <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`<FormSelect
  label="Category"
  name="category"
  value={value}
  onChange={handleChange}
  required
  error={!!errors.category}
  errorMessage={errors.category}
>
  <option value="option1">Option 1</option>
</FormSelect>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SelectExample;
