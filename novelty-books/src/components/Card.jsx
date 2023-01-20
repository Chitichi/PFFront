const Card = ({title, image, price,author}) => (
    <>
        <div class="col mb-5">
                        <div class="card h-100">
                            
                            <div class="badge bg-dark text-white position-absolute" style={{top: 10, right: 10}}>Sale</div>
                            
                            <img class="card-img-top" style={{height: 270, width: 223}} src={image} alt="..." />
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                                    <h5 class="fw-bolder">{title}</h5>
                                    <p>{author}</p>
                                    
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        
                                        
                                    </div>
                                    
                                    <span >$ {price}</span>
                                    
                                </div>
                            </div>
                            
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>
                    </div>
    </>
)

export default Card;