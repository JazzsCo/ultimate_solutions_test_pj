import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Developed By JazzsCo.</p>
      </div>

      <div className={styles.heading}>
        <p className={styles.headingText}>Developer List</p>
        <Button variant="contained" sx={{ width: "10rem" }}>
          Create
        </Button>
      </div>
    </main>
  );
}
