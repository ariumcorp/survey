import { alpha, useColorScheme } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router";
//import { gray } from "theme/themePrimitives";
import { PagePath } from "utils/enums";

interface AnimatedPageProps {
  children: React.ReactNode;
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const { mode } = useColorScheme();
  const controls = useAnimationControls();
  const location = useLocation();
  const isFromLogin = location.pathname === PagePath.Login;

  useEffect(() => {
    controls.start({
      // backgroundColor:
      //   mode === "dark" ? alpha(gray[800], 0.6) : alpha(gray[50], 0.1),
      transition: { duration: 0.3 },
      opacity: 1,
      y: 0,
    });
  }, [mode, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%", height: isFromLogin ? "100vh" : "" }}
    >
      {children}
    </motion.div>
  );
};
