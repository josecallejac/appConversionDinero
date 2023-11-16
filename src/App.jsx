import { Box, Container, Grid, Link, Typography} from '@mui/material'
import InputAmout from './components/InputAmout'
import SelectorPais from './components/SelectorPais'
import CambioMoneda from './components/CambioMoneda'
import { CurrencyContext } from './context/CurrencyContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,  
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency]= useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  console.log(resultCurrency)

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "fca_live_IcbbrCKRroEBJZ251COzdDIaAStBNCLKqoaraZWg",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])




  const estiloBox ={
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }



  return (      
      <Container maxWidth="md" sx={estiloBox}>
        <Typography variant='h5' sx={{marginBottom: "2rem"}}>
          ¡Mantente al tanto para una conversión precisa!</Typography>
        <Grid container spacing={2}>
          <InputAmout />
          <SelectorPais value={fromCurrency} setValue={setFromCurrency} label="From"/>
          <CambioMoneda />
          <SelectorPais value={toCurrency} setValue={setToCurrency} label="To" />
        </Grid>
        {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
      



      </Container>
      
  )
}

export default App
