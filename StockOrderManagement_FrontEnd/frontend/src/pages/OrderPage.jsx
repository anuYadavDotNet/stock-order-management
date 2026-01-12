import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import OrderTable from "../components/OrderTable";
import AddOrderModal from "../components/AddOrderModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { getStocks } from "../services/stockService";
import {
  getOrders,
  addOrder,
  deleteOrder
} from "../services/orderService";

function OrderPage({ stocks = [], setStocks }) {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const requestDelete = (id) => {
  const order = orders.find(o => o.id === id);
  setSelectedOrder(order);
  setConfirmOpen(true);
};
useEffect(() => {
  getOrders().then(res => setOrders(res.data));
}, []);

const handleAddOrder = async (order) => {
  const res = await addOrder(order);
  setOrders([...orders, res.data]);
  setStocks(res.data.updatedStocks);
};
const handleOpenAddOrder = async () => {
  const res = await getStocks();
  setStocks(res.data);
  setOpen(true);
};


const confirmDelete = async () => {
  const res = await deleteOrder(selectedOrder.id);
  setOrders(orders.filter(o => o.id !== selectedOrder.id));
  setConfirmOpen(false);
  setStocks(res.data.updatedStocks);
};

  return (
    <>
      <Typography variant="h5">Order Management</Typography>

      <Button variant="contained" onClick={handleOpenAddOrder}>
  Add Order
</Button>


      <OrderTable orders={orders} onDelete={requestDelete} />

      <AddOrderModal
        open={open}
        onClose={() => setOpen(false)}
        stocks={stocks}
        onAdd={handleAddOrder}
      />
       <ConfirmDialog
        open={confirmOpen}
        title="Delete Order"
        message={`Are you sure you want to delete order for "${selectedOrder?.customer}"?`}
        onConfirm={confirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default OrderPage;
