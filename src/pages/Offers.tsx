import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import getMyOffers from "../graphQl/offer/getMyOffers";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid2 as Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { Close, Description, Person } from "@mui/icons-material";
import getMe from "../graphQl/user/getMe";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

export default function Offers() {
  const { data: { me } = {}, loading: loadingUser } = useQuery(getMe);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 2;

  const { data: { myOffers: offersObject } = {}, loading } = useQuery(
    getMyOffers,
    { variables: { page, limit } }
  );
  if (loading || loadingUser) return <CircularProgress />;

  if (!me) navigate("/login");
  const { count, myOffers } = offersObject;

  const pageCount = Math.ceil(count / limit);

  return (
    <Container maxWidth="xl" className=" h-full">
      <Grid container spacing={4} direction={"column"} className="h-full">
        <Typography fontSize={40}>OFFERS</Typography>
        <Grid container spacing={4}>
          {myOffers.map((offer) => (
            <Grid size={{ lg: 6, md: 6, xs: 12 }} key={offer.id}>
              <OfferCard offer={offer} />
            </Grid>
          ))}
        </Grid>

        <Grid justifySelf={"stretch"} alignSelf={"center"} className="mt-auto">
          <Pagination
            className=" "
            color="secondary"
            count={pageCount}
            onChange={(e, value) => setPage(value)}
            defaultPage={page}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function OfferCard({ offer }) {
  return (
    <Card className="  p-4  ">
      <Grid container spacing={2} className=" h-full" alignItems={"center"}>
        <Grid size={{ xs: 6, lg: 3 }} className="  ">
          <img
            src={offer.product.photo}
            className=" object-cover object-center w-full mx-auto rounded-full !aspect-square "
          />
        </Grid>

        <Grid size={{ lg: 9, xs: 6 }}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            className="pr-10"
          >
            <Typography variant="h4" className=" ~sm/lg:!~text-xl/4xl">
              {" "}
              {offer.product.name}{" "}
            </Typography>
            <Typography className=" !ml-2 !text-xl" color="textSecondary">
              {" "}
              {offer.product.price} ${" "}
            </Typography>
          </Grid>

          {/* offer details */}
          <Card className="!bg-gray-50 mt-8 p-2">
            <Grid size={12} container alignItems={"center"} spacing={2}>
              <Grid
                container
                alignSelf={"stretch"}
                justifyContent={"space-between"}
                spacing={0.5}
                size={12}
              >
                <Typography
                  className=" !mb-0"
                  variant="h6"
                  color="textSecondary "
                >
                  <Person />
                  {offer.user.name}
                </Typography>
                <Typography
                  className=" !ml-2 ~sm/lg:!~text-3xl/5xl "
                  variant="h4"
                  noWrap
                  overflow={"visible"}
                >
                  {offer.price} $
                </Typography>
              </Grid>
              <Card
                className=" !bg-gray-100 grow border  border-gray-500 p-2"
                variant="outlined"
              >
                <Typography>
                  <Description />
                  {offer.message ||
                    "lorem adae3 orem adae3orem adae3 orem adae3orem adae3orem adae3"}
                </Typography>
              </Card>

              {/* button */}
              <Grid
                size={12}
                container
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                {/* accept */}
                <Grid>
                  <Button
                    className=" !bg-cyan-700 !text-white"
                    variant="contained"
                    size="large"
                  >
                    <CheckIcon />
                  </Button>
                </Grid>

                {/* reject */}
                <Grid>
                  <Button color="error" variant="contained" size="large">
                    <Close />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}
