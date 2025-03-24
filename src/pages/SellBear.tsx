import { useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  Input,
  Grid2 as Grid,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";

import addProduct from "../graphQl/products/addProduct";
import { useNavigate } from "react-router-dom";
import { Description, Photo } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export default function SellBear() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const [addProd, { called }] = useMutation(addProduct, {
    onCompleted(data, clientOptions) {
      console.log(data);
      if (data.addProduct.id) navigate(`/product/${data.addProduct.id}`);
    },
  });

  const onSubmit = (data) => {
    console.log("submited");
    console.log(data);
    console.log(data.photo[0]);
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("price", Number(data?.price));
    // formData.append("description", data.description);
    // formData.append("photo", data.photo[0]);

    // console.log(formData);
    addProd({
      variables: {
        product: {
          name: data.name,
          price: Number(data.price),
          description: data.description,
          photo: data.photo[0],
        },
      },
    });
  };

  return (
    <div>
      <h2 className=" ~sm/xl:~text-2xl/4xl font-bold capitalize mb-8 text-center">
        sell your teddy Bear
      </h2>

      <Card
        className=" py-8 px-4 max-w-[700px]
      "
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  label="name"
                  {...register("name", {
                    minLength: 2,
                    maxLength: 12,
                  })}
                  variant="outlined"
                  placeholder="Enter bear name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="price"
                  {...register("price")}
                  variant="outlined"
                  placeholder="Enter bear price"
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="description"
                  {...register("description")}
                  variant="outlined"
                  placeholder="Tell us about your bear"
                  fullWidth
                  required
                  type="text"
                  multiline
                  rows={5}
                />
              </Grid>
              <Grid size={12}>
                <InputLabel htmlFor="photo">photo</InputLabel>
                <TextField
                  id="photo"
                  {...register("photo")}
                  variant="outlined"
                  placeholder="Tell us about your bear"
                  fullWidth
                  type="file"
                />
              </Grid>
              <Grid size={2} justifySelf={"self-end"}>
                <Button variant="contained" type="submit">
                  {" "}
                  submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
