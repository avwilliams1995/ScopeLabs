// Desc: Reusable button component for the application
import { AreaHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends AreaHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }) {
  return (
    <motion.button
      {...props}
      className="md:px-7 md:py-2 px-3 py-2 rounded-md relative radial-gradient"
      // animate the button to slide in from the left, ignore ts error, this works for ensuring the button text slides in from the left
      initial={{ "--x": "100%" }}
      animate={{ "--x": "-100%" }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 80,
      }}
    >
      {children}
    </motion.button>
  );
}

export default Button;
