const TABLE_USERS_HEADER = [
  { id: 'name', name: 'Nombre' },
  { id: 'email', name: 'Correo electrónico' },
  { id: 'role', name: 'Rol' },
  { id: 'actions', name: 'Acciones' },
];

const TABLE_PRODUCTS_HEADER = [
  { id: 'id', name: 'Código' },
  { id: 'name', name: 'Nombre' },
  { id: 'stock', name: 'Cantidad' },
  { id: 'price', name: 'Precio por unidad' },
  { id: 'state', name: 'Estado' },
  { id: 'actions', name: 'Acciones' },
];

const TABLE_HISTORIES_HEADER = [
  { id: 'date', name: 'Fecha registro' },
  { id: 'idPurchase', name: 'Número venta' },
  { id: 'typeDocument', name: 'Tipo docuemnto' },
  { id: 'documentNumber', name: 'Documento cliente' },
  { id: 'clientName', name: 'NombreCliente' },
  { id: 'total', name: 'Total' },
];

export { TABLE_USERS_HEADER, TABLE_PRODUCTS_HEADER, TABLE_HISTORIES_HEADER };
