import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function Items() {
    const [data, setData] = useState([
        // { name: 'Table-1', category: 'Category-1', price: '$100', status: 'Active' },
        // Add more data as needed
    ]);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        tax: '',
        status: 'Active'
    });

    function saveData(e) {
        e.preventDefault();
        setData([...data, formData]);
        setFormData({
            name: '',
            category: '',
            price: '',
            tax: '',
            status: 'Active'
        });
        // use is in db soooooooooon
    }

  
    function handlePrint() {
        window.print();
    }

    function handleExportXLS() {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Items');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'items.xlsx');
    }

        function handleImageChange(e) {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <div className="db-pg" style={{ margin: '5px' }}>
                <h4 className="p-2" style={{ marginTop: '5px' }}>Dashboard / <span className="text-black-opacity-50">Items</span></h4>
                <div style={{ backgroundColor: "#ffff" }}>
                    <div className="table p-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>Items</h5>
                            </div>
                            <div>
                                <button className="btn btn-primary rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1">
                                    <i className="fa-solid fa-plus"></i> Add New Item
                                </button>
                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight1" aria-labelledby="offcanvasRightLabel1">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasRightLabel1">Add new Item</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
  
                                    
                                    <div className="offcanvas-body">
    <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">NAME <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">PRICE <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">CATEGORY <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="tax" className="form-label">TAX</label>
            <input type="text" className="form-control" id="tax" name="tax" value={formData.tax} onChange={handleChange} />
        </div>
        <label htmlFor="status" className="form-label">STATUS <span className="text-danger">*</span></label>
        <div className="d-flex">
            <div className="form-check pb-3 pr-5">
                <input className="form-check-input" type="radio" name="status" id="status-active" value="Active" checked={formData.status === 'Active'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="status-active">Active</label>
            </div>
            <div className="form-check pb-3">
                <input className="form-check-input" type="radio" name="status" id="status-inactive" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="status-inactive">Inactive</label>
            </div>
        </div>
        <label htmlFor="isVisible" className="form-label">IS FEATURED</label>
        <div className="d-flex">
            <div className="form-check pb-3 pr-5">
                <input className="form-check-input" type="radio" name="isVisible" id="isVisible-yes" value="Yes" checked={formData.isVisible === 'Yes'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="isVisible-yes">Yes</label>
            </div>
            <div className="form-check pb-3">
                <input className="form-check-input" type="radio" name="isVisible" id="isVisible-no" value="No" checked={formData.isVisible === 'No'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="isVisible-no">No</label>
            </div>
        </div>
        <label htmlFor="itemType" className="form-label">ITEM TYPE </label>
        <div className="d-flex">
            <div className="form-check pb-3 pr-5">
                <input className="form-check-input" type="radio" name="itemType" id="itemType-veg" value="Veg" checked={formData.itemType === 'Veg'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="itemType-veg">Veg</label>
            </div>
            <div className="form-check pb-3">
                <input className="form-check-input" type="radio" name="itemType" id="itemType-nonVeg" value="Non Veg" checked={formData.itemType === 'Non Veg'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="itemType-nonVeg">Non Veg</label>
            </div>
        </div>
         <div className="mb-3">
            <label htmlFor="image" className="form-label">UPLOAD IMAG</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} accept="image/*" />
            <small className="form-text text-muted">Upload an image for the item.</small>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => saveData(e)}>
            <i className="fa-regular fa-circle-check"></i> Save
        </button>
    </form>
</div>


                                </div>
                                    <div className="btn-group ml-2">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Export
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={handlePrint}>Print</button></li>
                                        <li><button className="dropdown-item" onClick={handleExportXLS}>Export to XLS</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-secondary">NAME</th>
                                    <th scope="col" className="text-secondary">CATEGORY</th>
                                    <th scope="col" className="text-secondary">PRICE</th>
                                    <th scope="col" className="text-secondary">STATUS</th>
                                    <th scope="col" className="text-secondary">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <button className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>
                                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight2" aria-labelledby="offcanvasRightLabel2">
                                                    <div className="offcanvas-header">
                                                        <h5 className="offcanvas-title" id="offcanvasRightLabel2">Edit Item</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                    <div className="offcanvas-body">
                                                        <form>
                                                            <div className="mb-3">
                                                                <label htmlFor="editName" className="form-label">Name <span className="text-danger">*</span></label>
                                                                <input type="text" className="form-control" id="editName" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="editCategory" className="form-label">Category <span className="text-danger">*</span></label>
                                                                <input type="text" className="form-control" id="editCategory" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="editPrice" className="form-label">Price <span className="text-danger">*</span></label>
                                                                <input type="number" className="form-control" id="editPrice" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="editTax" className="form-label">Tax <span className="text-danger">*</span></label>
                                                                <input type="number" className="form-control" id="editTax" required />
                                                            </div>
                                                            <label htmlFor="editStatus" className="form-label">Status <span className="text-danger">*</span></label>
                                                            <div className="d-flex">
                                                                <div className="form-check pb-3 pr-5">
                                                                    <input className="form-check-input" type="radio" name="editStatus" id="editActive" defaultChecked />
                                                                    <label className="form-check-label" htmlFor="editActive">Active</label>
                                                                </div>
                                                                <div className="form-check pb-3">
                                                                    <input className="form-check-input" type="radio" name="editStatus" id="editInactive" />
                                                                    <label className="form-check-label" htmlFor="editInactive">Inactive</label>
                                                                </div>
                                                            </div>
<button type="submit" className="btn btn-primary" onClick={(e) => saveData(e, index)}>
    <i className="fa-regular fa-circle-check"></i> Save
</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
