import { Button } from '@/commons/button';
import { Text } from '@/commons/text';
import Link from 'next/link';
import { InputPassword, SubmitButton, TextInput } from '@/commons/forms';
import LoginFormProvider from './providers/LoginFormProvider';
import { SIGNUP } from '@/utils/const';
import { AuthLayout } from '@/commons/layouts';

export const Login = () => {
  return (
    <AuthLayout>
      <Text type='h1'>Login</Text>

      <LoginFormProvider>
        <TextInput id='email' label='Email' />
        <InputPassword id='password' label='Password' />

        <SubmitButton text='Login' loadingText='Login in...' />

        <Text textAlign='center'>
          {"Don't"} you have an account?
          <Button variant='text' component={Link} href={SIGNUP}>
            Sign up
          </Button>
        </Text>
      </LoginFormProvider>
    </AuthLayout>
  );
};
