'use client'

import React from "react"
import styles from './Review.module.css'
import useUpdateBooks from "@/hooks/useUpdateBooks"

export default function Review({idBook, user, updateBook, setComment}) {

    const {postRatings} = useUpdateBooks()

    const [idBookState, setIdBook] = React.useState("")

    React.useEffect(() => {
        setIdBook(idBook)
    })

    const [reviewObj, setReviewObj] = React.useState({
        name: user.name,
        rate: 0,
        comment: "",
        userId: user._id
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        if(!id){
            setReviewObj(prev => ({
                ...prev,
                comment: value
            }))
        }else{
            setReviewObj(prev => ({
                ...prev,
                rate: parseFloat(parseFloat(id).toFixed(1))
            }))
        }
    }
    
    const sendReview = () => {
        postRatings(reviewObj, idBookState)
        const textareaList = document.getElementsByTagName('textarea')
        textareaList[0].value = ''
        setReviewObj({
            name: user.name,
            rate: 0,
            comment: "",
            userId: user._id
        })
        setComment({reviewObj, idBookState})
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.userCard}>
                <i className="bi bi-person-circle"></i><span>{user.name}</span>
            </div>
            <div className={styles.starsDiv}>
                {
                    [1, 2, 3, 4, 5].map((star, idx) => (
                        <span 
                            key={star} 
                            className={`${reviewObj.rate >= star ? styles.selected : ""}`}
                            id={idx + 1}
                            onClick={handleChange}
                        >
                        </span>
                    ))
                }
            </div>
            <div className={styles.commentDiv}>
                <textarea
                    placeholder="Tell us your experience..."
                    value={reviewObj.comment}
                    onChange={handleChange}
                    name="comment"
                />
            </div>
            <button onClick={sendReview} className={styles.button}>Comment <i className="bi bi-chat-left-dots-fill"></i></button>
        </div>
    )
}