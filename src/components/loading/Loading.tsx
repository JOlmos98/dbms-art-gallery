"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <Loader2 className="animate-spin text-sidebar-accent w-10 h-10" />
      <p className="text-lg mt-2 text-sidebar-foreground">Cargando...</p>
    </motion.div>
  );
};
