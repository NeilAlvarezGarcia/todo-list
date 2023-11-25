import { DashboardLayout, PageLayout } from '@/commons/layouts';
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
              <PageLayout title='Datos del cliente'>
                <p>Acá un form para los datos del cliente</p>
              </PageLayout>
            </div>

            <div className={s.bottomSide}>
              <PageLayout title='Productos'>
                <p>Acá un form para seleccionar productos</p>
              </PageLayout>
            </div>
          </section>

          <PageLayout title='Detalle de la compra'>
            <p>Acá un form para los detalles de la compra</p>
          </PageLayout>
        </section>
      </DashboardLayout>
    </>
  );
};

export default Ventas;
