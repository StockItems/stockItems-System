import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface StockUpdateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (id: number, quantity: number) => void; // Define how onConfirm is structured
    id: number; // Assuming `id` is the identifier for the tool whose stock is being updated
}

const StockUpdateDialog: React.FC<StockUpdateDialogProps> = ({ open, onClose, onConfirm, id }) => {
  const [quantity, setQuantity] = useState('');

  const handleConfirm = () => {
    const quantityNumber = parseInt(quantity, 10);
    if (!isNaN(quantityNumber)) {
      onConfirm(id, quantityNumber); // Pass both id and quantity to the parent component
      setQuantity(''); // Reset the input field after confirmation
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Stock</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockUpdateDialog;
