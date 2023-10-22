import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import axios from "axios"
function App() {
  const URL = 'http://localhost:5000/products'

  const [items, setItems] = useState([]);

  const getInfo = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response)
      return response
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  useEffect(() => {
    getInfo();
  })

  return (
    <>
      <p>PRODUCTOS</p>

      <div>
        {items.map(item => (
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be ne vo lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button> Comprar </Button>
            </CardActions>
          </Card>
        ))}

      </div>
    </>
  )
}

export default App
