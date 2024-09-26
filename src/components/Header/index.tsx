"use client";
import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaUtensils } from "react-icons/fa";

const Header = () => {
  React.useEffect(() => {
    // GSAP animation example
    gsap.fromTo(
      ".header-icon",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "bounce" }
    );
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={styles.header}
    >
      <FaUtensils className="header-icon" style={styles.icon} />
      <motion.h1
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={styles.title}
      >
        Recipe Finder
      </motion.h1>
    </motion.header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8b400",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: "2rem",
    color: "#fff",
    marginRight: "10px",
  },
  title: {
    fontSize: "2rem",
    color: "#fff",
    margin: 0,
  },
};

export default Header;
