// Función para guardar un libro en localStorage con la categoría seleccionada
export const saveBookToCategory = (book, category) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    
    // Añadir la categoría al libro antes de guardarlo
    const bookWithCategory = { ...book, category };
    
    savedBooks.push(bookWithCategory);
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
  };
  
  export const removeBookFromCategory = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const updatedBooks = savedBooks.filter(b => b.id !== book.id); // Filtra el libro que queremos eliminar
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks)); // Guarda la lista actualizada
  };
  
  // Función para obtener los libros guardados de localStorage
  export const getSavedBooks = () => {
    return JSON.parse(localStorage.getItem('savedBooks')) || [];
  };
  