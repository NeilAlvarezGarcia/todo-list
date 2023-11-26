import { ChangeEvent, FC, useState } from 'react';
import s from '@/styles/forms.module.css';

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  onValueChange: (value: Option) => void;
  placeholder?: string;
  name: string;
  optionSelected: Option;
};

export const AutoCompleteSelect: FC<Props> = ({
  options,
  onValueChange,
  placeholder,
  name,
  optionSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputVal.toLowerCase())
  );

  const handleClick = (option: Option) => {
    onValueChange(option);
    setInputVal('');
  };

  return (
    <div className={s.inputSelect}>
      <input
        type='text'
        value={inputVal ?? optionSelected.value}
        onChange={(e) => setInputVal(e.target.value)}
        onFocus={openList}
        onBlur={closeList}
        placeholder={placeholder}
        name={name}
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
