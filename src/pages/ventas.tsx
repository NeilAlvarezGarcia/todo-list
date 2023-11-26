import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import Head from 'next/head';
import s from '@/styles/sales.module.css';
import tableStyles from '@/styles/table.module.css';
import { getProducts } from '@/services';
import { TABLE_PRODUCTS_PURCHASE_HEADER, activeProduct, revalidateInterval } from '@/utils/const';
import { Product } from '@/interfaces';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Table, tableDataRecord } from '@/commons/Table';
import { formatCurrency } from '@/utils/helpers';
import { AutoCompleteSelect } from '@/commons/forms';
import { TrashCan } from '@/commons/icons';

type Props = {
  products: Product[];
};

type ProductsSelected = { product: Product; quantity: number }[];

const INITIAL_PRODUCT_STATE = {
  option: { label: '', value: '' },
  quantity: 0,
};
const INITIAL_CLIENT_STATE = {
  clientName: '',
  documentClientNumber: '',
};

const Ventas: FC<Props> = ({ products }) => {
  const [clientData, setClientData] = useState(INITIAL_CLIENT_STATE);
  const [productsSelected, setProductsSelected] = useState<ProductsSelected>([]);
  const [product, setProduct] = useState(INITIAL_PRODUCT_STATE);

  const handleClientDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setClientData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProductChange = (name: string, value: any) => {
    setProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addProduct = () => {
    console.log(product);
  };

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
            </div>

            <div className={s.bottomSide}>
              <SectionLayout title='Productos'>
                <div className={s.bottomWrapper}>
                  <div className={s.bottomContainer}>
                    <div>
                      <label htmlFor='product'>Producto</label>
                      <AutoCompleteSelect
                        options={products?.map((item) => ({ label: item.name, value: item.id }))}
                        onValueChange={(option) => handleProductChange('productId', option)}
                        name='productId'
                        placeholder='Buscar producto'
                        optionSelected={product.option}
                      />
                    </div>

                    <div>
                      <label htmlFor='quantity'>Cantidad</label>
                      <input
                        type='number'
                        name='quantity'
                        id='quantity'
                        value={product.quantity}
                        onChange={(e) => handleProductChange(e.target.name, e.target.value)}
                        min={0}
                        placeholder='Cantidad de productos a comprar'
                      />
                    </div>

                    <button type='button' className={s.addBtn} onClick={addProduct}>
                      agregar
                    </button>
                  </div>

                  <Table
                    headers={TABLE_PRODUCTS_PURCHASE_HEADER}
                    data={productsSelected as unknown as tableDataRecord[]}
                    row={(item, i) => (
                      <Fragment key={i}>
                        <td>
                          <button className={tableStyles.deleteAction}>
                            <TrashCan />
                          </button>
                        </td>
                        <td>{item.name}</td>
                        <td>{2}</td>
                        <td>{formatCurrency(10000)}</td>
                        <td>{formatCurrency(20000)}</td>
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
            {/* <div className={s.rightSide}>
              <div className={s.groupDetail}>
                <h4>Sub total</h4>

                <p>{formatCurrency(formData.total)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>IGV (18%)</h4>

                <p>{formatCurrency(formData.total)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>Total</h4>

                <p>{formatCurrency(formData.total)}</p>
              </div>

              <button>Terminar venta</button>
            </div> */}
          </SectionLayout>
        </form>
      </DashboardLayout>
    </>
  );
};

export async function getStaticProps() {
  const data = await getProducts();

  const products = data.filter((product) => product.state === activeProduct);

  return {
    props: {
      products,
    },
    revalidate: revalidateInterval,
  };
}

export default Ventas;
