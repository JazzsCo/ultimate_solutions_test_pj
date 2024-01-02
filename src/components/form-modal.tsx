"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { TextField, Backdrop, Box, Modal, Fade, Button } from "@mui/material";

import { useFormModal } from "@/hook/use-form-modal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name has to be at least 2 characters" }),
  location: z
    .string()
    .min(3, { message: "Location has to be at least 3 characters" }),
  position: z
    .string()
    .min(3, { message: "Position has to be at least 3 characters" }),
});

export default function FormModal() {
  const { isOpen, onClose } = useFormModal();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      position: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("VALUES", values);
  };

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
              bgcolor: "#c0c9c9",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginBottom: "15pc",
                }}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      type="text"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      type="text"
                      variant="outlined"
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />

                <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Position"
                      type="text"
                      variant="outlined"
                      error={!!errors.position}
                      helperText={errors.position?.message}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
