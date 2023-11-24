import { ChangeEvent, FC } from 'react';
import s from '@/styles/forms.module.css';

type Props = {
  type?: string;
  label: string;
  name: string;
  value?: string | number;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = ({ type = 'text', label, name, value, onValueChange }) => {
  return (
    <div className={s.group}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onValueChange}
        className={s.input}
      />
    </div>
  );
};
