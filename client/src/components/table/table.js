// base
import React from "react";

// external components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const TableComp = ({ fields, data, handleEdit, handleDelete }) => {
  const renderHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          {fields.map((field) => (
            <TableCell align="center">{field.label}</TableCell>
          ))}
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderBody = () => {
    return (
      <TableBody>
        {data.map((el, i) => (
          <TableRow>
            <TableCell>{i + 1}</TableCell>
            {fields.map((field) =>
              field.key === "user" ? (
                <TableCell align="center">{el["user"][field.value]}</TableCell>
              ) : field.key === "cards" ? (
                <TableCell align="center">{el[field.value].length}</TableCell>
              ) : (
                <TableCell align="center">{el[field.value]}</TableCell>
              )
            )}
            <TableCell align="center">
              <IconButton color="primary" onClick={() => handleEdit(el._id)}>
                <BiEditAlt />
              </IconButton>
              <IconButton color="primary" onClick={() => handleDelete(el._id)}>
                <BiTrashAlt />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Table size="small">
      {renderHeaders()}
      {renderBody()}
    </Table>
  );
};

export default TableComp;
