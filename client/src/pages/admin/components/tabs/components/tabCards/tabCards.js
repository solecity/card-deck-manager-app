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
import { getCards, deleteCard } from "../../../../../../services/card";

// styles
import useStyles from "./styles";

const fields = [
  { key: "user", label: "User", value: "user" },
  { key: "name", label: "Name", value: "name" },
  { key: "cards", label: "Description", value: "description" },
  { key: "value", label: "Value", value: "value" }
];

const TabCards = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [card, setCard] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    const res = await getCards();

    if (res) {
      const data = res.map((r) => ({
        ...r,
        user: r.user.username
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
    setOpenConfirm(!openConfirm);
    setCard(el);
  };

  const handleEdit = (id) => {
    history.push({
      pathname: "./cardDetails",
      state: { id, from: location.pathname }
    });
  };

  const handleDelete = async (id) => {
    const res = await deleteCard(id);

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
      <Modal open={openForm} handleClose={handleForm} title="Add card">
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
        open={openConfirm}
        handleClose={handleConfirm}
        handleDelete={() => handleDelete(card._id)}
        item="card"
        name={card.name}
      />
    </Grid>
  );
};

export default TabCards;
