import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteProduct({refreshProducts, show, toggleShow, product}){
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const loadData = () => {
        setId(product._id);
        setName(product.name);

    }

    const deleteProduct = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/api/delete/'+id, requestOptions)
        .then(response => response.text())
        .then(() => refreshProducts());
        clearTextFields();    
        toggleShow();
    }

    const clearTextFields = () => {
        setId("");
        setName("");
    }

    return (
        <>
        <Modal show={show} onHide={toggleShow} onShow={loadData}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <input type="hidden"  value={name} onChange={(event) => setId(event.target.value)}/>
                    <div className="col-lg-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteProduct}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default DeleteProduct;