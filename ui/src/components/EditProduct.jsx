import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function EditProduct({refreshProducts, show, toggleShow, product}){
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const loadData = () => {
        setId(product._id);
        setName(product.name);
        setPrice(product.price);

    }

    const editProduct = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id, name: name, price: price })
        };
        fetch('http://localhost:3001/api/update/'+id, requestOptions)
            .then(response => response.json())
            .then(() => refreshProducts());
        clearTextFields();    
        toggleShow();
    }

    const clearTextFields = () => {
        setId("");
        setName("");
        setPrice("");
    }
    
    return (
        <>
        <Modal show={show} onHide={toggleShow} onShow={loadData}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-6">
                        <input type="hidden"  value={id} />
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" className="form-control" id="productPrice" value={price} onChange={(event) => setPrice(event.target.value)}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={editProduct}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default EditProduct;