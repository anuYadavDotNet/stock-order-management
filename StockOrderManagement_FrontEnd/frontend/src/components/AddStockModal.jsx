import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function AddStockModal({ open, onClose, onAdd, existingStocks }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Stock name is required");
      return;
    }

    if (existingStocks.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      setError("Stock name already exists");
      return;
    }

    if (qty <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    onAdd({ 
  name: name.trim(),
  qty: Number(qty),
  orderedQty: 0  
});

    setName("");
    setQty("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Stock</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Stock Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Stock Quantity"
          type="number"
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

export default AddStockModal;
