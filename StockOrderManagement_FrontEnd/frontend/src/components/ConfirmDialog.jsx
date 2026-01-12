import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ConfirmDialog({ open, title, message, onConfirm, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted={false}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
