import { PropsIcon } from '@/interfaces';
import { FC } from 'react';

export const BookContent: FC<PropsIcon> = ({ size = 20, color = '#fff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24'>
      <path
        d='M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z'
        fill={color}
      />
      <path d='M15 7h3v2h-3zm0 4h3v2h-3z' fill={color} />
    </svg>
  );
};
