import React, { useState } from 'react';
import './Libro.css';

// Componente Libro que recibe los detalles del libro y permite seleccionar la categoría
const Libro = ({ book }) => {
  const [category, setCategory] = useState('');

  // Lista de categorías
  const categories = [
    'Aventuras', 
    'Ciencia Ficción', 
    'Histórica', 
    'Novela Negra', 
    'Romántica', 
    'Terror', 
    'Tecnología'
  ];

  // Manejo de cambio en el select de categoría
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="book">
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Edición: {book.publishedDate}</p>
      <p>{book.description}</p>

      {/* Campo de selección de categoría */}
      <div>
        <label htmlFor={`category-${book.id}`}>Categoría: </label>
        <select 
          id={`category-${book.id}`} 
          value={category} 
          onChange={handleCategoryChange}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Libro;
