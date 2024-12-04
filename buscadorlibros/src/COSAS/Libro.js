import React, { useState } from 'react';

const Libro = ({ book, onUpdateBooks, savedBooks, onAccessBook }) => {
  const [category, setCategory] = useState(book.category || ''); 

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSaveOrRemove = () => {
    if (isBookSaved()) {
      onUpdateBooks(book, 'remove');
    } else {
      onUpdateBooks({ ...book, category }, 'add');
    }
  };

  const isBookSaved = () => {
    return savedBooks.some(savedBook => savedBook.id === book.id);
  };

  const titulo = book.volumeInfo?.title || 'Título no disponible';
  const autor = book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : 'Autor no disponible';
  const fecha = book.volumeInfo?.publishedDate || 'Fecha de publicación no disponible';
  const desc = book.volumeInfo?.description || '';
  const infoLink = book.volumeInfo?.infoLink || '#';

  const truncatedDescription = desc.length > 555 ? desc.substring(0, 555) + '...' : desc;

  const handleAccessBook = () => {
    onAccessBook(book); // Registrar acceso completo
    window.open(infoLink, '_blank');
  };

  return (
    <div className="libro">
      <h2 onClick={handleAccessBook} >
        {titulo}
      </h2>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Fecha de publicación:</strong> {fecha}</p>
      <p>{truncatedDescription}</p>
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
      <button onClick={handleSaveOrRemove}>
        {isBookSaved() ? 'Eliminar de la lista' : 'Añadir a la lista'}
      </button>
    </div>
  );
};

export default Libro;
