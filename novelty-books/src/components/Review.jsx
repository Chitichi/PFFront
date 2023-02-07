'use client'

import React from "react"
import styles from './Review.module.css'

export default function Review({user, setTotalBooks}) {

    const [reviewObj, setReviewObj] = React.useState({
        user: user.name,
        rating: "",
        comment: ""
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
                rating: parseFloat(id).toFixed(1)
            }))
        }
    }

    function sendComent() {
        //envía esta reseña a la base de datos
    }

    return(
        <div className={styles.wrapper}>
            <h6>{JSON.stringify(reviewObj)}</h6>
            <div className={styles.userCard}>
                <i className="bi bi-person-circle"></i><span>{user.name}</span>
            </div>
            <div className={styles.starsDiv}>
                <i onClick={handleChange} id="1.0" className="bi-star-fill"></i>
                <i onClick={handleChange} id="2.0" className="bi-star-fill"></i>
                <i onClick={handleChange} id="3.0" className="bi-star-fill"></i>
                <i onClick={handleChange} id="4.0" className="bi-star-fill"></i>
                <i onClick={handleChange} id="5.0" className="bi-star-fill"></i>
            </div>
            <div className={styles.commentDiv}>
                <textarea
                    placeholder="Tell us your experience..."
                    value={reviewObj.comment}
                    onChange={handleChange}
                    name="comment"
                />
            </div>
            <button onClick={sendComent} className={styles.button}>Comment <i className="bi bi-chat-left-dots-fill"></i></button>
        </div>
    )
}