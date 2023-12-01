import { Product } from '@/interfaces';
import { addProduct } from '@/services';
import { activeProduct } from '@/utils/const';
import { FC } from 'react';
import { AddButton } from '..';
import { ProductForm } from './ProductForm';
import { generateRandomId, validateFormData } from '@/utils/helpers';
import moment from 'moment';
import { useForm } from '@/hooks';

type Props = {
  refresh: () => Promise<void>;
};

type FormType = Omit<Omit<Omit<Product, 'id'>, 'createdAt'>, 'updatedAt'>;

const INITIAL_STATE: FormType = {
  name: '',
  stock: 0,
  price: 0,
  state: activeProduct,
};

export const AddProduct: FC<Props> = ({ refresh }) => {
  const { onSubmit, onValueChange, watch, error, setError, loading, toggleLoader, reset } =
    useForm<FormType>(INITIAL_STATE);
  const formData = watch();

  const handleSubmit = async (data: FormType, close: VoidFunction) => {
    if (!validateFormData(formData)) return setError('Los campos no pueden estar vacios');

    toggleLoader();
    setError('');

    try {
      const currentTime = moment().valueOf();

      const productData: Product = {
        ...data,
        id: generateRandomId(),
        createdAt: currentTime,
        updatedAt: currentTime,
      };

      await addProduct(productData);
      await refresh();
    } catch (error) {
      setError('Ocurrio un error creando el producto');
    } finally {
      close();
      reset();
    }
  };

  return (
    <AddButton textBtn='Nuevo producto'>
      {(close) => (
        <ProductForm
          error={error}
          formData={formData as Product}
          handleChange={onValueChange}
          handleSubmit={(e) => onSubmit((data) => handleSubmit(data, close))(e)}
          loading={loading}
        />
      )}
    </AddButton>
  );
};
