import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, description: 'A classic novel...', coverImage: '' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, description: 'A gripping story...', coverImage: '' }
  ]);

  books$ = this.booksSubject.asObservable();

  addBook(book: Book) {
    const books = this.booksSubject.value;
    this.booksSubject.next([...books, { ...book, id: books.length + 1 }]);
  }

  updateBook(updatedBook: Book) {
    const books = this.booksSubject.value.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    this.booksSubject.next(books);
  }

  deleteBook(bookId: number) {
    const books = this.booksSubject.value.filter(book => book.id !== bookId);
    this.booksSubject.next(books);
  }
}
