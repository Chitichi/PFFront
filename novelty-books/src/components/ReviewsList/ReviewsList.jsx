import React from "react";
import styles from "./ReviewsList.module.css"

export default function ReviewsList({ratings, comment}){
    console.log('estoy en el reviewList', comment)
    return(
        <div className={styles.wrapper}>
            {
                ratings.rating && <div className={styles.up}>
                <h4>{`Comments`}</h4>
            </div>
            }
            <div className={styles.bottom}>
            {
                comment.idBookState ? <div className={styles.reviewWrapper}>
                    <div className={styles.topComment}>
                        <i className="bi bi-person-circle"><span>{comment.reviewObj.name}</span></i>
                        <h5>{comment.reviewObj.rate} ★</h5>
                    </div>
                    <h5>{comment.reviewObj.comment}</h5>
                </div> : null
            }
            {
                ratings.rating ? ratings.rating.map((review, idx) => (
                    <div key={idx} className={styles.reviewWrapper}>
                        <div className={styles.topComment}>
                            <i className="bi bi-person-circle"><span>{review.name}</span></i>
                            <h5>{review.rate} ★</h5>
                        </div>
                        <h5>{review.comment}</h5>
                    </div>
                )) : <h5 className={styles.noComments}>No comments yet</h5>
            }
            </div>
            
        </div>
    )
}