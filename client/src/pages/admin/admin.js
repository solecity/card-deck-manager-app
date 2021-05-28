// base
import React, { useState, useEffect } from "react";

// external components
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Typography,
  Select,
  Button,
  IconButton
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

// api
import { getUsers, createUser, deleteUser } from "../../services/user";
import { getCards } from "../../services/card";
import { getCollections } from "../../services/collection";

// styles
import useStyles from "./styles";

const Admin = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    username: "",
    name: "",
    password: "",
    type: 2
  });
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [collections, setCollections] = useState([]);

  const getData = async () => {
    const [users, cards, collections] = await Promise.all([
      getUsers(),
      getCards(),
      getCollections()
    ]);

    if (users) {
      setUsers(users);
    }

    if (cards) {
      setCards(cards);
    }

    if (collections) {
      setCollections(collections);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(data);

    if (res) {
      setData({ username: "", name: "", password: "", type: 2 });

      getData();
    }
  };

  const handleEdit = () => {
    /// edit user
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);

    if (res) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [users]);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Admin Panel</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">Add user</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            size="small"
            type="text"
            label="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            size="small"
            type="text"
            label="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            size="small"
            type="password"
            label="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Select
            native
            fullWidth
            variant="outlined"
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value={1}>Admin</option>
            <option value={2}>Standard</option>
          </Select>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </Grid>
      <Grid container item xs={8} className={classes.table}>
        <Typography variant="h6">Users</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.type}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(user._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container item xs={8} className={classes.table}>
        <Typography variant="h6">Cards</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="center">{card.user}</TableCell>
                <TableCell align="center">{card.name}</TableCell>
                <TableCell align="center">{card.description}</TableCell>
                <TableCell align="center">{card.value}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(card._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(card._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container item xs={8} className={classes.table}>
        <Typography variant="h6">Collections</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Total Cards</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="center">{collection.user}</TableCell>
                <TableCell align="center">{collection.name}</TableCell>
                <TableCell align="center">{collection.cards.length}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(collection._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(collection._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Admin;
