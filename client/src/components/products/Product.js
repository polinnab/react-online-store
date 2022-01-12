import React from "react";

export default function Product({product}) {
    return (
        <div className="card" style={{width: '18rem'}}>
          <img src={product.images[0].big} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <a href="/" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    )
}

// images have not relative src !