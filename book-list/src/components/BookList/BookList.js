import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import BookService from '../services/BookService';
import BookSearch from '../BookSearch/BookSearch';
import { useFormik } from 'formik';


const BookList = () => {

    const [books, setBooks] = useState([]);
    const [reRender, setReRender] = useState(true);
    const navigate = useNavigate();
    const [listBooksFilter, setListBooksFilter] = useState(books);

    useEffect(() => {
        BookService.getAllBook()
            .then(res => {
                const data = res.data;
                setBooks(data);
                setListBooksFilter(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [reRender])

    useEffect(() => {
        BookService.getAllBook()
            .then(res => {
                const data = res.data;
                setBooks(data);
                setListBooksFilter(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSearch = (keyword) => {
        let booksF = [];
        for (let i = 0; i < books.length; i++) {
            if (books[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                booksF.push(books[i]);
            }
        }
        setListBooksFilter(booksF);
        console.log(booksF);
    }

    // Comment form tìm kiếm theo thể loại là có thể hiển thị danh sách
    const formSearchByTypeName = useFormik({
        initialValues: {
            type: ''       
        },
        onSubmit: (values) => {
            let booksF = [];
            for (let i = 0; i < books.length; i++) {
                if (values.type == books[i].typeId) {
                    booksF.push(books[i]);
                }
            }
            setListBooksFilter(booksF);
            console.log(booksF);
        }
    })

  return (
    <>
            <h1>Book List</h1>

            <Link to={`/books/create`}>
            <button className='btn btn-primary'>Add new Book</button>
            </Link>

            <div className='col'>
                <BookSearch search={handleSearch}/>
            </div>

            <div className="col">
                <form onSubmit={formSearchByTypeName.handleSubmit}>
                    <select name='type' className="form-control" onChange={formSearchByTypeName.handleChange} defaultValue="">
                        <option value="" disabled>--- Chọn thể loại ---</option>
                        <option value="1">Development</option>
                        <option value="2">Testing</option>
                    </select>
                    <button type='submit' className='btn btn-primary'>Search</button>
                </form>
            </div>
    
            <table className='table table-striped'>
                <thead >
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã sách</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Ngày nhập sách</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {listBooksFilter.map((book) => (
                        
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.bookId}</td>
                                <td>{book.name}</td>
                                <td>{book.type.name}</td>
                                <td>{new Date(book.entry_date).toLocaleDateString('en-GB')}</td>
                                <td>{book.quantity}</td>
                                <td>
                                    
                                        <button className='btn btn-success'>View</button>
                                    
                                    
                                        <button className='btn btn-warning'>Edit</button>
                                    
                                    <button  className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        
                    ))}
                </tbody>
            </table>
        </>
  )
}

export default BookList
