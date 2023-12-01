import { Product } from '@/interfaces';
import { updateProduct } from '@/services';
import { FC, useEffect } from 'react';
import { Modal } from '..';
import { ProductForm } from './ProductForm';
import { validateFormData } from '@/utils/helpers';
import moment from 'moment';
import { useForm } from '@/hooks';

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
  const {
    onSubmit,
    onValueChange,
    watch,
    error,
    setError,
    loading,
    toggleLoader,
    reset,
    setFormValue,
  } = useForm<FormType>({} as FormType);
  const formData = watch();

  useEffect(() => {
    setFormValue({
      name: productSelected?.name,
      stock: productSelected?.stock,
      price: productSelected?.price,
      state: productSelected?.state,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSelected]);

  const handleSubmit = async (data: FormType) => {
    if (!validateFormData(data)) return setError('Los campos no pueden estar vacios');

    toggleLoader();
    setError('');

    try {
      const currentTime = moment().valueOf();

      const productData: Product = {
        ...productSelected,
        ...data,
        updatedAt: currentTime,
      };

      await updateProduct(productData);
      await refresh();
    } catch (error) {
      setError('Ocurrio un error creando el producto');
    } finally {
      closeEditProduct();
      reset();
    }
  };

  return (
    <Modal open={editProductOpen} closeModal={closeEditProduct}>
      <ProductForm
        error={error}
        formData={formData as Product}
        handleChange={onValueChange}
        handleSubmit={onSubmit(handleSubmit)}
        loading={loading}
        title='Editar producto'
        edit
      />
    </Modal>
  );
};
