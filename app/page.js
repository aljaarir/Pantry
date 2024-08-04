"use client"

// Import necessary components and functions from libraries
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import { doc, getDocs, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Use percentage to make it responsive
  maxWidth: 400, // Max width for larger screens
  bgcolor: '#fffffe', // Modal background color
  border: '2px solid #020826', // Modal border color
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  color: '#020826', // Text color
};

// Main component
export default function Home() {
  const [pantry, setPantry] = useState([]); // State to hold pantry items
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [itemName, setItemName] = useState(''); // State to hold the new item name
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to fetch pantry items from Firestore
  const updatePantry = async () => {
    const snapshot = collection(firestore, 'pantry');
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach(doc => {
      pantryList.push(doc.id);
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  // Fetch pantry items when the component is first rendered
  useEffect(() => {
    updatePantry();
  }, []);

  // Function to add a new item to Firestore
  const addItem = async (item) => {
    if (item.trim() === '') {
      return; // Do not add if item name is empty or whitespace
    }
    const docRef = doc(collection(firestore, 'pantry'), item);
    await setDoc(docRef, {});
    updatePantry();
  };

  // Function to remove an item from Firestore
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    updatePantry();
  };

  // Filter pantry items based on the search query
  const filteredPantry = pantry.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // Main container
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f4ef" // Background color
      color="#020826" // Text color
      gap={2}
      p={2} // Padding for better spacing on mobile
    >
      {/* Button to open the modal */}
      <Button
        variant="contained"
        sx={{ bgcolor: '#8c7851', color: '#fffffe' }} // Button color
        onClick={handleOpen}
      >
        Add
      </Button>

      {/* Search field */}
      <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ bgcolor: '#eaddcf', color: '#020826', maxWidth: '800px', width: '100%', marginTop: 2, marginBottom: 2 }} // Search field color
      />

      {/* Modal for adding a new item */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ bgcolor: '#eaddcf', color: '#020826' }} // Text field color
            />
            <Button
              variant="contained"
              sx={{ bgcolor: '#8c7851', color: '#fffffe' }} // Button color
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Container for pantry items */}
      <Box border="1px solid #020826" width="100%" maxWidth="800px">
        <Box
          height="100px"
          bgcolor="#8c7851"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid #020826"
        >
          <Typography variant="h2" color="#fffffe" textAlign="center">
            Pantry Items
          </Typography>
        </Box>

        {/* List of pantry items */}
        <Stack width="100%" height="300px" spacing={2} overflow="auto">
          {filteredPantry.map((i) => (
            <Box
              key={i}
              bgcolor="#eaddcf"
              color="#020826"
              display="flex"
              justifyContent="space-between"
              paddingX={2}
              alignItems="center"
              width="100%"
              minHeight="150px"
              border="1px solid #020826"
            >
              <Typography variant="h3" color="#020826" textAlign="center">
                {i.charAt(0).toUpperCase() + i.slice(1)} {/* Capitalize first letter */}
              </Typography>

              <Button
                variant="contained"
                sx={{ bgcolor: '#f25042', color: '#fffffe' }} // Remove button color
                onClick={() => removeItem(i)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
