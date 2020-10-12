import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValue = (e) => {
    // check if the event comes as a number and just in case convert it into string
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({
      // copy the existing values into it (everything currently in state)
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  };

  return { values, updateValue };
};

export default useForm;
