import {
  Box,
  TextField,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../axiosRequest";
import Navbar from "../../components/Navbar";
import CreateIcon from '@mui/icons-material/Create';

interface IToolsForm {
  name: string;
  count: number;
  note: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
  .required('กรุณากรอกชื่อ'),
  count: Yup.string()
  .required('กรุณากรอกจำนวน'),
  note: Yup.string()
 

});

const AddItem = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      count: 0,
      note: "",
    } as IToolsForm,
    validationSchema: validationSchema,
    onSubmit: async (values: IToolsForm) => {
      setIsLoading(true);
      try {
          setIsSubmitting(true);
        await axiosInstance.post("/tools/createTools/", {
          name: values.name,
          count: values.count,
          note: values.note,
        });
        alert(" เพิ่มอุปกรณ์สำเร็จแล้ว!");

        window.location.href = `/dashboard/`;
      } catch (e) {
        console.error(e);
      }
      setIsSubmitting(true);
      setIsLoading(false);
    },
  });

  return (
    <>
      <Navbar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CreateIcon/>
            <Typography component="h1" variant="h5">
              เพิ่มอุปกรณ์
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    required
                    fullWidth
                    id="count"
                    label="Count"
                    name="count"
                    value={formik.values.count}
                    onChange={formik.handleChange}
                    error={formik.touched.count && Boolean(formik.errors.count)}
                    helperText={formik.touched.count && formik.errors.count}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    required
                    fullWidth
                    id="note"
                    label="note"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isLoading ? "กำลังเพิ่ม..." : "เพิ่มอุปกรณ์"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Navbar>
    </>
  );
};

export default AddItem;
