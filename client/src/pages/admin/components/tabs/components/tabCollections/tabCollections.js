// base
import React, { useState, useEffect } from "react";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// custom components
import { Table } from "../../../../../../components";
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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    const res = await getCollections();

    if (res) {
      setData(res);
      setIsLoading(false);
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
      <Form getData={getData} />
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

export default TabCollections;
