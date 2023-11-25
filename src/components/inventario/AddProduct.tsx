import { Input, Select } from '@/commons/forms';
import { Product } from '@/interfaces';
import { addProduct } from '@/services';
import { activeProducte, inactiveProducte } from '@/util/const';
import randomstring from 'randomstring';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AddButton } from '..';
import s from '@/styles/forms.module.css';

type Props = {
  refresh: () => Promise<void>;
};

const INITIAL_STATE: Product = {
  id: '',
  name: '',
  stock: 0,
  price: 0,
  state: activeProducte,
};

export const AddProduct: FC<Props> = ({ refresh }) => {
  const [formData, setFormData] = useState<Product>(INITIAL_STATE);
  const [errorLogin, setErrorLogin] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLoader = () => setLoading((prevState) => !prevState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (close: VoidFunction, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleLoader();
    setErrorLogin('');

    const id = randomstring.generate({
      length: 12,
      charset: 'numeric',
    });

    try {
      const productData = {
        ...formData,
        id,
      };

      await addProduct(productData);
      await refresh();
    } catch (error) {
      setErrorLogin('Ocurrio un error creando el producto');
    } finally {
      toggleLoader();
      close();
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <AddButton textBtn='Nuevo producto'>
      {(close) => (
        <form className={s.formModal} onSubmit={(e) => handleSubmit(close, e)}>
          <div className={s.wrapper}>
            <h3>Añadir nuevo producto</h3>

            <Input label='Nombre' name='name' value={formData.name} onValueChange={handleChange} />
            <Input
              label='Cantidad de producto'
              name='stock'
              type='number'
              value={formData.stock}
              onValueChange={handleChange}
            />
            <Input
              label='Precio'
              name='price'
              value={formData.price}
              onValueChange={handleChange}
            />

            <Select
              label='Estado'
              name='state'
              options={[
                { name: activeProducte, value: activeProducte },
                { name: inactiveProducte, value: inactiveProducte },
              ]}
              value={formData.state}
              onValuechange={handleChange}
            />

            <p className={`${s.textError} ${Boolean(errorLogin) && s.active}`}>{errorLogin}</p>
          </div>

          <button>{loading ? 'Agregando producto...' : 'Agregar producto'}</button>
        </form>
      )}
    </AddButton>
  );
};
