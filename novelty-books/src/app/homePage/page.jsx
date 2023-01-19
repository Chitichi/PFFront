import BookCard from "../components/BookCard"
import booksArray from "../../books Array/books.json"
import styles from "./home.module.css"

export default function HomePage(){
    return(
        <>
            <h1>Esta es la Home Page</h1>
            <div className={styles.gridHome}>
                {
                    booksArray.books.map(book => {
                        return(
                            <BookCard
                                title={book.title}
                                image={book.image}
                                price={book.price}
                                isbn={book.isbn13}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}