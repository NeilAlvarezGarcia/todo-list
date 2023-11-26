import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import Head from 'next/head';
import s from '@/styles/sales.module.css';
import { getProducts } from '@/services';
import { TABLE_PRODUCTS_PURCHASE_HEADER, revalidateInterval } from '@/util/const';
import { Product } from '@/interfaces';
import { FC, Fragment } from 'react';
import { Select } from '@/commons/forms';
import { Table } from '@/commons/Table';
import { formatCurrency } from '@/util/helpers';

type Props = {
  data: Product[];
};

const Ventas: FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Ventas</title>
      </Head>

      <DashboardLayout>
        <form className={s.wapper}>
          <section className={s.leftSide}>
            <div className={s.topSide}>
              <SectionLayout title='Datos del cliente'>
                <div className={s.topContainer}>
                  <div>
                    <label htmlFor='documentNumber'>Nro. Documento</label>
                    <input type='text' name='documentNumber' id='documentNumber' />
                  </div>

                  <div>
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' name='name' id='name' />
                  </div>
                </div>
              </SectionLayout>
            </div>

            <div className={s.bottomSide}>
              <SectionLayout title='Productos'>
                <div className={s.bottomWrapper}>
                  <div className={s.bottomContainer}>
                    <div>
                      <label htmlFor='product'>Producto</label>
                      <input
                        type='text'
                        name='product'
                        id='product'
                        placeholder='Buscar producto'
                      />
                    </div>

                    <div>
                      <label htmlFor='quantity'>Cantidad</label>
                      <input
                        type='number'
                        name='quantity'
                        id='quantity'
                        placeholder='Cantidad de productos a comprar'
                      />
                    </div>
                  </div>

                  <Table
                    headers={TABLE_PRODUCTS_PURCHASE_HEADER}
                    data={[]}
                    row={(item, i) => (
                      <Fragment key={i}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <p>Eliminar</p>
                        </td>
                      </Fragment>
                    )}
                    emptyText='No hay productos agregados'
                    hasPagination={false}
                  />
                </div>
              </SectionLayout>
            </div>
          </section>

          <SectionLayout title='Detalle de la compra'>
            <div className={s.rightSide}>
              <div className={s.groupDetail}>
                <h4>Sub total</h4>

                <p>{formatCurrency(3220)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>IGV (18%)</h4>

                <p>{formatCurrency(579)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>Total</h4>

                <p>{formatCurrency(3800)}</p>
              </div>

              <button>Terminar venta</button>
            </div>
          </SectionLayout>
        </form>
      </DashboardLayout>
    </>
  );
};

export async function getStaticProps() {
  const data = await getProducts();

  return {
    props: {
      data,
    },
    revalidate: revalidateInterval,
  };
}

export default Ventas;
