import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function AddProduct({addProducts, show, toggleShow}){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const addProduct = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, price: price })
        };
        fetch('http://localhost:3001/api/post', requestOptions)
            .then(response => response.json())
            .then(response => {addProducts(response)});
        clearTextFields();    
        toggleShow();
    }

    const clearTextFields = () => {
        setName("");
        setPrice("");
    }

    return (
        <>
        <Modal show={show} onHide={toggleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-6">
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
                <Button variant="primary" onClick={addProduct}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default AddProduct;