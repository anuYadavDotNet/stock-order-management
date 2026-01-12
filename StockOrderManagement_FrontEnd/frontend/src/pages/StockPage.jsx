import { Typography } from "@mui/material";
import StockTable from "../components/StockTable";

function StockPage({ stocks = [], setStocks }) {
  return (
    <>
      <Typography variant="h5">Stock Management</Typography>
      <StockTable stocks={stocks} setStocks={setStocks} />
    </>
  );
}

export default StockPage;
