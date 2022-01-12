import React, {useState} from "react";

export default function ProductForm() {

    const [product, setProduct] = useState({name: "", description: ""})


    const submitHandler = event => {
        event.preventDefault()

        const newProduct = {
            ...product,
            id: Date.now().toString()
        }
        console.log(newProduct)
        setProduct({name: "", description: ""})
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return(
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Product name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={product.name}
                    name="name"
                    onChange={handleInputChange}
                    />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Product description</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="description"
                    value={product.description}
                    name="description"
                    onChange={handleInputChange} 
                    />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}