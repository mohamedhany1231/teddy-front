import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getProduct from "../graphQl/products/getProduct";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ProductCard } from "../ui/ProductCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import addOffer from "../graphQl/offer/addOffer";
import PaypalButton from "../ui/PaypalButton";
import getMe from "../graphQl/user/getMe";

export default function Product() {
  const { data: { me } = {}, loading: loadingUser } = useQuery(getMe);

  const { id } = useParams();
  const { data: { product } = {}, loading } = useQuery(getProduct, {
    variables: { productId: id },
  });

  const [sendOffer, { loading: creating }] = useMutation(addOffer);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const offer = {
      message: data.message,
      price: Number(data.price),
      product_id: id,
    };
    sendOffer({ variables: { offer } });
  };

  const [offerModalOpen, setOfferModalOPen] = useState(false);
  const handleOpen = () => setOfferModalOPen(true);
  const handleClose = () => setOfferModalOPen(false);

  if (loading || loadingUser) return <CircularProgress />;

  if (!product)
    return (
      <Typography variant="h2" color="error">
        Invalid url
      </Typography>
    );
  return (
    <Grid container className=" px-[5%] py-[2%]   w-full" spacing={4}>
      <Grid container size={{ md: 8 }}>
        <Grid size={{ lg: 4, sm: 12 }} className="grow  overflow-hidden">
          <img
            src={product?.photo || `https://random.imagecdn.app/500/150?`}
            className=" hover:scale-110  transition-transform  w-full min-h-[300px] object-cover   "
          />
        </Grid>
        <Grid size={{ lg: 8, md: 12, sm: 12 }}>
          <Typography
            variant="h2"
            className=" !capitalize !font-bold "
            color="textHeader"
          >
            {product?.name}
          </Typography>
          <div className=" pl-4">
            <Typography
              variant="body1"
              color="textSecondary"
              className="hover:text-orange-400 hover:underline cursor-pointer transition-colors !mb-8 "
            >
              sold by :{" "}
              <span className=" font-bold capitalize">
                {product?.seller?.name}
              </span>
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {product?.description ||
                "        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, alias. Ad nulla fugit inventore rerum illum provident atque suscipit facere. Sunt accusamus quidem iusto doloremque esse possimus doloribus unde consectetur!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae eaque ipsa sequi deserunt officiis nam quos cum iste a doloribus suscipit odio maiores animi unde architecto velit, libero similique. Asperiores?"}
            </Typography>
          </div>
        </Grid>
        <Grid size={12}>
          <div className=" mt-8">
            <FAQ />
          </div>
        </Grid>
      </Grid>
      <Grid size={{ md: 4 }}>
        <Paper
          className=" min-h-[60%] py-8 px-4 flex flex-col gap-6 !bg-orange-100"
          square={false}
        >
          <Typography
            variant="h2"
            color="textPrimary"
            className=" ~sm/lg:!~text-4xl/7xl"
          >
            Buy now for
            <span className=" block font-bold uppercase">
              {Number(product.price)?.toPrecision(3)}
              <span className=" ml-2 text-lg">$</span>
            </span>
          </Typography>
          <Grid
            container
            justifyContent={"flex-end"}
            wrap="nowrap"
            className=""
            alignItems={"stretch"}
          >
            {me?.id === product?.seller?.id ? (
              <Typography color="textDisabled" className=" pl-2">
                {" "}
                go to offers pages to view offers on your products{" "}
              </Typography>
            ) : (
              <>
                <Grid>
                  {/* <Button
                    variant="contained"
                    size="large"
                    className=" self-end  w-fit mr-10 "
                    onClick={handleOpen}
                  >
                    Make Offer
                  </Button> */}
                </Grid>
                <Grid>
                  <PaypalButton price={`${product.price}`} />
                </Grid>
              </>
            )}
            {/* <Button
                variant="contained"
                size="large"
                className=" self-end  w-fit mr-10 "
                color="secondary"
                onClick={handleOpen}
              >
                BUY /
              </Button> */}
          </Grid>

          <Modal open={offerModalOpen} onClose={handleClose}>
            <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white  min-h-[30vh] min-w-[40%] p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-4"
              >
                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                >
                  <Grid size={10}>
                    <TextField
                      className=" w-full"
                      label="price"
                      {...register("price")}
                      variant="outlined"
                      type="number"
                      required
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                >
                  <Grid size={10}>
                    <TextField
                      className=" w-full"
                      label="message"
                      {...register("message")}
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  className="!text-white"
                  disabled={creating}
                >
                  Send Offer
                </Button>
              </form>
            </Box>
          </Modal>

          <div className=" flex flex-col gap-2">
            <Typography
              variant="h4"
              color="textPrimary"
              className="~sm/lg:!~text-2xl/5xl bold"
            >
              Shipping
            </Typography>
            <Typography variant="body1" className=" ~sm/lg:!~text-base/xl">
              <span className=" font-bold block">Domestic Shipping</span>
              Orders are typically processed within 7 business days. Shipping
              costs will be calculated at checkout based on your location and
              shipping method.
            </Typography>
            <Typography variant="body1" className=" ~sm/lg:!~text-base/xl">
              <span className=" font-bold block">International Shipping</span>
              We offer international shipping to most countries. Shipping rates
              and delivery times may vary. Please note that any customs duties
              or taxes imposed by your country are your responsibility.
            </Typography>
          </div>
        </Paper>
      </Grid>

      <Grid size={12}>
        <Typography
          variant="h4"
          color="textSecondary"
          className=" !mb-4 !capitalize"
        >
          You might also like
          {/* <span className=" font-bold capitalize">{product?.seller?.name}</span> */}
        </Typography>
        <Grid container spacing={2}>
          {product?.seller?.products?.map((prod, i: number) => (
            <Grid size={{ lg: 3, sm: 6 }}>
              <ProductCard product={prod} index={i} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

function FAQ() {
  return (
    <div>
      <Typography
        variant="h4"
        color="textSecondary"
        className="~sm/lg:!~text-2xl/5xl !mb-4 !capitalize"
      >
        Frequently asked questions
      </Typography>
      <Accordion className=" !bg-orange-100">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What is the estimated delivery time for this product?{" "}
        </AccordionSummary>
        <AccordionDetails>
          Delivery times vary depending on your location and shipping method.
          You can find an estimated delivery time at checkout.
        </AccordionDetails>
      </Accordion>
      <Accordion className=" !bg-orange-100">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Can I return this product if I'm not satisfied with it?
        </AccordionSummary>
        <AccordionDetails>
          Yes, you can return most products within 14 days of the order's
          delivery date. Please refer to our return policy for more details.
        </AccordionDetails>
      </Accordion>
      <Accordion className=" !bg-orange-100">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Does this product come with a warranty?
        </AccordionSummary>
        <AccordionDetails>
          Yes, this product is covered by a 1-year warranty against defects in
          materials or workmanship. Please see our warranty policy for more
          information.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
