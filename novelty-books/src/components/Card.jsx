const Card = () => (
    <>
        <div class="col mb-5">
                        <div class="card h-100">
                            
                            <div class="badge bg-dark text-white position-absolute" style={{top: 10, right: 10}}>Sale</div>
                            
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                                    <h5 class="fw-bolder">Book's Title</h5>
                                    <p>Author's Name</p>
                                    
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        
                                        
                                    </div>
                                    
                                    <span class="text-muted text-decoration-line-through">$20.00</span>
                                    $18.00
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