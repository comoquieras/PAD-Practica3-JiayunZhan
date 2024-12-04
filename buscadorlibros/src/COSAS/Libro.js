import React, { useState } from 'react';

const Libro = ({ book, onUpdateBooks, savedBooks }) => {
  const [category, setCategory] = useState(book.category || ''); // Si no hay categoría, vacío

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Función para manejar el guardar o eliminar
  const handleSaveOrRemove = () => {
    if (isBookSaved()) {
      onUpdateBooks(book, 'remove');
    } else {
      onUpdateBooks({ ...book, category }, 'add');
    }
  };

  // Comprobar si el libro ya está guardado
  const isBookSaved = () => {
    return savedBooks.some(savedBook => savedBook.id === book.id);
  };

  const title = book.volumeInfo?.title || 'Título no disponible';
  const author = book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : 'Autor no disponible';
  const publishedDate = book.volumeInfo?.publishedDate || 'Fecha de publicación no disponible';
  const description = book.volumeInfo?.description || '';
  const infoLink = book.volumeInfo?.infoLink || '#'; // Enlace al libro, con valor por defecto

  // Truncar la descripción si es demasiado larga
  const truncatedDescription = description.length > 150 ? description.substring(0, 555) + '...' : description;

  return (
    <div className="libro">
      {/* Hacer el título clicable */}
      <h2>
        <a href={infoLink} target="_blank" rel="noopener noreferrer" className="titulo-link">
          {title}
        </a>
      </h2>

      <p><strong>Autor:</strong> {author}</p>
      <p><strong>Fecha de publicación:</strong> {publishedDate}</p>
      
      {/* Mostrar la descripción sin encabezado */}
      <p>{truncatedDescription}</p>
      
      {/* Mostrar la categoría */}
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Seleccionar categoría</option>
        <option value="Aventuras">Aventuras</option>
        <option value="Ciencia Ficción">Ciencia Ficción</option>
        <option value="Histórica">Histórica</option>
        <option value="Novela Negra">Novela Negra</option>
        <option value="Romántica">Romántica</option>
        <option value="Terror">Terror</option>
        <option value="Tecnología">Tecnología</option>
      </select>

      {/* Botón para añadir o eliminar */}
      <button onClick={handleSaveOrRemove}>
        {isBookSaved() ? 'Eliminar de la lista' : 'Añadir a la lista'}
      </button>
    </div>
  );
};

export default Libro;
