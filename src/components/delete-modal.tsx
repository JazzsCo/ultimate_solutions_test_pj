"use client";

import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "white",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Deleting this user will permanently remove their account and all
              associated data. This action cannot be undone.
            </Typography>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "120px" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ width: "120px" }}
                onClick={onDelete}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
