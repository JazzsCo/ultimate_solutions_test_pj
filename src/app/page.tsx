"use client";

import styles from "./page.module.css";

import { Button } from "@mui/material";
import DataTable from "@/components/data-table";
import { useFormModal } from "@/hook/use-form-modal";

export default function Home() {
  const { onOpen } = useFormModal();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Developed By JazzsCo.</p>
      </div>

      <div className={styles.heading}>
        <p className={styles.headingText}>Developer List</p>

        <Button variant="contained" sx={{ width: "10rem" }} onClick={onOpen}>
          Create
        </Button>
      </div>

      <DataTable />
    </main>
  );
}
