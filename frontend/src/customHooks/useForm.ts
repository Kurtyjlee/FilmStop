import { SyntheticEvent, useState } from "react";

// functional component to use a form
export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (event: any) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await callback(values);
  }

  return {
    handleInputChange,
    handleSubmit
  };
}