import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Footer() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  function appBarLabel(label: string) {
    return (
      <Toolbar sx={{ backgroundColor: "#2c3440" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="tq-logo">
            {label}
          </Link>
        </Typography>
      </Toolbar>
    );
  }
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="secondary">
          {appBarLabel("Evaluation Module Footer")}
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Footer;
