import { Input } from '@/commons/forms';
import { ChangeEvent, FormEvent, useState } from 'react';
import formStyles from '@/styles/forms.module.css';
import loginStyles from '@/styles/login.module.css';
import { FormData } from '@/interfaces';
import { DASHBOARD, EMPLYEE_ROL, SALES, errorMessages } from '@/utils/const';
import Head from 'next/head';
import { validateUserData } from '@/utils/helpers';
import { loginUser } from '@/services';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context';

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
};

const Login = () => {
  const { push } = useRouter();

  const { user } = useUser();

  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errorLogin, setErrorLogin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleLoader = () => setLoading((prevState) => !prevState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const infoValidated = validateUserData(formData);

    if (infoValidated) return setErrorLogin(infoValidated);

    toggleLoader();
    setErrorLogin('');

    try {
      await loginUser(formData);
    } catch (error) {
      setErrorLogin(errorMessages.invalidCredentials);
    } finally {
      toggleLoader();
      push(DASHBOARD);
    }
  };

  if (user) {
    const route = user.role === EMPLYEE_ROL ? SALES : DASHBOARD;
    push(route);
    return null;
  }

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
            type='password'
          />

          <button type='submit'>{loading ? 'Ingresando...' : 'Ingresar'}</button>

          <p className={`${loginStyles.textError} ${Boolean(errorLogin) && loginStyles.active}`}>
            {errorLogin}
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;
