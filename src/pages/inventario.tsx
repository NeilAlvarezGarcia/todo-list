import { DashboardLayout, SectionLayout } from '@/commons/layouts';
import { Table, tableDataRecord } from '@/commons/Table';
import { Product } from '@/interfaces';
import { deleteProduct, getProducts } from '@/services';
import { revalidateInterval, TABLE_PRODUCTS_HEADER } from '@/util/const';
import Head from 'next/head';
import { FC, useState } from 'react';

import { AddProduct, ProductTableRow } from '@/components/inventario';
import { Alert } from '@/commons/icons';
import { Modal } from '@/components';
import { useOpenModal } from '@/hooks';

type Props = {
  data: Product[];
};

const Inventario: FC<Props> = ({ data }) => {
  const [prodcucts, setProducts] = useState(data);

  const [deleteProductOpen, openDeleteProduct, closeDeleteProduct] = useOpenModal();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState('');

  const refreshData = async () => {
    const data = await getProducts();

    setProducts(data);
  };

  const onDeleteProduct = async () => {
    setDeleteLoading(true);
    try {
      await deleteProduct(productToDeleteId);
      await refreshData();
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteProduct();
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (productId: string) => {
    setProductToDeleteId(productId);
    openDeleteProduct();
  };

  return (
    <>
      <Head>
        <title>Inventario</title>
      </Head>

      <DashboardLayout>
        <SectionLayout title='Lista de productos'>
          <AddProduct refresh={refreshData} />

          <Table
            headers={TABLE_PRODUCTS_HEADER}
            data={prodcucts as unknown as tableDataRecord[]}
            row={(item, i) => (
              <ProductTableRow
                key={i}
                product={item as unknown as Product}
                openDeleteProduct={openDeleteModal}
              />
            )}
          />
        </SectionLayout>
      </DashboardLayout>

      <Modal open={deleteProductOpen} closeModal={closeDeleteProduct}>
        <Alert />
        <h2>¿Estas seguro?</h2>
        <p>Deseas eliminar este producto</p>
        <button onClick={onDeleteProduct}>
          {deleteLoading ? 'Eliminando producto...' : 'Si, continuar'}
        </button>
      </Modal>
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

export default Inventario;
