// base
import React, { useState } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { BiSearch, BiPlusCircle } from "react-icons/bi";

// styles
import useStyles from "./styles.js";

const Toolbar = ({ handleForm }) => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container className={classes.root}>
      <Grid container justify="flex-end" alignItems="center">
        <Grid item xs={4}>
          <TextField
            classes={{ root: classes.input }}
            value={search}
            type="text"
            size="small"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
            placeholder="Search by name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BiSearch />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <IconButton className={classes.button} onClick={handleForm}>
            <BiPlusCircle />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Toolbar;
