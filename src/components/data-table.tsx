"use client";

//Global packages
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Mui components
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import FormModal from "@/components/form-modal";
import DeleteModal from "@/components/delete-modal";

import { useFormModal } from "@/hook/use-form-modal";

interface Data {
  id: number;
  name: string;
  location: string;
  position: string;
}

export default function DataTable() {
  const router = useRouter();
  const { onOpen } = useFormModal();

  const [currenetId, setCurrentId] = useState<number>();
  const [formId, setFormId] = useState<number>();
  const [data, setData] = useState<Data[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getData = async () => {
    // http://localhost:3001/data is json-server url for test
    const res = await axios.get("http://localhost:3001/data");

    setData(res.data);
  };

  const deleteData = async () => {
    // http://localhost:3001/data is json-server url for test
    const res = await axios.delete(
      `http://localhost:3001/data?id=${currenetId}`
    );

    router.refresh();
  };

  const filterData = data.filter((item) => item.id === formId)[0];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={deleteData}
      />

      <FormModal
        name={filterData?.name}
        location={filterData?.location}
        position={filterData?.position}
      />

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650, mt: "10px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.location}</TableCell>
                <TableCell align="center">{item.position}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setFormId(item.id);
                      onOpen();
                    }}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setCurrentId(item.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
