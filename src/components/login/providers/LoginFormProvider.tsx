import { FormData } from '@/interfaces';
import { loginUser } from '@/services';
import { useRouter } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { LoginSchema } from '../schemas/loginSchema';
import { PropsWithChildren, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

const LoginFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: FormData) => {
    try {
      await loginUser(data);
      setError('');
      push(HOME);
    } catch (err: any) {
      const error = err.code?.split('/')[1]?.replace(/-/g, ' ').toUpperCase() || err.message;
      setError(error);
    }
  };

  return (
    <FormProvider schema={LoginSchema} submit={handleSubmit} defaultValues={INITIAL_VALUES}>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </FormProvider>
  );
};

export default LoginFormProvider;
