import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
} from "@mui/material";
import { addStock, deleteStock } from "../services/stockService";
import AddStockModal from "./AddStockModal";

function StockTable({ stocks = [], setStocks }) {
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleSort = () => {
    const sorted = [...stocks].sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setStocks(sorted);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleAddStock = async (stock) => {
    const res = await addStock(stock);
    setStocks(prev => [...prev, res.data]);
  };

  const requestDelete = (stock) => {
    if (stock.orderedQty > 0) {
      alert("Cannot delete stock. Active orders exist.");
      return;
    }

    setSelectedStock(stock);
    setConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmOpen(false);
    setSelectedStock(null);
  };

  const confirmDelete = async () => {
    if (!selectedStock) return;

    try {
      await deleteStock(selectedStock.id);

      setStocks(prev =>
        prev.filter(s => s.id !== selectedStock.id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete stock");
    } finally {
      closeConfirmDialog();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Stock
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleSort}
                >
                  Stock Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Available Qty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.qty}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => requestDelete(stock)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {stocks.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Stocks Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddStockModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddStock}
        existingStocks={stocks}
      />

      {confirmOpen && (
  <ConfirmDialog
    key={selectedStock?.id}
    open
    title="Delete Stock"
    message={`Are you sure you want to delete "${selectedStock?.name}"?`}
    onConfirm={confirmDelete}
    onClose={closeConfirmDialog}
  />
)}


    </>
  );
}

export default StockTable;