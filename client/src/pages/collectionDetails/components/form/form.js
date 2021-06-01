// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// custom components
import { SelectInput } from "../../../../components";

// api
import { getUsers } from "../../../../services/user";
import { updateCollection } from "../../../../services/collection";

// styles
import useStyles from "./styles";

const Form = ({ id, data, setData }) => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const fromAdmin = location.state.from === "/admin";

  const validateForm = () => {
    let messages = { ...errors };

    if (data.name === "") {
      messages = { ...messages, name: "Name is required." };
    } else if (data.name.length > 30) {
      messages = {
        ...messages,
        name: "Name cannot have more than 30 characters"
      };
    } else {
      messages = { ...messages, name: "" };
    }

    if (data.user === 0) {
      messages = { ...messages, user: "User is required" };
    } else {
      messages = { ...messages, user: "" };
    }

    setErrors(messages);
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    const res = await updateCollection(id, data);

    if (res) {
      fromAdmin ? history.push("/admin") : history.push("/collections");
    }
  };

  useEffect(() => {
    const getUsersSelect = async () => {
      const res = await getUsers();

      if (res) {
        setUsers(res);
      }
    };

    getUsersSelect();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="name"
            type="text"
            variant="outlined"
            size="small"
            required
            fullWidth
            value={data.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        {fromAdmin && (
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.user)}>
              <Select
                fullWidth
                variant="outlined"
                input={<SelectInput />}
                value={data.user || ""}
                onChange={handleChange("user")}
              >
                <MenuItem value={0} disabled>
                  user
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.user}</FormHelperText>
            </FormControl>
          </Grid>
        )}
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
  );
};

export default Form;
