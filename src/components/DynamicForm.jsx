import React, { useState } from "react";
import FormField from "./FormField";

function DynamicForm({ formResponse }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const sections = formResponse.form.sections;
  const currentSection = sections[currentSectionIndex];

  const handleFieldChange = (fieldId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const validateSection = () => {
    let isValid = true;
    for (const field of currentSection.fields) {
      const value = formData[field.fieldId];
      if (field.required && (!value || value === "")) {
        isValid = false;
      }
      if (field.minLength && value?.length < field.minLength) {
        isValid = false;
      }
      if (field.maxLength && value?.length > field.maxLength) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Collected Form Data: ", formData);
      alert("Form submitted! Check console.");
    } else {
      alert("Please fix errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{currentSection.title}</h2>

        {currentSection.fields.map((field) => (
          <div key={field.fieldId} className="mb-4">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <FormField
              field={field}
              value={formData[field.fieldId]}
              onChange={(value) => handleFieldChange(field.fieldId, value)}
            />
          </div>
        ))}

        <div className="flex justify-between mt-6">
          {currentSectionIndex > 0 && (
            <button
              onClick={handlePrev}
              className="bg-gray-400 text-white p-2 rounded"
            >
              Prev
            </button>
          )}
          {currentSectionIndex < sections.length - 1 ? (
            <button
              onClick={() => {
                if (validateSection()) handleNext();
                else alert("Please fill fields correctly.");
              }}
              className="bg-blue-600 text-white p-2 rounded ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white p-2 rounded ml-auto"
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
