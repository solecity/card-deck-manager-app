// base
import React, { useState, useEffect } from "react";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header } from "../../components";
import { Form } from "./components";

// api
import { getUser } from "../../services/user";

// hooks
import { useAuth } from "../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Account = () => {
  const classes = useStyles();

  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    name: "",
    password: ""
  });

  useEffect(() => {
    const getData = async (id) => {
      setIsLoading(true);

      if (userId) {
        const user = await getUser(id);

        if (user) {
          setData({
            username: user.username,
            name: user.name,
            password: user.password
          });
          setIsLoading(false);
        }
      }
    };

    getData(userId);
  }, [userId]);

  return (
    <Container>
      <Header title="Account" />
      {isLoading ? (
        <Grid container justify="center" className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <Form id={userId} data={data} setData={setData} />
      )}
    </Container>
  );
};

export default Account;
