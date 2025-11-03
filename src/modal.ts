export class Modal {
    private static _instance: Modal;

    public static getInstance(): Modal {
        if (!this._instance) this._instance = new Modal();

        return this._instance;
    }

    constructor() {
        const modal = document.querySelector(".modal") as HTMLDivElement;
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }

    public show(message: string): void {
        const modal = document.querySelector(".modal") as HTMLDivElement;

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        const modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-dialog-centerd";

        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.textContent = message;

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Ok";
        button.className = "btn btn-primary";
        button.addEventListener("click", this.hide);

        modalFooter.appendChild(button);

        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);

        modal.innerHTML = "";
        modal.appendChild(modalDialog);

        this.appear();
    }

    public askId(): void {
        const modal = document.querySelector(".modal") as HTMLDivElement;

        const modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-dialog-centered";

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";

        const modalTitle = document.createElement("h5");
        modalTitle.className = "modal-title";
        modalTitle.textContent = "Введіть ID користувача для позичення книги:";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "btn-close";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        closeButton.addEventListener("click", this.hide);

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        const borrowForm = document.createElement("form");
        borrowForm.className = "needs-validation";
        borrowForm.noValidate = true;
        borrowForm.name = "borrow-form";
        borrowForm.id = "borrow-form";

        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.className = "form-control";
        inputField.pattern = "\\d+";
        inputField.placeholder = "ID";
        inputField.required = true;

        modalBody.appendChild(inputField);

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "btn btn-secondary";
        cancelButton.setAttribute("data-bs-dismiss", "modal");
        cancelButton.textContent = "Скасувати";
        cancelButton.addEventListener("click", this.hide);

        const saveButton = document.createElement("button");
        saveButton.type = "submit";
        saveButton.className = "btn btn-primary";
        saveButton.textContent = "Зберегти";

        modalFooter.appendChild(cancelButton);
        modalFooter.appendChild(saveButton);

        borrowForm.appendChild(modalBody);
        borrowForm.appendChild(modalFooter);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(borrowForm);

        modalDialog.appendChild(modalContent);

        modal.innerHTML = "";
        modal.appendChild(modalDialog);

        this.appear();
    }

    private appear(): void {
        const modal = document.querySelector(".modal") as HTMLDivElement;

        modal.classList.add("show");
        document.body.classList.add("modal-open");
        modal.style.display = "block";
        modal.ariaHidden = "false";
        modal.ariaModal = "true";
        modal.role = "dialog";
    }

    private hide(): void {
        const modal = document.querySelector(".modal") as HTMLDivElement;

        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        modal.ariaHidden = "true";
        modal.ariaModal = "false";
        modal.role = "";
    }
}
