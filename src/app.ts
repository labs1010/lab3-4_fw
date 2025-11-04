// import all modules here
import { Modal } from "./modal";
import { Book, User } from "./models";
import { LibraryService } from "./services";
import { Validation } from "./validation";

// etc.

class App {
    private _validation: Validation;
    private _service: LibraryService;
    private _modal: Modal;

    constructor() {
        //localStorage.clear();
        this._validation = Validation.getInstance();
        this._service = LibraryService.getInstance();
        this._modal = Modal.getInstance();
        this.updateUI();

        const addBookForm = document.forms.namedItem(
            "add-book",
        ) as HTMLFormElement;
        const addUserForm = document.forms.namedItem(
            "add-user",
        ) as HTMLFormElement;

        addBookForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this._validation.validateForm(addBookForm)) {
                const id = Date.now();
                const name = addBookForm["book-name"].value;
                const author = addBookForm["book-author"].value;
                const releaseYear = parseInt(addBookForm["release-year"].value);

                const book = new Book(id, name, author, releaseYear);
                this._service.addBook(book);

                addBookForm.reset();
                addBookForm.classList.remove("was-validated");
                this.updateUI();
            }
        });

        addUserForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this._validation.validateForm(addUserForm)) {
                const name = addUserForm["user-name"].value;
                const email = addUserForm["user-email"].value;
                const id = Date.now(); // Generate a unique ID based on timestamp

                const user = new User(id, name, email);
                this._service.addUser(user);

                addUserForm.reset();
                addUserForm.classList.remove("was-validated");
                this.updateUI();
            }
        });
    }

    updateUI(): void {
        const returnBook = (book: Book) => {
            const user = this._service
                .getUsers()
                .find((u) => u.getId === book.getBorrower) as User;
            Object.setPrototypeOf(book, Book.prototype);
            Object.setPrototypeOf(user, User.prototype);
            if (user && user.returnBook() && book.isBorrowed()) {
                book.return();

                this._service.updateBook(book.getId, book);
                this._service.updateUser(user.getId, user);

                this._modal.show(
                    `${book.getName} by ${book.getAuthor} (${book.getReleaseYear}) успішно повернена користувачем ${user.getId} ${user.getName} (${user.getEmail}).`,
                );
                this.updateUI();
            } else {
                this._modal.show(`Не вдалося повернути книгу.`);
            }
        };

        const borrowBook = (book: Book) => {
            this._modal.askId();

            const handleSubmit = (e: Event) => {
                e.preventDefault();
                console.log("e");

                const form = e.target as HTMLFormElement;
                if (this._validation.validateForm(form)) {
                    const userId = parseInt(
                        (form[0] as HTMLInputElement).value,
                    );
                    const user = this._service.findUser(userId);
                    if (user) {
                        Object.setPrototypeOf(book, Book.prototype);
                        Object.setPrototypeOf(user, User.prototype);

                        if (user && user.borrowBook(book)) {
                            console.log("e");
                            this._service.updateBook(book.getId, book);
                            this._service.updateUser(user.getId, user);
                            this._modal.show(
                                `${book.getName} by ${book.getAuthor} (${book.getReleaseYear}) успішно позичена користувачем ${user.getId} ${user.getName} (${user.getEmail}).`,
                            );
                            this.updateUI();
                        } else {
                            console.log("e");
                            this._modal.show(
                                `Не вдалося позичити книгу. Можливо, користувач досяг ліміту позичених книг або книга вже позичена.`,
                            );
                        }
                    } else {
                        this._modal.show("Не вдалося знайти користувача");
                    }
                }
            };

            const form = document.getElementById("borrow-form");
            form?.addEventListener("submit", handleSubmit);
        };

        // update the user interface here
        const bookList = document.getElementById("book-list") as Element;
        bookList.innerHTML = "";
        this._service.getBooks().forEach((book) => {
            Object.setPrototypeOf(book, Book.prototype);
            const bookItem = document.createElement("div");
            bookItem.className =
                "d-flex justify-content-between align-items-center border-bottom py-3";

            const bookInfo = document.createElement("span");
            bookInfo.textContent = `${book.getName} by ${book.getAuthor} (${book.getReleaseYear})`;

            const actionButton = document.createElement("button");
            actionButton.className = book.isBorrowed()
                ? "btn btn-warning"
                : "btn btn-primary";
            actionButton.type = "button";
            actionButton.textContent = book.isBorrowed()
                ? "Повернути"
                : "Позичити";

            if (book.isBorrowed()) {
                actionButton.addEventListener("click", () => returnBook(book));
            } else {
                actionButton.addEventListener("click", () => borrowBook(book));
            }

            bookItem.appendChild(bookInfo);
            bookItem.appendChild(actionButton);
            bookList.appendChild(bookItem);
        });

        const userList = document.getElementById("user-list") as Element;
        userList.innerHTML = "";
        this._service.getUsers().forEach((user) => {
            Object.setPrototypeOf(user, User.prototype);
            userList.innerHTML += `
                <div class="d-flex align-items-center py-3 border-bottom">
                    <span>${user.getId} ${user.getName} (${user.getEmail})</span>
                </div>
            `;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});
