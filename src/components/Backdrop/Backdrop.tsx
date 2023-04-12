import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import './Backdrop.css';

interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return (
    <motion.div
      className="backdrop"
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
