import { useState, useEffect } from 'react';

const useFormValidationState = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        // Form is valid, you can submit here
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(key => {
      const rule = validationRules[key];
      const value = values[key];
      
      if (rule.required && (!value || value.trim() === '')) {
        newErrors[key] = `${key} is required`;
      } else if (rule.minLength && value && value.length < rule.minLength) {
        newErrors[key] = `${key} must be at least ${rule.minLength} characters`;
      } else if (rule.maxLength && value && value.length > rule.maxLength) {
        newErrors[key] = `${key} must be no more than ${rule.maxLength} characters`;
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[key] = rule.message || `${key} is invalid`;
      } else if (rule.custom && value) {
        const customError = rule.custom(value);
        if (customError) {
          newErrors[key] = customError;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (callback) => {
    const isValid = validate();
    if (isValid) {
      setIsSubmitting(true);
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues
  };
};

export default useFormValidationState;