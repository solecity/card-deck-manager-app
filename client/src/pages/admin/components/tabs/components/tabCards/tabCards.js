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
import { getCards, deleteCard } from "../../../../../../services/card";

// styles
import useStyles from "./styles";

const fields = [
  { key: "user", label: "User", value: "username" },
  { key: "name", label: "Name", value: "name" },
  { key: "cards", label: "Description", value: "description" },
  { key: "value", label: "Value", value: "value" }
];

const TabCards = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setIsLoading(true);

    const res = await getCards();

    if (res) {
      setData(res);
      setIsLoading(false);
    }
  };

  const handleForm = () => {
    setOpenForm(!openForm);
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
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center" className={classes.root}>
      <Toolbar handleForm={handleForm} />
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
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TabCards;
