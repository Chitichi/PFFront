const Card = ({title, image, price,author}) => (
    <>
        <div className="col mb-5">
            <div className="card h-100">
                
                <div className="badge bg-dark text-white position-absolute" style={{top: 10, right: 10}}>Sale</div>
                
                <img className="card-img-top" style={{height: 270, width: 223}} src={image} alt="..." />
                
                <div className="card-body p-4">
                    <div className="text-center">
                        
                        <h5 className="fw-bolder">{title}</h5>
                        <p>{author}</p>
                        
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            
                            
                        </div>
                        
                        <span >$ {price}</span>
                        
                    </div>
                </div>
                
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><button className="btn btn-outline-dark mt-auto" href="#">Add to cart</button></div>
                </div>
            </div>
        </div>
    </>
)

export default Card;