import { ChangeEvent, FormEvent, useState } from 'react';

export const useForm = <T>(initial_state: T) => {
  const [formData, setFormData] = useState<T>(initial_state);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onValueChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit =
    (callBackSubmit: (data: T) => Promise<void>) => (e: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      callBackSubmit(formData);
    };

  const toggleLoader = () => setLoading((prevState) => !prevState);

  const watch = () => formData;
  const reset = () => {
    setFormData(initial_state);
    setError('');
    setLoading(false);
  };

  return { onValueChange, watch, error, loading, onSubmit, setError, toggleLoader, reset };
};
