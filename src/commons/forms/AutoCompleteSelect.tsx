import { FC, useState } from 'react';
import s from '@/styles/forms.module.css';

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  value: string;
  onValueChange: (name: string, value: string) => void;
  placeholder?: string;
};

export const AutoCompleteSelect: FC<Props> = ({ options, onValueChange, placeholder, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  const handleClick = (option: Option) => {
    onValueChange('label', option.label);
    onValueChange('value', option.value);
  };

  return (
    <div className={s.inputSelect}>
      <input
        type='text'
        name='label'
        value={value}
        onChange={(e) => onValueChange(e.target.name, e.target.value)}
        onFocus={openList}
        onBlur={closeList}
        placeholder={placeholder}
        autoComplete='off'
      />

      <div className={`${s.floatingList} ${isOpen && s.open}`}>
        <ul className={s.list}>
          {filteredOptions.map((option) => (
            <li key={option.value} onClick={() => handleClick(option)} className={s.option}>
              {option.label}
            </li>
          ))}

          {!Boolean(filteredOptions.length) && <li className={s.emptyResult}>No hay resultados</li>}
        </ul>
      </div>
    </div>
  );
};
