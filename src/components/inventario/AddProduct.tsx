import { Product } from '@/interfaces';
import { addProduct } from '@/services';
import { activeProducte } from '@/util/const';
import randomstring from 'randomstring';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AddButton } from '..';
import { ProductForm } from './ProductForm';

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

    // if (!Object.values(formData).every((val) => !Boolean(val))) return;

    toggleLoader();
    setError('');

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
          formData={formData}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(close, e)}
          loading={loading}
        />
      )}
    </AddButton>
  );
};
