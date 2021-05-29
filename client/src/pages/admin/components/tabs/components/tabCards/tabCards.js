// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";

// custom components
import { Table } from "../../../../../../components";
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

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await getCards();

    if (res) {
      setData(res);
    }
  };

  const handleEdit = () => {
    /// edit user
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
      <Form getData={getData} />
      <Grid item xs={10} className={classes.table}>
        <Table
          fields={fields}
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default TabCards;
