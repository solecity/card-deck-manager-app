// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";

// custom components
import { Table } from "../../../../../../components";

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

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await getCollections();

    if (res) {
      setData(res);
    }
  };

  const handleEdit = () => {
    /// edit user
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

export default TabCollections;
