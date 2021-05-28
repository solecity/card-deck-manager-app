// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

    console.log(res);
    if (res) {
      history.push("/cards");
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Grid container justify="center">
      <form onSubmit={handleSubmit}>
        <Grid container item>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              size="small"
              type="text"
              label="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              size="small"
              type="number"
              label="value"
              InputProps={{ inputProps: { min: 0 } }}
              value={data.value}
              onChange={(e) => setData({ ...data, value: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            required
            variant="outlined"
            size="small"
            type="text"
            label="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Grid>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </Grid>
  );
};

export default CardDetails;
