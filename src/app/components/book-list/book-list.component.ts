import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { Book } from '../../services/book.model';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule, MaterialModule, FormsModule],
})
export class BookListComponent {
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  searchTerm: string = '';
  displayedColumns = ['title', 'author', 'year', 'actions'];

  constructor(private bookService: BookService, private dialog: MatDialog) {
    this.bookService.books$.subscribe(books => {
      this.dataSource.data = books ?? [];
    });
  }

  openBookDialog(book: Book | null = null) {
    this.dialog.open(BookDialogComponent, {
      data: book,
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    this.dataSource.filterPredicate = (data: Book, filter: string) => {
      return data.title.toLowerCase().includes(filter) || data.author.toLowerCase().includes(filter);
    };
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId);
  }
}
