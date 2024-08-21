const labels = {
  PAGES: {
    PRODUCT: {
      SEARCH_PRODUCT_PAGE: "Buscar Producto",
      DETAILS_PRODUCT_PAGE: "Detalle Producto",
      CREATE_PRODUCT_PAGE: "Crear Producto",
      UPDATE_PRODUCT_PAGE: "Actualizar Producto",
    },
    SUPPLIER: {
      SEARCH_SUPPLIER_PAGE: "Buscar Proveedor",
      DETAILS_SUPPLIER_PAGE: "Detalle Proveedor",
      CREATE_SUPPLIER_PAGE: "Crear Proveedor",
      UPDATE_SUPPLIER_PAGE: "Actualizar Proveedor",
    },
    CATEGORY: {
      SEARCH_CATEGORY_PAGE: "Buscar Categoría",
      DETAILS_CATEGORY_PAGE: "Detalle Categoría",
      CREATE_CATEGORY_PAGE: "Crear Categoría",
      UPDATE_CATEGORY_PAGE: "Actualizar Categoría",
    },
    USER: {
      SEARCH_USER_PAGE: "Buscar Usuario",
      DETAILS_USER_PAGE: "Detalle Usuario",
      CREATE_USER_PAGE: "Crear Usuario",
      UPDATE_USER_PAGE: "Actualizar Usuario",
    },
  },
  PRODUCTS: {
    PRODUCT_NAME: () => (
      <>
        NOMBRE<sup>*</sup>
      </>
    ),
    SUPPLIER: () => (
      <>
        PROVEEDOR<sup>*</sup>
      </>
    ),
    CATEGORY: () => (
      <>
        CATEGORIA<sup>*</sup>
      </>
    ),
    STOCK: () => (
      <>
        STOCK<sup>*</sup>
      </>
    ),
    PURCHASE_PRICE: () => (
      <>
        PRECIO COMPRA<sup>*</sup>
      </>
    ),
    SELLING_PRICE: () => (
      <>
        PRECIO VENTA<sup>*</sup>
      </>
    ),
    STATUS: () => (
      <>
        ESTADO<sup>*</sup>
      </>
    ),
  },
  SUPPLIERS: {
    SUPPLIER_NAME: () => (
      <>
        NOMBRE<sup>*</sup>
      </>
    ),
    IDENTIFICATION_NUMBER: () => (
      <>
        IDENTIFICACION<sup>*</sup>
      </>
    ),
    ADDRESS: () => (
      <>
        DIRECCION<sup>*</sup>
      </>
    ),
    PHONE: () => (
      <>
        TELEFONO<sup>*</sup>
      </>
    ),
    CONTACT_NAME: () => (
      <>
        NOMBRE CONTACTO<sup>*</sup>
      </>
    ),
    ORDER_DAY: () => (
      <>
        DIA DE PEDIDO<sup>*</sup>
      </>
    ),
    DELIVERY_DAY: () => (
      <>
        DIA DE ENTREGA<sup>*</sup>
      </>
    ),
    STATUS: () => (
      <>
        ESTADO<sup>*</sup>
      </>
    ),
  },
  CATEGORIES: {
    CATEGORY_NAME: () => (
      <>
        NOMBRE<sup>*</sup>
      </>
    ),
  },
  USERS: {
    USER_LASTNAME: () => (
      <>
        NOMBRE<sup>*</sup>
      </>
    ),
    USER_FIRSTNAME: () => (
      <>
        APELLIDO<sup>*</sup>
      </>
    ),
    ROLE: () => (
      <>
        ROL<sup>*</sup>
      </>
    ),
    STATUS: () => (
      <>
        ESTADO<sup>*</sup>
      </>
    ),
  },
  BUTTONS: {
    BACK_BUTTON: "Regresar",
    CREATE_PRODUCT_BUTTON: "Crear Producto",
    CREATE_SUPPLIER_BUTTON: "Crear Proveedor",
    CREATE_CATEGORY_BUTTON: "Crear Categoria",
    CREATE_USER_BUTTON: "Crear Usuario",
    EDIT_PRODUCT_BUTTON: "Editar Producto",
    EDIT_SUPPLIER_BUTTON: "Editar Proveedor",
    EDIT_CATEGORY_BUTTON: "Editar Categoria",
    EDIT_USER_BUTTON: "Editar Usuario",
  },
};

export default labels;
