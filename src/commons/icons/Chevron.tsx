import { PropsIcon } from '@/interfaces';
import { FC } from 'react';

export const Chevron: FC<PropsIcon> = ({ size = 24, color = '#fff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24'>
      <path
        d='M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z'
        fill={color}
      />
    </svg>
  );
};
