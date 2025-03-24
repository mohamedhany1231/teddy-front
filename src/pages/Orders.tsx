import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid2 as Grid,
  Pagination,
  Typography,
} from "@mui/material";
import getMe from "../graphQl/user/getMe";
import { useNavigate } from "react-router-dom";
import getMyOrders from "../graphQl/order/getMyOrders";

export default function Orders() {
  const { data: { me } = {}, loading: loadingUser } = useQuery(getMe);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: { myOrders: OrdersObject } = {}, loading } = useQuery(
    getMyOrders,
    { variables: { page, limit } }
  );
  if (loading || loadingUser) return <CircularProgress />;
  console.log(OrdersObject);

  if (!me) navigate("/login");
  const { count, myOrders }: { count: number; myOrders: order[] } =
    OrdersObject;

  const pageCount = Math.ceil(count / limit);

  return (
    <Container maxWidth="xl" className=" h-full">
      <Grid
        container
        spacing={4}
        className={" !min-h-full"}
        direction={"column"}
      >
        <Typography
          fontSize={40}
          fontWeight={800}
          variant="h2"
          color="text.header"
          sx={{ textTransform: "capitalize" }}
        >
          Orders
        </Typography>
        <Grid
          container
          spacing={{ xs: 0.5, md: 2 }}
          className=" max-w-[1000px] !mx-auto"
        >
          {myOrders.map((order) => (
            <Grid size={{ xs: 12 }} key={order.id}>
              <OrderCard order={order} />
            </Grid>
          ))}
        </Grid>

        <Grid justifySelf={"stretch"} alignSelf={"center"} className="mt-auto">
          <Pagination
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

function OrderCard({ order }: { order: order }) {
  return (
    <Card className="p-4 !bg-orange-100">
      <Grid container spacing={2} className=" h-full">
        <Grid className="" size={2} alignContent={"center"}>
          <img
            src={order?.product?.photo}
            className=" object-cover object-center w-full rounded-full  my-auto !aspect-square "
          />
        </Grid>

        <Grid size={10}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            className=" !w-full !h-full "
            flexWrap={"nowrap"}
            spacing={1}
          >
            <Grid
              container
              // alignItems={{ xs: "center" }}
              justifyContent={{ xs: "space-evenly", sm: "start" }}
              size={{ xs: "auto", sm: 8 }}
              className="sm:!h-full !max-w-[80%]"
              spacing={1}
              flexWrap={"wrap"}
              direction={{ xs: "column" }}
            >
              <Typography
                variant="h4"
                className="  capitalize  sm:!max-w-max  !w-auto "
                fontWeight={800}
                fontSize={{ xs: "16px", sm: "20px", md: "24px" }}
              >
                {" "}
                {order?.product?.name}
                key
              </Typography>
              <Typography
                variant="body2"
                className=" !text-gray-500 sm:!line-clamp-2  !hidden "
                fontSize={{ xs: "10px", sm: "12px", md: "16px" }}
              >
                {order?.product?.description}
              </Typography>

              <Typography
                className="  sm:!w-fit !mr-auto !ml-2  "
                fontSize={{ xs: "14px", sm: "24px", md: "30px" }}
                color="info"
                noWrap
                textOverflow={"unset"}
                fontWeight={800}
              >
                {Number(order?.product?.price).toFixed(2)} ${" "}
              </Typography>
            </Grid>

            <Grid
              container
              size={{ sm: 4, xs: 2 }}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Typography
                fontSize={"24px"}
                variant="h5"
                textOverflow={"unset"}
                noWrap
              >
                ✅ <span className=" hidden sm:inline ">Confirmed</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
