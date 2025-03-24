import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { cyan, grey, orange } from "@mui/material/colors";

const link = createUploadLink({
  // uri: "http://localhost:3000/graphql",
  uri: "https://teddy-back.vercel.app/graphql",
  credentials: "include",
  // headers: { "Apollo-Require-Preflight": "true" },
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    header?: string; // Add your custom property
  }
}
const myTheme = createTheme({
  palette: {
    primary: {
      main: orange[500], // Keep primary color unchanged
    },
    secondary: {
      main: cyan[800], // Darker cyan for better contrast
    },
    background: {
      default: grey[100], // Light grey for the default background
      paper: grey[50], // Very light grey for cards/paper
    },
    text: {
      primary: grey[900], // Dark grey for primary text
      secondary: grey[700], // Medium grey for secondary text
      disabled: grey[500], // Light grey for disabled text
      header: "#FFF8E1",
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Default MUI font
  },
});

// createTheme({
//   palette: {
//     primary: {
//       main: orange[500],
//     },
//     secondary: {
//       main: cyan[600],
//     },
//     background: {
//       paper: cyan[50],
//     },
//   },
// });
createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={myTheme}>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </ApolloProvider>
);
