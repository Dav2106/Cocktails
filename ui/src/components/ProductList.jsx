import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const toggleShowAddProduct = () => setShowAddProduct(p => !p);
  const toggleShowEditProduct = () => setShowEditProduct(p => !p);
  const toggleShowDeleteProduct = () => setShowDeleteProduct(p => !p);
  
  const refreshProducts = () => {
    fetch('http://localhost:3001/api/getAll')
    .then(response => response.json())
    .then(result => setProducts(result))
    .catch(error => console.error('Error fetching data:', error))
  }

  useEffect(() => {
   refreshProducts();
  }, []);

  const addProducts = (newProduct) =>{
    setProducts([...products, newProduct])
  }

  return (
  <>
    <div className="row">
      <h1 className="col-lg-10">Products</h1>
      <button className="col-lg-1 btn btn-success" style={{marginRight: "1%", marginTop: "1%"}} data-bs-toggle="modal" data-bs-target="#addProductComponent" onClick={toggleShowAddProduct}>+</button>
    </div>
    {products.length === 0 && <p>Loading...</p>}
    <hr />
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Product Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, index) => {
            return <tr key={index} onClick={() => { setProduct(product)}}>
              <th scope="row" hidden="hidden">{index}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><a href="#" onClick={toggleShowEditProduct} data-bs-toggle="modal" data-bs-target="#editProductComponent">edit</a>&nbsp;
                  <a href="#" onClick={toggleShowDeleteProduct} data-bs-toggle="modal" data-bs-target="#deleteProductComponent">delete</a></td>
            </tr>
          })
        }  
      </tbody>
    </table>
    <AddProduct addProducts={addProducts} show={showAddProduct} toggleShow={toggleShowAddProduct}></AddProduct>
    <EditProduct refreshProducts={refreshProducts} product={product} show={showEditProduct} toggleShow={toggleShowEditProduct}></EditProduct>
    <DeleteProduct refreshProducts={refreshProducts} product={product} show={showDeleteProduct} toggleShow={toggleShowDeleteProduct}></DeleteProduct>

  </>
  );
}

export default ProductList;
