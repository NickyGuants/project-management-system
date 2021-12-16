import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./users.css";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers } from "../../../redux/actions/userActions";

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();

  const AllUsers = useSelector((state) => state.users);
  const { users } = AllUsers;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="users">
      <div className="users-header">
        <h1>Users</h1>
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr className="user-table-header">
              <td>
                <h3>User Id</h3>
              </td>
              <td>
                <h3>Name</h3>
              </td>
              <td>
                <h3>Project</h3>
              </td>
              <td>
                <h3>Email</h3>
              </td>
              <td>
                <h3>Delete</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <tr key={user.id} className="user-row">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>Project</td>
                  <td>{user.email}</td>
                  <td>
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Users;
