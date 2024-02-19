import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000")

function App() {
  const [products, setProduts] = useState([])
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState({ id: "", name: "", catId: "" })
  const [newCategory, setNewCategory] = useState({ id: "", name: "" })
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  useEffect(() => {
    fetchProducts();
    fetchCategories();

    socket.on('chat', (data) => {
      setMessage(prevOutput => [...prevOutput, <p key={prevOutput.length}><strong>{data.sender}:</strong> {data.message}</p>]);

    })
    console.log(`Bu bir useeffect kullanımıdır`)

  }, [user])

  const fetchProducts = async () => {
    const prods = await axios.get(`http://localhost:3000/products`)
    setProduts(prods.data)
  }
  const fetchCategories = async () => {
    const cats = await axios.get(`http://localhost:3000/categories`)
    setCategories(cats.data)
  }
  const addProduct = async () => {
    try {
      const newProd = await axios.post(`http://localhost:3000/products`, newProduct)
      console.log("Ürün başarıyla eklendi => " + newProd.data)
      fetchProducts()
    }
    catch (err) {
      console.error('Ürün eklenirken bir hata oluştu:', err.response.data);
    }
  }
  const addCategory = async () => {
    try {
      const newCat = await axios.post("http://localhost:3000/categories", newCategory)
      console.log("Ürün başarıyla eklendi => " + newCat.data)
      fetchCategories()
    }
    catch (err) {
      console.error('Kategori eklenirken bir hata oluştu:', err.response.data);
    }
  }
  // const updateProduct = async () => {
  //   try {
  //     const updatedProd = await axios.put("https://localhost:3000/products",newProduct)
  //   } catch (err) {

  //   }
  // }

  const onClickSendButton = () => {
    socket.emit('chat',[user, message])
    // console.log(`Mesaj: ${message}, user: ${user}`)
  }


  return (
    <div>
      <div className="App">
        <h1>Real-Time Chat App</h1>

        <div>
          <input type="text" placeholder='Name' onChange={e => setUser(e.target.value)}></input>
          <input type="text" placeholder='Message' onChange={e => setMessage(e.target.value)}></input>
          <input type='text' placeholder={message}></input>
          <button type="button" onClick={() => onClickSendButton()}>SEND</button>
        </div>

      </div>

      <div>
        <h1>Urunler</h1>
        <ul>
          {products.sort((a, b) => a.id - b.id).map((product) => (
            <li key={product.id}>
              {product.id}{" =) "}
              <u><i>{product.name}</i></u>{' '}
              {" =) "}{categories.find(cat => cat.id === product.catId)?.name}
            </li>
          ))}
        </ul>

        <h1>Kategoriler</h1>
        <ul>
          {categories.sort((a, b) => a.id - b.id).map((category) => (
            <li key={category.id}>
              {category.id}{" =) "}
              <u><i>{category.name}</i></u>{' '}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <input type='number' value={newProduct.id} onChange={e => setNewProduct({ ...newProduct, id: e.target.value })} placeholder='Id'></input>
        <input type='text' value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder='Name'></input>
        <select onChange={(e) => setNewProduct({ ...newProduct, "catId": e.target.value })}>
          <option value={-1}>Kategori Seçin</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="button" onClick={() => addProduct()}>Click!</button>
      </div>
    </div>
  );
}

export default App;
