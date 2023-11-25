import { PropsIcon } from '@/interfaces';
import { FC } from 'react';

export const Menu: FC<PropsIcon> = ({ size = 20, color = '#fff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24'>
      <path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' fill={color} />
    </svg>
  );
};
