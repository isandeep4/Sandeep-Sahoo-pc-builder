import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

axios.get('data.json')
    .then(res => console.log(res.data))
    .catch(err => console.log(err));