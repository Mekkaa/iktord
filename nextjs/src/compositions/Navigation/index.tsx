"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";

const data = [
  { id: 1, background: "cadetblue" },
  { id: 2, background: "rebeccapurple" },
  { id: 3, background: "pink" },
];

const frameVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

type Props = { show: boolean };

const MainNavigation: FC<Props> = ({ show }) => {
  return (
    <motion.div
      initial="closed"
      animate={show ? "open" : "closed"}
      variants={frameVariants}
    >
      {data.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          Lorem ipsum
        </motion.div>
      ))}
    </motion.div>
  );
};

export default { Main: MainNavigation };
