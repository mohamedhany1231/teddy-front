import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Grid2,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useFormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import loginMutation from "../graphQl/user/loginMutation";
import getMe from "../graphQl/user/getMe";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, { loading }] = useMutation(loginMutation, {
    refetchQueries: [getMe],
  });
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test1234");

  const { data, loading: loadingMe } = useQuery(getMe);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingMe && data?.me) {
      navigate("/");
    }
  }, [loadingMe, data, navigate, loading]);
  return (
    <div className=" h-full flex items-center justify-center  w-full ">
      <Paper
        className=" lg:max-w[60%] lg:min-w-[40rem] !max-w-[90%]  px-[3%] rounded-3xl !bg-orange-100"
        elevation={1}
        variant="elevation"
        square={false}
      >
        <Typography
          variant="h4"
          fontSize={{ md: "auto", xs: 18 }}
          className=" !text-center !w-full !my-12 !uppercase"
          noWrap
        >
          Login to your account
        </Typography>
        <form
          className="  p-4 pt-0 "
          onSubmit={(e) => {
            e.preventDefault();
            login({
              variables: {
                user: {
                  email,
                  password,
                },
              },
            });
          }}
        >
          <Grid2
            container
            spacing={3}
            size={12}
            direction={"column"}
            style={{ margin: "auto" }}
          >
            <TextField
              label="email"
              name="email"
              placeholder="test@test.com"
              type="email"
              value={email}
              onChange={(x) => setEmail(x.target.value)}
              className="!text-xl"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "14px", sm: "inherit" }, // Input text size
                  padding: { xs: "8px 12px", sm: "16.5px 14px" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.75rem", sm: "1rem" }, // Label text size
                },
              }}
            />
            <TextField
              label="password"
              name="password"
              placeholder=""
              type="password"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "14px", sm: "inherit" }, // Input text size
                  padding: { xs: "8px 12px", sm: "16.5px 14px" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.75rem", sm: "1rem" }, // Label text size
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              className=" self-end !text-white !font-bold !bg-orange-300 hover:!bg-orange-400 "
              disabled={loading}
            >
              {!loading ? "login" : <CircularProgress size={25} />}
            </Button>
          </Grid2>
        </form>
      </Paper>
    </div>
  );
}
