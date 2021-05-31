// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// custom components
import { Table, Toolbar, Modal } from "../../../../../../components";
import { Form } from "./components";

// api
import {
  getCollections,
  deleteCollection
} from "../../../../../../services/collection";

// styles
import useStyles from "./styles";

const fields = [
  { key: "user", label: "User", value: "username" },
  { key: "name", label: "Name", value: "name" },
  { key: "cards", label: "Total Cards", value: "cards" }
];

const TabCollections = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    const res = await getCollections();

    if (res) {
      setData(res);
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

  const handleEdit = async (id, user) => {
    history.push({
      pathname: "./collectionDetails",
      state: { id, user, from: location.pathname }
    });
  };

  const handleDelete = async (id) => {
    const res = await deleteCollection(id);

    if (res) {
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
          <CircularProgress />
        ) : (
          <Table
            fields={fields}
            data={data}
            handleSearchResult={handleSearchResult}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TabCollections;
