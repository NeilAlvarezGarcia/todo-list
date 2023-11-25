import { DashboardLayout, PageLayout } from '@/commons/layouts';
import { Table } from '@/commons/Table';
import { Product } from '@/interfaces';
import { getProducts } from '@/services';
import { revalidateInterval, TABLE_PRODUCTS_HEADER } from '@/util/const';
import Head from 'next/head';
import { FC, useState } from 'react';

import { AddProduct, ProductTableRow } from '@/components/inventario';

type Props = {
  data: Product[];
};

const Inventario: FC<Props> = ({ data }) => {
  const [prodcucts, setProducts] = useState(data);

  const refreshData = async () => {
    const data = await getProducts();

    setProducts(data);
  };

  return (
    <>
      <Head>
        <title>Inventario</title>
      </Head>

      <DashboardLayout>
        <PageLayout title='Lista de productos'>
          <AddProduct refresh={refreshData} />

          <Table
            headers={TABLE_PRODUCTS_HEADER}
            data={prodcucts as unknown as Record<string, string | number>[]}
            row={(item, i) => <ProductTableRow key={i} product={item as unknown as Product} />}
          />
        </PageLayout>
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

export default Inventario;
