import styles from './BookCard.module.css'

export default function BookCard({title, image, price, isbn}){
    return(
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <img src={image} alt="Book Image"/>
            </div>
            <div className={styles.bottom}>
                <h4>{title}</h4>
                <h5>{isbn}</h5>
                <h5>{price}</h5>
            </div>
        </div>
    )
}