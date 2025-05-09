import React, { useState } from 'react';
import FormInput from './FormInput';

export default {
  title: 'Components/FormInput',
  component: typeof FormInput,
};


export const Default = () => {
  const [argValues, setArgValues] = useState({
    text_FirstName: '',
    text_LastName: '',
    text_Email: '',
  });

  return (
    <FormInput
      argValues={argValues}
      setArgValues={setArgValues}
      disabled={false}
    />
  );
};

export const Disabled = () => {
  const [argValues, setArgValues] = useState({
    text_FirstName: 'John',
    text_LastName: 'Doe',
    text_Email: 'john.doe@example.com',
  });

  return (
    <FormInput
      argValues={argValues}
      setArgValues={setArgValues}
      disabled={true}
    />
  );
};