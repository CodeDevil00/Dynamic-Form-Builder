import React, { useState } from 'react';
import FormField from './FormField';

function DynamicForm({ formResponse }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const currentSection = formResponse.form.sections[currentSectionIndex];

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Collected Form Data:', formData);
    setFormData({});
    setCurrentSectionIndex(0);
  };

  
  const getSortedFields = (fields) => {
    return [...fields].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.label.localeCompare(b.label);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl transition duration-500">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center animate-fade-in">
          {currentSection.title}
        </h2>

        <div className="space-y-5">
          {getSortedFields(currentSection.fields).map((field) => (
            <div key={field.fieldId} className="animate-fade-in-up">
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
              </label>
              <FormField
                field={field}
                value={formData[field.fieldId] || ''}
                onChange={(value) => handleFieldChange(field.fieldId, value)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          {currentSectionIndex > 0 ? (
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition hover:cursor-pointer"
              onClick={handlePrev}
            >
              Prev
            </button>
          ) : <div />}

          {currentSectionIndex < formResponse.form.sections.length - 1 ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
