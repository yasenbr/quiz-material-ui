import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
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
      <Toolbar sx={{backgroundColor:"#2c3440"}}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            className="tq-logo">
            {label}
          </Link>
        </Typography>
        <Link
          to="/code"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "12px",
          }}>
          CodeEditor
        </Link>
        <Link
          to="/sandbox"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "42px",
          }}>
          SandBox
        </Link>
      </Toolbar>
    );
  }
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="secondary">
          {appBarLabel("Evaluation Module")}
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default NavBar;
