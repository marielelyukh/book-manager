import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class BookDialogComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book | null
  ) {
    this.bookForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      author: [data?.author || '', [Validators.required]],
      year: [data?.year || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      coverImage: [data?.coverImage || '']
    });
  }

  onSave() {
    if (this.bookForm.valid) {
      const book: Book = {
        ...this.bookForm.value,
        id: this.data?.id || 0,
      };

      if (this.data) {
        this.bookService.updateBook(book);
      } else {
        this.bookService.addBook(book);
      }

      this.dialogRef.close();
    }
  }
}
