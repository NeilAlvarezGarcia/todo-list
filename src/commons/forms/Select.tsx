import s from '@/styles/forms.module.css';
import { ChangeEvent, FC } from 'react';

type Props = {
  options: { name: string; value: string }[];
  name: string;
  label: string;
  onValuechange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export const Select: FC<Props> = ({ label, options = [], name, onValuechange, value }) => {
  return (
    <div className={s.select}>
      <label className={s.label}>{label}</label>

      <select name={name} value={value} onChange={onValuechange}>
        {options.map(({ name, value }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
