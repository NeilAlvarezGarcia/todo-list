import { Product } from '@/interfaces';
import { addProduct } from '@/services';
import { activeProducte } from '@/utils/const';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AddButton } from '..';
import { ProductForm } from './ProductForm';
import { generateRandomId, validateFormData } from '@/utils/helpers';
import moment from 'moment';

type Props = {
  refresh: () => Promise<void>;
};

type FormType = Omit<Omit<Omit<Product, 'id'>, 'createdAt'>, 'updatedAt'>;

const INITIAL_STATE: FormType = {
  name: '',
  stock: 0,
  price: 0,
  state: activeProducte,
};

export const AddProduct: FC<Props> = ({ refresh }) => {
  const [formData, setFormData] = useState<FormType>(INITIAL_STATE);
  const [error, setError] = useState('');
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

    if (!validateFormData(formData)) return setError('Los campos no pueden estar vacios');

    toggleLoader();
    setError('');

    const id = generateRandomId();

    try {
      const currentTime = moment().valueOf();

      const productData: Product = {
        ...formData,
        id,
        createdAt: currentTime,
        updatedAt: currentTime,
      };

      await addProduct(productData);
      await refresh();
    } catch (error) {
      setError('Ocurrio un error creando el producto');
    } finally {
      toggleLoader();
      close();
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <AddButton textBtn='Nuevo producto'>
      {(close) => (
        <ProductForm
          error={error}
          formData={formData as Product}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(close, e)}
          loading={loading}
        />
      )}
    </AddButton>
  );
};
