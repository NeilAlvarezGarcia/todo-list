import { FormData } from '@/interfaces';
import { createUser } from '@/services';
import { useRouter } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { SignupSchema } from '../schemas/signupSchema';
import { PropsWithChildren, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';

const INITIAL_VALUES = {
  email: '',
  password: '',
  'confirm-password': '',
};

const SignupFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: FormData) => {
    try {
      setError('');
      await createUser(data);
      push(HOME);
    } catch (err: any) {
      const error = err.code?.split('/')[1]?.replace(/-/g, ' ').toUpperCase() || err.message;
      setError(error);
    }
  };

  return (
    <FormProvider schema={SignupSchema} submit={handleSubmit} defaultValues={INITIAL_VALUES}>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </FormProvider>
  );
};

export default SignupFormProvider;
