// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";

// custom components
import { Table } from "../../../../../../components";
import { Form } from "./components";

// api
import { getUsers, deleteUser } from "../../../../../../services/user";

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

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await getUsers();

    if (res) {
      setData(res);
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

export default TabUsers;
