import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import BookService from '../services/BookService';
import { useFormik } from 'formik';

const formAddValidate = Yup.object().shape({
    bookId:Yup.string().required('Required'),
    name:Yup.string().required('Required'),
    typeId: Yup.string().required(' Required'),
    entry_date: Yup.date().required('Required'),
    quantity: Yup.string().required('Required'),
});

const BookAdd = () => {

    const navigate = useNavigate();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        BookService.getType().then((res) => {
            setTypes(res.data);
        })
    }, []);

    const formAdd = useFormik({
        initialValues: {
            bookId: "",
            name: "",
            typeId: "",
            entry_date: "",
            quantity: ""
        },
        validationSchema: formAddValidate,
        onSubmit: (values) => {
            console.log("values", values);
            console.log("types", types);

            BookService.addBook(values).then(() => {
                alert("Add book successfully");
                navigate("/");
            }).catch(err => {
                alert("Error adding book")
            })
        }
    })

  return (
    <>
            <div className="card">
                <div className="card-header">
                    <h4>Add Book</h4>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={formAdd.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Mã sách</label>
                            <input name="bookId" onChange={formAdd.handleChange} type="text" className="form-control"/>
                            {formAdd.errors.bookId && <p className={"text-danger"}>{formAdd.errors.bookId}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên sách</label>
                            <input name="name" onChange={formAdd.handleChange} type="text" className="form-control"/>
                            {formAdd.errors.name && <p className={"text-danger"}>{formAdd.errors.name}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thể loại</label>
                            <select name="typeId" onChange={formAdd.handleChange} className="form-control" defaultValue="">
                                <option value="" disabled>--- Chọn thể loại ---</option>
                                <option value="1">Development</option>
                                <option value="2">Testing</option>
                            </select>
                            {formAdd.errors.productId && <p className={"text-danger"}>{formAdd.errors.productId}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày nhập</label>
                            <input name="entry_date" onChange={formAdd.handleChange} type="date" className="form-control"/>
                            {formAdd.errors.entry_date && <p className={"text-danger"}>{formAdd.errors.entry_date}</p>}
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Số lượng</label>
                            <input name="quantity" onChange={formAdd.handleChange} type="text" className="form-control"/>
                            {formAdd.errors.quantity && <p className={"text-danger"}>{formAdd.errors.quantity}</p>}
                        </div>  
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Save</button>                       
                            <Link to={"/"}>
                                <button className="btn btn-info">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}

export default BookAdd
