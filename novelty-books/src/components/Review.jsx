'use client'

import React from "react"
import styles from './Review.module.css'

export default function Review({userName}) {
    return(
        <div className={styles.wrapper}>
            <div className={styles.userCard}>
                <i class="bi bi-person-circle"></i><span>{userName}</span>
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
            <button className={styles.button}>Comment <i class="bi bi-chat-left-dots-fill"></i></button>
        </div>
    )
}