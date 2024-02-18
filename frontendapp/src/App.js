import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProduts] = useState([])
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState({ id: "9", name: "asd", catId: "3" })
  const [newCategory, setNewCategory] = useState({ id: "7", name: "Deneme3" })

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [])

  const fetchProducts = async () => {
    const prods = await axios.get(`http://localhost:3000/products`)
    setProduts(prods.data)
  }
  const fetchCategories = async () => {
    const cats = await axios.get(`http://localhost:3000/categories`)
    setCategories(cats.data)
  }
  const updateProduct = async () => {
    try {
      const newProd = await axios.post(`http://localhost:3000/products`, newProduct)
      console.log("Ürün başarıyla eklendi => " + newProd.data)
      fetchProducts()
    }
    catch (err) {
      console.error('Ürün eklenirken bir hata oluştu:', err.response.data);
    }
  }

  const updateCategory = async () => {
    try {
      const newCat = await axios.post("http://localhost:3000/categories", newCategory)
      console.log("Ürün başarıyla eklendi => " + newCat.data)
      fetchCategories()
    }
    catch (err) {
      console.error('Kategori eklenirken bir hata oluştu:', err.response.data);
    }
  }


  return (
    <div>
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
        <button type="button" onClick={() => updateCategory()}>Click!</button>
      </div>
    </div>
  );
}

export default App;
