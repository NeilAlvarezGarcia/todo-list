import Head from 'next/head';
import { Signup } from '@/components/signup';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Signup />
    </>
  );
};

export default SignUpPage;
