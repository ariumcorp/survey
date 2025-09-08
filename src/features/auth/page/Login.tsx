import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AnimatedPage } from "components";
import { useDispatch, useSelector } from "redux-store/store";
import { signIn } from "redux-store/thunk";
import { authSelector } from "redux-store/selectors";
import { useNavigate } from "react-router";
import { PagePath } from "utils/enums";

// Función para validar el formato del email con una expresión regular
const validateEmail = (email: string): boolean => {
  return true;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // return emailRegex.test(email);
};

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { hasLoggedIn } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0) {
      const isValid = validateEmail(email);
      setIsEmailValid(isValid);
      setEmailError(isValid ? "" : "Por favor, introduce un email válido.");
    } else {
      setIsEmailValid(false);
      setEmailError("");
    }
  }, [email]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailValid) {
      setEmailError("Por favor, introduce un email válido antes de continuar.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;
    console.log({ email, password });

    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    if (hasLoggedIn) navigate(PagePath.Root);
  }, [hasLoggedIn, navigate]);

  return (
    <AnimatedPage>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                // Atributos para mostrar el error
                error={!!emailError && email.length > 0}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // El botón se deshabilita si el email no es válido o está vacío
                disabled={!isEmailValid}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Ingresar
              </Button>
              {/* <Link href="#" variant="body2" sx={{ textAlign: "center" }}>
                ¿Olvidaste tu contraseña?
              </Link> */}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </AnimatedPage>
  );
};
