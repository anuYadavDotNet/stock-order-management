import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

function AddOrderModal({ open, onClose, stocks, onAdd }) {
  const [customer, setCustomer] = useState("");
  const [stockName, setStockName] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const selectedStock = stocks?.find(s => s.name === stockName);

  const handleSave = () => {
    if (!customer.trim()) {
      setError("Customer name is required");
      return;
    }

    if (!stockName) {
      setError("Please select a stock");
      return;
    }

    if (qty <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (qty > selectedStock.qty) {
      setError("Order quantity exceeds available stock");
      return;
    }

    onAdd({
      customer,
      stock: stockName,
      qty: Number(qty),
    });

    setCustomer("");
    setStockName("");
    setQty("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Order</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <TextField
          fullWidth
          select
          margin="dense"
          label="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        >
          {stocks.map(stock => (
            <MenuItem key={stock.name} value={stock.name}>
              {stock.name} (Available: {stock.qty})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="dense"
          type="number"
          label="Order Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOrderModal;
