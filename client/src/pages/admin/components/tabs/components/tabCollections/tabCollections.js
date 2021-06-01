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
  ConfirmDelete
} from "../../../../../../components";
import { Form } from "./components";

// api
import {
  getCollections,
  deleteCollection
} from "../../../../../../services/collection";

// styles
import useStyles from "./styles";

const fields = [
  { label: "User", value: "username" },
  { label: "Name", value: "name" },
  { label: "Total Cards", value: "cards" }
];

const TabCollections = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [collection, setCollection] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    const res = await getCollections();

    if (res) {
      const data = res.map((r) => ({
        ...r,
        username: r.user.username,
        cards: r.cards.length
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
    setOpenConfirm(true);
    setCollection(el);
  };

  const handleClose = async () => {
    setOpenConfirm(false);
  };

  const handleEdit = async (id) => {
    history.push({
      pathname: "./collectionDetails",
      state: { id, from: location.pathname }
    });
  };

  const handleDelete = async (id) => {
    const res = await deleteCollection(id);

    if (res) {
      setOpenConfirm(!openConfirm);
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
      <Modal open={openForm} handleClose={handleForm} title="Add collection">
        <Form getData={getData} handleForm={handleForm} />
      </Modal>
      <Grid item xs={10} className={classes.table}>
        {isLoading ? (
          <Grid container justify="center" className={classes.loading}>
            <CircularProgress />
          </Grid>
        ) : (
          <Table
            fields={fields}
            data={data}
            handleSearchResult={handleSearchResult}
            handleConfirm={handleConfirm}
            handleEdit={handleEdit}
            item="collections"
          />
        )}
      </Grid>
      <ConfirmDelete
        open={openConfirm}
        handleClose={handleClose}
        handleDelete={() => handleDelete(collection._id)}
        item="collection"
        name={collection.name}
      />
    </Grid>
  );
};

export default TabCollections;
