import { SectionLayout } from '@/commons/layouts';
import s from '@/styles/sales.module.css';
import { ChangeEvent, FC } from 'react';

type Props = {
  clientData: {
    clientName: string;
    documentClientNumber: string;
  };
  handleClientDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ClientInfo: FC<Props> = ({ clientData, handleClientDataChange }) => {
  return (
    <SectionLayout title='Datos del cliente'>
      <div className={s.topContainer}>
        <div>
          <label htmlFor='documentClientNumber'>Nro. Documento</label>
          <input
            type='text'
            name='documentClientNumber'
            id='documentClientNumber'
            value={clientData.documentClientNumber}
            onChange={handleClientDataChange}
          />
        </div>

        <div>
          <label htmlFor='clientName'>Nombre</label>
          <input
            type='text'
            name='clientName'
            id='clientName'
            value={clientData.clientName}
            onChange={handleClientDataChange}
          />
        </div>
      </div>
    </SectionLayout>
  );
};
