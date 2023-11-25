import { Input, Select } from '@/commons/forms';
import { FormData } from '@/interfaces';
import { createUser } from '@/services';
import { ADMIN_ROL, EMPLYEE_ROL } from '@/util/const';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AddButton } from '..';
import s from '@/styles/forms.module.css';
import { validateUserData } from '@/util/helpers';

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
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errorLogin, setErrorLogin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleLoader = () => setLoading((prevState) => !prevState);

  const handleSubmit = async (close: VoidFunction, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const infoValidated = validateUserData(formData);

    if (infoValidated) return setErrorLogin(infoValidated);

    toggleLoader();
    setErrorLogin('');

    try {
      await createUser(formData);
      await refresh();
    } catch (error) {
      setErrorLogin('Ocurrio un error creando el usuario');
    } finally {
      toggleLoader();
      close();
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <AddButton textBtn='Nuevo usuario'>
      {(close) => (
        <form className={s.formModal} onSubmit={(e) => handleSubmit(close, e)}>
          <div className={s.wrapper}>
            <h3>Añadir nuevo usario</h3>

            <Input label='Nombre' name='name' value={formData.name} onValueChange={handleChange} />
            <Input
              label='Correo electrónico'
              name='email'
              value={formData.email}
              onValueChange={handleChange}
            />
            <Input
              label='Contraseña'
              name='password'
              type='password'
              value={formData.password}
              onValueChange={handleChange}
            />

            <Select
              label='Rol'
              name='role'
              options={[
                { name: ADMIN_ROL, value: ADMIN_ROL },
                { name: EMPLYEE_ROL, value: EMPLYEE_ROL },
              ]}
              onValuechange={handleChange}
              value={formData.role}
            />

            <p className={`${s.textError} ${Boolean(errorLogin) && s.active}`}>{errorLogin}</p>
          </div>

          <button>{loading ? 'Agregando usuario...' : 'Agregar usuario'}</button>
        </form>
      )}
    </AddButton>
  );
};
