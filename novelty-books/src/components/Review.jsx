'use client'

import React from "react"
import styles from './Review.module.css'

export default function Review({user, setTotalBooks}) {

    function sendComent() {
        // const coment = document.querySelector("textarea").value
        // fetch(process.env.RUTA_BACK+"/enviarComentario", {
        //     method: "POST",
        //     body: JSON.stringify({user,coment}),
        //     headers: {
        //         "Content-Type": "application/json",
        //       },
        //   })
        //   .then(response => response.json())
        //   .then(coment => setTotalBooks((totalBooks) => ({
        //     ...totalBooks,
        //     bookDetail: {
        //         ...totalBooks.bookDetail,
        //         coment: [...totalBooks.bookDetail.coment, coment]
        //     }
        //   })))

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.userCard}>
                <i class="bi bi-person-circle"></i><span>{user.name}</span>
            </div>
            <div className={styles.starsDiv}>
                <i className="bi-star-fill"></i>
                <i className="bi-star-fill"></i>
                <i className="bi-star-fill"></i>
                <i className="bi-star-fill"></i>
                <i className="bi-star-fill"></i>
            </div>
            <div className={styles.commentDiv}>
                <textarea
                    placeholder="Tell us your experience..."
                />
            </div>
            <button onClick={sendComent} className={styles.button}>Comment <i class="bi bi-chat-left-dots-fill"></i></button>
        </div>
    )
}