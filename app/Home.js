'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Paper, Grid, AppBar, Toolbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home({ user }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pantryItems'));
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantryItems'), newItem);
      setNewItem({ name: '', quantity: 0 });
      fetchItems();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await updateDoc(doc(db, 'pantryItems', id), { quantity: newQuantity });
      fetchItems();
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" component={Link} href="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.email}'s Pantry Manager
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add New Item
          </Typography>
          <form onSubmit={addItem}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
                  Add Item
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Pantry Items
          </Typography>
          <List>
            {items.map((item) => (
              <ListItem key={item.id} sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} color="primary">
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => deleteItem(item.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}





