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

// custom components
import { NoData } from "../../components";

// styles
import useStyles from "./styles";

const TableComp = ({
  fields,
  data,
  handleSearchResult,
  handleConfirm,
  handleEdit,
  item
}) => {
  const classes = useStyles();

  const renderHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          {fields.map((field, i) => (
            <TableCell key={i} align="center">
              {field.label}
            </TableCell>
          ))}
          <TableCell className={classes.actions} align="center">
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderBody = () => {
    return (
      <TableBody>
        {data
          .filter((card) => handleSearchResult(card))
          .map((el, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              {fields.map((field, j) => (
                <TableCell key={j} align="center">
                  {el[field.value]}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(el._id)}>
                  <BiEditAlt />
                </IconButton>
                <IconButton onClick={() => handleConfirm(el)}>
                  <BiTrashAlt />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <>
      <Table size="small">
        {renderHeaders()}
        {Boolean(data.length) && renderBody()}
      </Table>
      {!Boolean(data.length) && <NoData isTable item={item} />}
    </>
  );
};

export default TableComp;
