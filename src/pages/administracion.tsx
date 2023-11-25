import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import Head from 'next/head';
import { AddButton } from '@/components/AddButton';
import { createUser, getUsers } from '@/services';
import { FormData, User } from '@/interfaces';
import { ChangeEvent, FC, FormEvent, Fragment, useState } from 'react';
import { ADMIN_ROL, EMPLYEE_ROL, TABLE_USERS_HEADER, revalidateInterval } from '@/util/const';
import { Input } from '@/commons/forms';
import s from '@/styles/administration.module.css';
import { validateUserData } from '@/util/helpers';

type Props = {
  data: User[];
};

const INITIAL_STATE: FormData = {
  email: '',
  password: '',
  name: '',
  role: ADMIN_ROL,
};

const Administracion: FC<Props> = ({ data }) => {
  const [users, setUsers] = useState(data);
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
      await refreshData();
    } catch (error) {
      // setErrorLogin(errorMessages.invalidCredentials);
    } finally {
      toggleLoader();
      close();
    }
  };

  const refreshData = async () => {
    const data = await getUsers();

    setUsers(data);
  };

  return (
    <>
      <Head>
        <title>Administración</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de usuarios'>
          <AddButton textBtn='Nuevo usuario'>
            {(close) => (
              <form className={s.form} onSubmit={(e) => handleSubmit(close, e)}>
                <div className={s.wrapper}>
                  <h3>Añadir nuevo usario</h3>

                  <Input
                    label='Nombre'
                    name='name'
                    value={formData.name}
                    onValueChange={handleChange}
                  />
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

                  <div className={s.select}>
                    <label className={s.label}>Rol</label>

                    <select name='role' value={formData.role} onChange={handleChange}>
                      <option value={ADMIN_ROL}>{ADMIN_ROL}</option>
                      <option value={EMPLYEE_ROL}>{EMPLYEE_ROL}</option>
                    </select>
                  </div>

                  <p className={`${s.textError} ${Boolean(errorLogin) && s.active}`}>
                    {errorLogin}
                  </p>
                </div>

                <button>{loading ? 'Agregando ' : 'Agregar '}usuario</button>
              </form>
            )}
          </AddButton>

          <Table
            headers={TABLE_USERS_HEADER}
            data={users as unknown as Record<string, string | number>[]}
            row={(item, i) => (
              <Fragment key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <p>Eliminar</p>
                </td>
              </Fragment>
            )}
          />
        </PageLayout>
      </DashboardLayout>
    </>
  );
};

export async function getStaticProps() {
  const data = await getUsers();

  return {
    props: {
      data,
    },
    revalidate: revalidateInterval,
  };
}

export default Administracion;
