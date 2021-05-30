// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// custom components
import { Header } from "../../components";

// api
import { getCard, updateCard } from "../../services/card";

// styles
import useStyles from "./styles";

const CardDetails = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [data, setData] = useState({
    name: "",
    description: "",
    value: ""
  });

  const id = location.state.id;

  const getData = async (id) => {
    const card = await getCard(id);

    if (card) {
      setData({
        name: card.name,
        description: card.description,
        value: card.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateCard(id, data);

    if (res) {
      history.push("/cards");
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit collection" />
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="name"
              type="text"
              variant="outlined"
              size="small"
              required
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="value"
              type="number"
              variant="outlined"
              size="small"
              required
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
              value={data.value}
              onChange={(e) => setData({ ...data, value: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="description"
              variant="outlined"
              size="small"
              required
              fullWidth
              multiline
              rows={4}
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default CardDetails;
