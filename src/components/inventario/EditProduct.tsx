import { Product } from '@/interfaces';
import { updateProduct } from '@/services';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Modal } from '..';
import { ProductForm } from './ProductForm';
import { validateFormData } from '@/utils/helpers';
import moment from 'moment';

type Props = {
  refresh: () => Promise<void>;
  editProductOpen: boolean;
  closeEditProduct: VoidFunction;
  productSelected: Product;
};

type FormType = Omit<Omit<Omit<Product, 'id'>, 'createdAt'>, 'updatedAt'>;

export const EditProduct: FC<Props> = ({
  refresh,
  editProductOpen,
  closeEditProduct,
  productSelected,
}) => {
  const [formData, setFormData] = useState<FormType>({} as FormType);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: productSelected?.name,
      stock: productSelected?.stock,
      price: productSelected?.price,
      state: productSelected?.state,
    });
  }, [productSelected]);

  const toggleLoader = () => setLoading((prevState) => !prevState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData(formData)) return setError('Los campos no pueden estar vacios');

    toggleLoader();
    setError('');

    try {
      const currentTime = moment().valueOf();

      const productData: Product = {
        ...productSelected,
        ...formData,
        updatedAt: currentTime,
      };

      await updateProduct(productData);
      await refresh();
    } catch (error) {
      setError('Ocurrio un error creando el producto');
    } finally {
      toggleLoader();
      closeEditProduct();
    }
  };

  return (
    <Modal open={editProductOpen} closeModal={closeEditProduct}>
      <ProductForm
        error={error}
        formData={formData as Product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        title='Editar producto'
        edit
      />
    </Modal>
  );
};
