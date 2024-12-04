import React, { useState } from 'react';
import axios from 'axios';
import Libro from './Libro';


const Navegacion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('TODOS'); // Para filtrar por categoría

  // Función para agregar o eliminar un libro de la lista de guardados
  const handleUpdateBooks = (book, action) => {
    if (action === 'add') {
      setSavedBooks([...savedBooks, { ...book, saved: true, category: book.category || '' }]); // Guardar libro
    } else if (action === 'remove') {
      setSavedBooks(savedBooks.filter(savedBook => savedBook.id !== book.id)); // Eliminar libro
    }
  };

  // Función de búsqueda por título
  const handleSearchByTitle = async () => {
    setBooks([]); // Limpiar resultados previos
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}`);
      if (response.data.items) {
        setBooks(response.data.items);
      } else {
        setBooks([]); // Si no hay resultados, limpiar
      }
    } catch (error) {
      console.error("Error al buscar libros por título: ", error);
      setBooks([]);
    }
  };

  // Función de búsqueda por autor
  const handleSearchByAuthor = async () => {
    setBooks([]); // Limpiar resultados previos
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchTerm}`);
      if (response.data.items) {
        setBooks(response.data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error al buscar libros por autor: ", error);
      setBooks([]);
    }
  };

  // Función de búsqueda por categoría (filtrando los libros guardados)
  const handleSearchByCategory = () => {
    if (categoryFilter === 'TODOS') {
      setBooks(savedBooks);
    } else {
      setBooks(savedBooks.filter(book => book.category === categoryFilter));
    }
  };

  return (
    <div>
      <h1>Buscador de Libros</h1>
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar por título o autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchByTitle}>Buscar por título</button>
        <button onClick={handleSearchByAuthor}>Buscar por autor</button>

        <div>
          <label>Filtrar por categoría:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="TODOS">TODOS</option>
            <option value="Aventuras">Aventuras</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Histórica">Histórica</option>
            <option value="Novela Negra">Novela Negra</option>
            <option value="Romántica">Romántica</option>
            <option value="Terror">Terror</option>
            <option value="Tecnología">Tecnología</option>
          </select>
          <button onClick={handleSearchByCategory}>Buscar por categoría</button>
        </div>
      </div>

      <div className="resultados">
        {books.length === 0 && <p>No se han encontrado resultados.</p>}
        {books.map((book) => (
          <Libro
            key={book.id}
            book={book}
            onUpdateBooks={handleUpdateBooks}
            savedBooks={savedBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default Navegacion;
