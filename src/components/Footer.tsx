import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Footer() {
  function appBarLabel(label: string) {
    return (
      <Toolbar>
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
        <AppBar position="static" color="primary" >
          {appBarLabel("Evaluation Module Footer")}
        </AppBar>
    </div>
  );
}

export default Footer;
