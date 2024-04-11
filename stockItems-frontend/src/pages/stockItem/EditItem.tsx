import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import { axiosInstance } from "../../axiosRequest";
import Navbar from "../../components/Navbar";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// const validationSchema = Yup.object({
//   code: Yup.string()
//     .min(3, 'กรุณากรอกอักขระ 3 ตัวขึ้นไป')
//     .max(8, 'กรุณากรอกอักขระไม่เกิน 8 ตัวอักษร')
//     .required('กรุณากรอกโค้ดเนม'),
//   location: Yup.string()
//     .min(8, 'กรุณากรอกอักขระ 8 ตัวขึ้นไป')
//     .required('กรุณากรอกตำแหน่ง'),
// });

const EditItem = () => {
  const { id } = useParams();
 
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFireData();
  }, [id]);

  const fetchFireData = async () => {
    try {
      const response = await axiosInstance.get(`/tools/${id}`);
      const item = response.data[0];
      formik.setValues({
        name: item.name,
        note: item.note,
       
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",

      note: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await axiosInstance.put(`/tools/${id}`, values);
        alert("แก้ไขอุปกรณ์สำเร็จแล้ว");
        window.location.href = `/tools/`;
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    },
  });

  return (
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
         
         <AutoFixHighIcon/>
         
          <Typography component="h1" variant="h5">
            แก้ไขชื่อและจำนวนของอุปกรณ์
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  helperText={formik.errors.name}
                  onBlur={formik.handleBlur}
               
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="note"
                  label="note"
                  name="note"
                  onChange={formik.handleChange}
                  value={formik.values.note}
                  helperText={ formik.errors.note}
                  onBlur={formik.handleBlur}
              
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
              {isSubmitting ? "กำลังแก้ไข..." : "แก้ไข"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Navbar>
  );
};

export default EditItem;
