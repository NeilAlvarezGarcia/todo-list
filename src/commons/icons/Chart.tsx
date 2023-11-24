import { PropsIcon } from '@/interfaces';
import { FC } from 'react';

export const Chart: FC<PropsIcon> = ({ size = 20, color = '#fff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24'>
      <path
        d='M6 21H3a1 1 0 01-1-1v-8a1 1 0 011-1h3a1 1 0 011 1v8a1 1 0 01-1 1zm7 0h-3a1 1 0 01-1-1V3a1 1 0 011-1h3a1 1 0 011 1v17a1 1 0 01-1 1zm7 0h-3a1 1 0 01-1-1V9a1 1 0 011-1h3a1 1 0 011 1v11a1 1 0 01-1 1z'
        fill={color}
      />
    </svg>
  );
};
