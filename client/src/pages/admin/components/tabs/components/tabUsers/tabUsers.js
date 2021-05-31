// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// custom components
import {
  Table,
  Toolbar,
  Modal,
  ConfirmDelete,
  ConfirmWarning
} from "../../../../../../components";
import { Form } from "./components";

// api
import { getUsers, deleteUser } from "../../../../../../services/user";

// hooks
import { useAuth } from "../../../../../../hooks/useAuth";

// constants
import { USER_TYPES } from "../../../../../../constants/general";

// styles
import useStyles from "./styles";

const fields = [
  { key: "username", label: "Username", value: "username" },
  { key: "name", label: "Name", value: "name" },
  { key: "type", label: "Type", value: "type" },
  { key: "createdAt", label: "Active Since", value: "createdAt" }
];

const TabUsers = () => {
  const classes = useStyles();

  const { userId } = useAuth();

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmWarning, setOpenConfirmWarning] = useState(false);
  const [user, setUser] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    const res = await getUsers();

    if (res) {
      const data = res.map((r) => ({
        ...r,
        type: r.type === USER_TYPES.ADMIN ? "admin" : "standard"
      }));

      setData(data);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  const handleSearchResult = (value) => {
    if (search === "") return value;
    else if (value.name.toLowerCase().includes(search.toLowerCase()))
      return value;

    return false;
  };

  const handleConfirm = async (el) => {
    if (el._id === userId) {
      setOpenConfirmWarning(true);
    } else {
      setOpenConfirmDelete(true);
      setUser(el);
    }
  };

  const handleClose = async () => {
    setOpenConfirmWarning(false);
    setOpenConfirmDelete(false);
  };

  const handleEdit = async (id) => {
    history.push({
      pathname: "./userDetails",
      state: { id, from: location.pathname }
    });
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);

    if (res) {
      setOpenConfirmDelete(!openConfirmDelete);
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center" className={classes.root}>
      <Toolbar
        search={search}
        handleSearch={handleSearch}
        handleForm={handleForm}
      />
      <Modal open={openForm} handleClose={handleForm} title="Add user">
        <Form getData={getData} handleForm={handleForm} />
      </Modal>
      <Grid item xs={10} className={classes.table}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Table
            fields={fields}
            data={data}
            handleSearchResult={handleSearchResult}
            handleConfirm={handleConfirm}
            handleEdit={handleEdit}
          />
        )}
      </Grid>
      <ConfirmDelete
        open={openConfirmDelete}
        handleClose={handleClose}
        handleDelete={() => handleDelete(user._id)}
        item="user"
        name={user.name}
      />
      <ConfirmWarning open={openConfirmWarning} handleClose={handleClose} />
    </Grid>
  );
};

export default TabUsers;
