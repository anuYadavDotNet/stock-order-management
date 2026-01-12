import { useState } from "react";
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

function OrderTable({ orders = [], onDelete }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customer");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let valueA = a[orderBy];
    let valueB = b[orderBy];

    if (typeof valueA === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order === "asc" ? valueA - valueB : valueB - valueA;
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "customer"}
                direction={order}
                onClick={() => handleSort("customer")}
              >
                Customer Name
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "stock"}
                direction={order}
                onClick={() => handleSort("stock")}
              >
                Stock Name
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "qty"}
                direction={order}
                onClick={() => handleSort("qty")}
              >
                Order Qty
              </TableSortLabel>
            </TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedOrders.map((orderItem) => (
            <TableRow key={orderItem.id}>
              <TableCell>{orderItem.customer}</TableCell>
              <TableCell>{orderItem.stock}</TableCell>
              <TableCell>{orderItem.qty}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => onDelete(orderItem.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Orders
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
