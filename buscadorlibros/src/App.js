import React, { useState } from 'react';
import axios from 'axios'; // Usaremos Axios para realizar las solicitudes HTTP
import './App.css';

function App() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]); // Aquí almacenaremos los resultados de la API

  // Función para buscar libros por autor
  const searchByAuthor = async () => {
    if (!author.trim()) return; // Validación básica
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`
      );
      setBooks(response.data.items || []); // Guardamos los libros obtenidos
    } catch (error) {
      console.error('Error al buscar por autor:', error);
    }
  };

  // Función para buscar libros por título
  const searchByTitle = async () => {
    if (!title.trim()) return; // Validación básica
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
      );
      setBooks(response.data.items || []); // Guardamos los libros obtenidos
    } catch (error) {
      console.error('Error al buscar por título:', error);
    }
  };

  return (
    <div className="App">
      <h1>Buscador de Libros</h1>

      {/* Campo para buscar libros por autor */}
      <div className="row">
        <input
          type="text"
          placeholder="Buscar por autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={searchByAuthor}>Buscar por Autor</button>
      </div>

      {/* Campo para buscar libros por título */}
      <div className="row">
        <input
          type="text"
          placeholder="Buscar por título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={searchByTitle}>Buscar por Título</button>
      </div>

      {/* Resultados */}
      <div className="results">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ') || 'Autor desconocido'}</p>
              <p>{book.volumeInfo.publisher || 'Editorial desconocida'}</p>
            </div>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  );
}

export default App;
