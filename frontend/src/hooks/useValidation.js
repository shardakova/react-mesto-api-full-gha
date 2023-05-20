import { useState } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function onInput (event) {
    const input = event.target;
    if (input.checkValidity()) {
      setErrors(errors => {
        const filteredErrors = Object.entries(errors).filter(([key]) => key !== input.name);
        return Object.fromEntries(filteredErrors);
      });
    } else {
      setErrors(errors => ({ ...errors, [input.name]: input.validationMessage }));
    }
    setIsValid(input.closest('form').checkValidity());
  }

  function resetValidation () {
    setErrors({});
    setIsValid(false);
  }

  return [onInput, errors, isValid, resetValidation];
};

export default useValidation;
