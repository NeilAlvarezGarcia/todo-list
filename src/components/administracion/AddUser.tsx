import { Input, Select } from '@/commons/forms';
import { FormData } from '@/interfaces';
import { createUser } from '@/services';
import { ADMIN_ROL, EMPLYEE_ROL } from '@/utils/const';
import { FC } from 'react';
import { AddButton } from '..';
import s from '@/styles/forms.module.css';
import { validateUserData } from '@/utils/helpers';
import { useForm } from '@/hooks';

type Props = {
  refresh: () => Promise<void>;
};

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
  name: '',
  role: ADMIN_ROL,
};

export const AddUser: FC<Props> = ({ refresh }) => {
  const { onSubmit, onValueChange, watch, error, setError, loading, toggleLoader, reset } =
    useForm<FormData>(INITIAL_STATE);
  const { email, password, name, role } = watch();

  const handleSubmit = async (data: FormData, close: VoidFunction) => {
    const infoValidated = validateUserData(data);

    if (infoValidated) return setError(infoValidated);

    toggleLoader();
    setError('');

    try {
      await createUser(data);
      await refresh();
    } catch (error) {
      setError('Ocurrio un error creando el usuario');
    } finally {
      close();
      reset();
    }
  };

  return (
    <AddButton textBtn='Nuevo usuario' reset={reset}>
      {(close) => (
        <form
          className={s.formModal}
          onSubmit={(e) => onSubmit((data) => handleSubmit(data, close))(e)}>
          <div className={s.wrapper}>
            <h3>Añadir nuevo usario</h3>

            <Input label='Nombre' name='name' value={name} onValueChange={onValueChange} />
            <Input
              label='Correo electrónico'
              name='email'
              value={email}
              onValueChange={onValueChange}
            />
            <Input
              label='Contraseña'
              name='password'
              type='password'
              value={password}
              onValueChange={onValueChange}
            />

            <Select
              label='Rol'
              name='role'
              options={[
                { name: ADMIN_ROL, value: ADMIN_ROL },
                { name: EMPLYEE_ROL, value: EMPLYEE_ROL },
              ]}
              onValuechange={onValueChange}
              value={role}
            />

            <p className={`${s.textError} ${Boolean(error) && s.active}`}>{error}</p>
          </div>

          <button>{loading ? 'Agregando usuario...' : 'Agregar usuario'}</button>
        </form>
      )}
    </AddButton>
  );
};
