"use client";

import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
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

interface FormModalProps {
  name: string;
  location: string;
  position: string;
}

export default function FormModal({
  name,
  location,
  position,
}: FormModalProps) {
  const router = useRouter();
  const { isOpen, onClose } = useFormModal();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ? name : "",
      location: location ? location : "",
      position: position ? position : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // http://localhost:3001/data is json-server url for test
    const res = await axios.post("http://localhost:3001/data", {
      name: values.name,
      location: values.location,
      position: values.position,
    });

    reset();
    onClose();
    router.refresh();
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
              height: 400,
              bgcolor: "white",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>{name}</h1>
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
                  defaultValue={name ? name : ""}
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
                  defaultValue={location ? location : ""}
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
                  defaultValue={position ? position : ""}
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
