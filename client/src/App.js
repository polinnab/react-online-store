import axios from "axios"
import {get} from "./utils/_apiRequests"

// for test
const testrequest = () => {
  axios.get('http://localhost:5001/api/products')
  .then(response => {
    console.log(response)
  })
}
// testrequest()

const products = get('http://localhost:5001/api/products')
console.log(products)
// 

function App() {
  return (
    <div className="container pt-3">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
