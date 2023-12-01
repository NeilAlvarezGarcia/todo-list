import { Input } from '@/commons/forms';
import formStyles from '@/styles/forms.module.css';
import loginStyles from '@/styles/login.module.css';
import { FormData } from '@/interfaces';
import { DASHBOARD, EMPLYEE_ROL, SALES, errorMessages } from '@/utils/const';
import Head from 'next/head';
import { validateUserData } from '@/utils/helpers';
import { loginUser } from '@/services';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context';
import { useForm } from '@/hooks';

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
};

const Login = () => {
  const { push } = useRouter();

  const { user } = useUser();

  const { onSubmit, onValueChange, watch, error, setError, loading, toggleLoader, reset } =
    useForm<FormData>(INITIAL_STATE);
  const { email, password } = watch();

  const handleSubmit = async (data: FormData) => {
    const infoValidated = validateUserData(data);

    if (infoValidated) return setError(infoValidated);

    toggleLoader();
    setError('');

    try {
      await loginUser(data);
    } catch (error) {
      setError(errorMessages.invalidCredentials);
    } finally {
      reset();
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

        <form className={formStyles.form} onSubmit={onSubmit(handleSubmit)}>
          <Input
            label='Correo electrónico'
            name='email'
            value={email}
            onValueChange={onValueChange}
          />
          <Input
            label='Contraseña'
            name='password'
            value={password}
            onValueChange={onValueChange}
            type='password'
          />

          <button type='submit'>{loading ? 'Ingresando...' : 'Ingresar'}</button>

          <p className={`${loginStyles.textError} ${Boolean(error) && loginStyles.active}`}>
            {error}
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;
