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

  const history = useHistory();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setIsLoading(true);

    const res = await getUsers();

    if (res) {
      setData(res);
      setIsLoading(false);
    }
  };

  const handleForm = () => {
    setOpenForm(!openForm);
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
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center" className={classes.root}>
      <Toolbar handleForm={handleForm} />
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
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TabUsers;
