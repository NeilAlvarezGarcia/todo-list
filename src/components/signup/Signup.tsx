import { Button } from '@/commons/button';
import { Text } from '@/commons/text';
import Link from 'next/link';
import { InputPassword, SubmitButton, TextInput } from '@/commons/forms';
import SignupFormProvider from './providers/SignupFormProvider';
import { LOGIN } from '@/utils/const';
import { AuthLayout } from '@/commons/layouts';

export const Signup = () => {
  return (
    <AuthLayout>
      <Text type='h1'>Signup</Text>

      <SignupFormProvider>
        <TextInput id='email' label='Email' />
        <InputPassword id='password' label='Password' />
        <InputPassword id='confirm-password' label='Confirm password' />

        <SubmitButton text='Sign up' loadingText='Signing up...' />

        <Text textAlign='center'>
          {"Don't"} you have an account?
          <Button variant='text' component={Link} href={LOGIN}>
            Login
          </Button>
        </Text>
      </SignupFormProvider>
    </AuthLayout>
  );
};
