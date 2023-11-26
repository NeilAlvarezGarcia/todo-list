import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import Head from 'next/head';
import s from '@/styles/sales.module.css';
import tableStyles from '@/styles/table.module.css';
import { addPurchase, getProducts } from '@/services';
import { TABLE_PRODUCTS_PURCHASE_HEADER, activeProduct, revalidateInterval } from '@/utils/const';
import { Product, Purchase } from '@/interfaces';
import { ChangeEvent, FC, FormEvent, Fragment, useMemo, useState } from 'react';
import { Table, tableDataRecord } from '@/commons/Table';
import { formatCurrency, generateRandomId, validateFormData } from '@/utils/helpers';
import { AutoCompleteSelect } from '@/commons/forms';
import { TrashCan } from '@/commons/icons';
import moment from 'moment';

type Props = {
  products: Product[];
};

type ProductsSelected = (Product & { quantity: number })[];

const INITIAL_PRODUCT_STATE = { label: '', value: '', quantity: 0 };
const INITIAL_CLIENT_STATE = {
  clientName: '',
  documentClientNumber: '',
};

const Ventas: FC<Props> = ({ products }) => {
  const [clientData, setClientData] = useState(INITIAL_CLIENT_STATE);
  const [productsSelected, setProductsSelected] = useState<ProductsSelected>([]);
  const [product, setProduct] = useState(INITIAL_PRODUCT_STATE);
  const [error, setError] = useState('');
  const [errorStock, setErrorStock] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotalPurchase = useMemo(
    () =>
      productsSelected.reduce((counter, product) => {
        const productPrice = Number(product.price);
        const total = productPrice * Number(product.quantity);
        return (counter += total);
      }, 0),
    [productsSelected]
  );

  const ivaAmount = subtotalPurchase * 0.18;
  const total = subtotalPurchase * 1.18;

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
    const productFound = products.find((item) => item.id === product.value);
    const quantity = Number(product.quantity);

    if (!productFound || !quantity) return;

    if (productFound.stock < quantity)
      return setErrorStock('El stock del producto es menor a la cantidad');

    setProductsSelected((prev) => [...prev, { ...productFound, quantity }]);
    setProduct(INITIAL_PRODUCT_STATE);
    setErrorStock('');
  };

  const removeProduct = (id: string) => {
    const productsFiltered = productsSelected.filter((item) => item.id !== id);

    setProductsSelected(productsFiltered);
  };
  const toggleLoader = () => setLoading((prev) => !prev);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData(clientData) || !productsSelected.length)
      return setError('Debes ingresar los datos del cliente y los productos a vender');

    toggleLoader();
    try {
      const currentTime = moment().valueOf();
      const id = generateRandomId();
      const products = productsSelected.map((item) => ({ id: item.id, quantity: item.quantity }));

      const purchase: Purchase = {
        createdAt: currentTime,
        purchaseId: id,
        ...clientData,
        products,
        total,
        subtotal: subtotalPurchase,
        ivaAmount,
      };
      await addPurchase(purchase);
    } catch (error) {
      setError('');
    } finally {
      toggleLoader();
      setClientData(INITIAL_CLIENT_STATE);
      setProductsSelected([]);
    }
  };

  return (
    <>
      <Head>
        <title>Ventas</title>
      </Head>

      <DashboardLayout>
        <form className={s.wapper} onSubmit={handleSubmit}>
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
                        onValueChange={handleProductChange}
                        placeholder='Buscar producto'
                        value={product.label}
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
                  <p className={s.error}>{errorStock}</p>

                  <Table
                    headers={TABLE_PRODUCTS_PURCHASE_HEADER}
                    data={productsSelected as unknown as tableDataRecord[]}
                    row={(product, i) => {
                      const productPrice = Number(product.price);
                      const total = productPrice * Number(product.quantity);

                      return (
                        <Fragment key={product.id}>
                          <td>
                            <button
                              type='button'
                              className={tableStyles.deleteAction}
                              onClick={() => removeProduct(product.id as string)}>
                              <TrashCan />
                            </button>
                          </td>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>{formatCurrency(productPrice)}</td>
                          <td>{formatCurrency(total)}</td>
                        </Fragment>
                      );
                    }}
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

                <p>{formatCurrency(subtotalPurchase)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>IGV (18%)</h4>

                <p>{formatCurrency(ivaAmount)}</p>
              </div>

              <div className={s.groupDetail}>
                <h4>Total</h4>

                <p>{formatCurrency(total)}</p>
              </div>

              <button>{loading ? 'Generando venta...' : 'Terminar venta'}</button>

              <p className={s.error}>{error}</p>
            </div>
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
