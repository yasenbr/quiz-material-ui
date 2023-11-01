import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Login.css";
import { Divider } from "@mui/material";


 export default function SignInModule() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  

  return (
      <Container component="main" maxWidth="sm">
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
  );
}

