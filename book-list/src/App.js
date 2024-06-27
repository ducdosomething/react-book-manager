import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList/BookList';
import BookAdd from './components/BookAdd/BookAdd';


function App() {
  return (
      <>
        <Routes>
          <Route path={"/"} element={<BookList />} />
          <Route path={"/books/create"} element={<BookAdd />} />
        </Routes>
      </>
  );
}

export default App;
