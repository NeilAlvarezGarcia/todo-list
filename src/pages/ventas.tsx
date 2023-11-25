import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import Head from 'next/head';
import s from '@/styles/sales.module.css';

const Ventas = () => {
  return (
    <>
      <Head>
        <title>Ventas</title>
      </Head>

      <DashboardLayout>
        <section className={s.wapper}>
          <section className={s.leftSide}>
            <div className={s.topSide}>
              <SectionLayout title='Datos del cliente'>
                <p>Acá un form para los datos del cliente</p>
              </SectionLayout>
            </div>

            <div className={s.bottomSide}>
              <SectionLayout title='Productos'>
                <p>Acá un form para seleccionar productos</p>
              </SectionLayout>
            </div>
          </section>

          <SectionLayout title='Detalle de la compra'>
            <p>Acá un form para los detalles de la compra</p>
          </SectionLayout>
        </section>
      </DashboardLayout>
    </>
  );
};

export default Ventas;
