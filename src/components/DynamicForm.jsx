import React, { useState } from "react";
import FormField from "./FormField";

function DynamicForm({ formResponse }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentSection = formResponse.form.sections[currentSectionIndex];

  const handleFieldChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value });
    setErrors({ ...errors, [fieldId]: null }); // clear error
  };

  const validateSection = () => {
    let newErrors = {};

    currentSection.fields.forEach((field) => {
      const value = formData[field.fieldId];

      if (field.required) {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        if (!value && !isEmptyArray) {
          newErrors[field.fieldId] =
            field.validation?.message || `${field.label} is required.`;
          return;
        }
      }

      if (typeof value === "string") {
        if (field.minLength && value.length < field.minLength) {
          newErrors[field.fieldId] =
            field.validation?.message ||
            `${field.label} must be at least ${field.minLength} characters.`;
        } else if (field.maxLength && value.length > field.maxLength) {
          newErrors[field.fieldId] =
            field.validation?.message ||
            `${field.label} must be less than ${field.maxLength} characters.`;
        }
      }

      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.fieldId] =
          field.validation?.message || `Invalid email format.`;
      }

      if (field.type === "date" && value) {
        const today = new Date();
        const dob = new Date(value);
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < 16) {
          newErrors[field.fieldId] =
            field.validation?.message || `You must be at least 16 years old.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Collected Form Data:", formData);
      setFormData({});
      setCurrentSectionIndex(0);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg animate-fade-in">
      <h2 className="text-4xl font-semibold mb-8 text-blue-700 text-center">
        {currentSection.title}
      </h2>
      {currentSection.fields.map((field) => (
        <div key={field.fieldId} className="mb-8">
          <label className="block text-xl font-medium text-gray-800 mb-3">
            {field.label}
          </label>
          <FormField
            field={field}
            value={formData[field.fieldId]}
            onChange={(value) => handleFieldChange(field.fieldId, value)}
          />
          {errors[field.fieldId] && (
            <div className="text-red-500 text-sm mt-2 font-medium">
              {errors[field.fieldId]}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-10">
        {currentSectionIndex > 0 ? (
          <button
            className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all ease-in-out transform hover:scale-105"
            onClick={handlePrev}
          >
            Prev
          </button>
        ) : (
          <div />
        )}

        {currentSectionIndex < formResponse.form.sections.length - 1 ? (
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all ease-in-out transform hover:scale-105"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all ease-in-out transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default DynamicForm;
