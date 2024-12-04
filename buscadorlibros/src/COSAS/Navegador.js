import React, { useState } from 'react';
import Libro from './Libro';
import axios from 'axios';
import './Navegador.css';

const Navegador = () => {
  const [authorQuery, setAuthorQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchByAuthor = () => {
    if (!authorQuery) return;

    setLoading(true);

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorQuery}`)
      .then(response => {
        setBooks(response.data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearchByTitle = () => {
    if (!titleQuery) return;

    setLoading(true);

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleQuery}`)
      .then(response => {
        setBooks(response.data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearchByCategory = () => {
    if (!categoryQuery) return;

    setLoading(true);

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryQuery}`)
      .then(response => {
        setBooks(response.data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="Navegador">
      <h1>Buscador de Libros</h1>

      {/* Campo de búsqueda por autor */}
      <div className="row">
        <input 
          type="text" 
          value={authorQuery} 
          onChange={(e) => setAuthorQuery(e.target.value)} 
          placeholder="Buscar por autor"
        />
        <button onClick={handleSearchByAuthor}>Buscar por Autor</button>
      </div>

      {/* Campo de búsqueda por título */}
      <div className="row">
        <input 
          type="text" 
          value={titleQuery} 
          onChange={(e) => setTitleQuery(e.target.value)} 
          placeholder="Buscar por título"
        />
        <button onClick={handleSearchByTitle}>Buscar por Título</button>
      </div>

      {/* Campo de búsqueda por categoría */}
      <div className="row">
        <select 
          value={categoryQuery} 
          onChange={(e) => setCategoryQuery(e.target.value)} 
          placeholder="Seleccionar categoría"
        >
          <option value="">Seleccionar categoría</option>
          <option value="Aventuras">Aventuras</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Histórica">Histórica</option>
          <option value="Novela Negra">Novela Negra</option>
          <option value="Romántica">Romántica</option>
          <option value="Terror">Terror</option>
          <option value="Tecnología">Tecnología</option>
        </select>
        <button onClick={handleSearchByCategory}>Buscar por Categoría</button>
      </div>

      {/* Mostrar resultados */}
      {loading && <p>Cargando...</p>}
      {books.length > 0 && (
        <div>
          {books.map((bookData, index) => (
            <Libro key={index} book={bookData.volumeInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Navegador;
