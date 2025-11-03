import { Book, User } from "./models";
import { Library } from "./library";
import { Storage } from "./storage";

export class LibraryService {
  private _books: Library<Book>;
  private _users: Library<User>;
  private static _instance: LibraryService;

  public static getInstance(): LibraryService {
    if (!this._instance) this._instance = new LibraryService();

    return this._instance;
  }

  constructor() {
    const storageBooks = JSON.parse(Storage.get("books") ?? "[]") as Book[];
    const storageUsers = JSON.parse(Storage.get("users") ?? "[]") as User[];

    if (Array.isArray(storageBooks) && Array.isArray(storageUsers)) {
      console.log("Data loaded from storage");
      this._books = new Library<Book>(storageBooks);
      this._users = new Library<User>(storageUsers);
    } else {
      console.log("No data in storage, initializing empty library");
      Storage.clear();
      this._books = new Library<Book>();
      this._users = new Library<User>();
    }

    window.addEventListener("beforeunload", () => {
      Storage.set("books", JSON.stringify(this._books.get()));
      Storage.set("users", JSON.stringify(this._users.get()));
    });
  }

  public getBooks(): Book[] {
    return this._books.get();
  }

  public getUsers(): User[] {
    return this._users.get();
  }

  public addBook(book: Book): void {
    this._books.add(book);
  }

  public addUser(user: User): void {
    this._users.add(user);
  }

  public removeBook(bookName: string): void {
    this._books.remove(
      this._books.search((book: Book) => book.getName === bookName),
    );
  }

  public removeUser(userId: number): void {
    this._users.remove(
      this._users.search((user: User) => user.getId === userId),
    );
  }

  public updateBook(oldBookId: number, newBook: Book): void {
    const oldBook = this._books.search(
      (book: Book) => book.getId === oldBookId,
    );
    this._books.update(oldBook, newBook);
  }

  public updateUser(oldUserId: number, newUser: User): void {
    const oldUser = this._users.search(
      (user: User) => user.getId === oldUserId,
    );
    this._users.update(oldUser, newUser);
  }

  public findBook(bookName: string): Book | undefined {
    return this._books.search((book: Book) => book.getName === bookName);
  }

  public findUser(userId: number): User | undefined {
    return this._users.search((user: User) => user.getId === userId);
  }
}
