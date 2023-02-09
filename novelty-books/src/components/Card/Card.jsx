import styles from './Card.module.css'

const Card = ({title, image, price,author}) => (
    <>
        <div className="col mb-5">
            <div className={`card h-100 ${styles.wrapper}`}>
                
                <div className="badge bg-dark text-white position-absolute" style={{top: 10, right: 10}}>Sale</div>
                
                <img className="card-img-top" style={{height: 270, width: '100%'}} src={image} alt="..." />
                
                <div className="card-body p-4">
                    <div className="text-center">
                        
                        <h5 className="fw-bolder">{title}</h5>
                        <p>{author}</p>
                        
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            
                            
                        </div>
                        
                        <span >€ {price}</span>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </>
)

export default Card;