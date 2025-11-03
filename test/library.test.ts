import { expect } from "chai";
import { Library } from "../src/library.ts";

describe("Library<T> class", () => {
  interface Book {
    title: string;
    author: string;
  }

  let library: Library<Book>;
  const book1: Book = { title: "1984", author: "George Orwell" };
  const book2: Book = { title: "Brave New World", author: "Aldous Huxley" };

  beforeEach(() => {
    library = new Library<Book>();
  });

  it("should add an object to the library", () => {
    library.add(book1);
    expect(library.get()).to.deep.include(book1);
  });

  it("should remove an existing object from the library", () => {
    library.add(book1);
    library.add(book2);
    library.remove(book1);
    expect(library.get()).to.not.deep.include(book1);
  });

  it("should update an existing object", () => {
    library.add(book1);
    const updatedBook: Book = { title: "1984", author: "Eric Blair" };
    library.update(book1, updatedBook);
    expect(library.get()).to.deep.include(updatedBook);
  });

  it("should find an object by predicate", () => {
    library.add(book1);
    library.add(book2);
    const found = library.search(b => b.title === "1984");
    expect(found).to.eql(book1);
  });
});