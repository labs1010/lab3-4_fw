export interface IBook {
  getId: number;
  getName: string;
  getAuthor: string;
  getReleaseYear: number;
  isBorrowed(): boolean;
}

export class Book implements IBook {
  private id: number;
  private name: string;
  private author: string;
  private releaseYear: number;
  private borrower: number = 0;

  constructor(id: number, name: string, author: string, releaseYear: number) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.releaseYear = releaseYear;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getAuthor(): string {
    return this.author;
  }

  get getReleaseYear(): number {
    return this.releaseYear;
  }

  get getBorrower(): number {
    return this.borrower;
  }

  isBorrowed(): boolean {
    return this.borrower != 0;
  }

  borrow(borrowerId: number): void {
    this.borrower = borrowerId;
  }

  return(): void {
    this.borrower = 0;
  }
}

export interface IUser {
  getId: number;
  getName: string;
  getEmail: string;
}

export class User implements IUser {
  private id: number;
  private name: string;
  private email: string;
  private borrowedBooks: number = 0;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  public borrowBook(book: Book): boolean {
    if (this.borrowedBooks > 3 || book.isBorrowed()) {
      return false;
    }
    this.borrowedBooks++;
    book.borrow(this.id);
    return true;
  }

  public returnBook(): boolean {
    if (this.borrowedBooks > 0) {
      this.borrowedBooks--;
      return true;
    }
    return false;
  }
}
