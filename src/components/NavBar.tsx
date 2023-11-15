import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./NavBar.css";

type Props = {
  login: boolean;
  themeColor: any;
  mouseTrack: boolean;
};
function NavBar({ login, themeColor, mouseTrack }: Props) {
  function appBarLabel(label: string) {
    const navigate = useNavigate();

    const HandleLogin = () => {
      if (login) {
        localStorage.setItem("login", "false");
        navigate("/login");
      } else {
        localStorage.setItem("login", "true");
        navigate("/");
      }
      window.location.reload();
    };

    const handleTheme = () => {
      // console.log("color", themeColor);
      const newTheme = themeColor === "dark" ? "light" : "dark";
      // console.log("newTheme", newTheme);
      localStorage.setItem("themeColor", newTheme);
      window.dispatchEvent(new Event("NewDataEvent"));
    };

    // console.log("mouseTrack->", mouseTrack);

    return (
      <Toolbar >
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
        {/* {mouseTrack ? (
          <IconButton sx={{ color: "red" }}>
            <FontAwesomeIcon icon={faCircle} />
          </IconButton>
        ) : (
          ""
        )} */}
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
        <Box>
          {mouseTrack ? (
            <IconButton onClick={handleTheme}>
              {themeColor === "dark" ? (
                <Brightness7Icon sx={{ color: "red" }} />
              ) : (
                <Brightness4Icon sx={{ color: "red" }} />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleTheme}>
              {themeColor === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          )}
        </Box>
        <div>
          {login ? (
            <IconButton
              onClick={HandleLogin}
              color="error"
              sx={{
                borderRadius: "10%",
                width: "50px",
              }}>
              <FontAwesomeIcon icon={faPowerOff} size="xl" />
            </IconButton>
          ) : (
            <IconButton
              onClick={HandleLogin}
              color="success"
              sx={{
                borderRadius: "10%",
                width: "50px",
              }}>
              <FontAwesomeIcon icon={faPowerOff} size="xl" />
            </IconButton>
          )}
        </div>
      </Toolbar>
    );
  }
  return (
    <div>
      <AppBar position="fixed" color="primary" >
        {appBarLabel("Evaluation Module")}
      </AppBar>
    </div>
  );
}

export default NavBar;
