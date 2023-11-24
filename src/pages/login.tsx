import { Input } from '@/components/forms';
import { ChangeEvent, FormEvent, useState } from 'react';
import formStyles from '@/styles/forms.module.css';
import loginStyles from '@/styles/login.module.css';
import { FormData } from '@/interfaces';
import { validateUser } from '@/helpers';
import { useRouter } from 'next/router';
import { DASHBOARD } from '@/helpers/const';
import Head from 'next/head';
import { useUser } from '@/context';

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
};

const Login = () => {
  const { push } = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const infoValidated = await validateUser(formData);

    if (infoValidated?.isValidated) {
      login(infoValidated.user);
      push(DASHBOARD);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className={loginStyles.root}>
        <header className={loginStyles.header}>
          <h1>Bienvenido</h1>
          <p>Ingresa con tu usuario y contraseña</p>
        </header>

        <form className={formStyles.form} onSubmit={handleSubmit}>
          <Input
            label='Correo electrónico'
            name='email'
            value={formData.email}
            onValueChange={handleChange}
          />
          <Input
            label='Contraseña'
            name='password'
            value={formData.password}
            onValueChange={handleChange}
          />

          <button type='submit'>Ingresar</button>
        </form>
      </main>
    </>
  );
};

export default Login;
