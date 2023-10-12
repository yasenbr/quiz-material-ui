import React, { useState, useMemo, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./Login.css";
import { Divider, IconButton } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

// TODO remove, this demo shouldn't need to reset the theme.

const darkMode = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2c3440",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#12727d",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c4f57",
          borderRadius: "50px",
        },
      },
      defaultProps: {
        InputLabelProps: {
          style: {
            color: "#fff", // Set the label color here
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});

function SignInModule() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginLeft: "950px",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}>
          {theme.palette.mode === "light" ? "light" : "dark"} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h1 className="tq-logo-title">Evaluation Module</h1>
          <p className="tq-sub-title">by TINQIN</p>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ mt: "10px", mb: "25px", color: "#fff" }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, borderRadius: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "50px" }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default function SignIn() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    if (mode === "dark") {
      return darkMode;
    } else {
      return createTheme({
        palette: {
          mode,
        },
      });
    }
  }, [mode, darkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SignInModule />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
