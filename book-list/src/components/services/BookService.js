import axios from "axios";
import { URL_API } from "../config/backendConfig";

class BookService {
    static async getAllBook() { // sửa thành OrderService
        return await axios.get(URL_API + 'books?_expand=type')
    }

    static async addBook(book) {
        return await axios.post(URL_API + 'books', book)
    }

    static async getType() {
        return await axios.get(URL_API + 'types')
    }
}

export default BookService;
