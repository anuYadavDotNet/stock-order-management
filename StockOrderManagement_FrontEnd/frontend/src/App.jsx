import { Container, Typography, Tabs, Tab } from "@mui/material";
import StockPage from "./pages/StockPage";
import OrderPage from "./pages/OrderPage";
import { useEffect, useState } from "react";
import { getStocks } from "./services/stockService";

function App() {
  const [tab, setTab] = useState(0);
  const [stocks, setStocks] = useState([]);

useEffect(() => {
  if (tab === 0) {
    getStocks().then(res => setStocks(res.data));
  }
}, [tab]);


  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Stock Order Management
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Stocks" />
        <Tab label="Orders" />
      </Tabs>

      {tab === 0 && (
        <StockPage stocks={stocks} setStocks={setStocks} />
      )}

      {tab === 1 && (
        <OrderPage stocks={stocks} setStocks={setStocks} />
      )}
    </Container>
  );
}

export default App;
