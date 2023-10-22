import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import axios from "axios"
function App() {
  const URL = 'http://localhost:5000/products'
  const [items, setItems] = useState([]);
  const getinfo = async () => {
    const res = await axios
      .get(URL)
      .catch((error) => console.log({ error }))
    setItems(res)
    return res
  }

  useEffect(() => {
    getinfo();
  })

  return (
    <>
      <p>PRODUCTOS</p>

      <div>
        {items.map((item) => (
          <Card key={item.productId}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.description}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default App
