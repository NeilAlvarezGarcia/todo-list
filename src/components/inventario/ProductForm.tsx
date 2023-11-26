import { Input, Select } from '@/commons/forms';
import { activeProducte, inactiveProducte } from '@/util/const';
import React, { ChangeEvent, FC, FormEvent } from 'react';
import s from '@/styles/forms.module.css';
import { Product } from '@/interfaces';

type Props = {
  title?: string;
  formData: Product;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error: string;
  loading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const ProductForm: FC<Props> = ({
  title = 'Añadir nuevo producto',
  formData,
  handleChange,
  error,
  loading,
  handleSubmit,
}) => {
  return (
    <form className={s.formModal} onSubmit={handleSubmit}>
      <div className={s.wrapper}>
        <h3>{title}</h3>

        <Input label='Nombre' name='name' value={formData.name} onValueChange={handleChange} />
        <Input
          label='Cantidad de producto'
          name='stock'
          type='number'
          value={formData.stock}
          onValueChange={handleChange}
        />
        <Input label='Precio' name='price' value={formData.price} onValueChange={handleChange} />

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

        <p className={`${s.textError} ${Boolean(error) && s.active}`}>{error}</p>
      </div>

      <button>{loading ? 'Agregando producto...' : 'Agregar producto'}</button>
    </form>
  );
};
