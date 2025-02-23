"use client";
import db from "../db/db";
import { useQuery } from "@tanstack/react-query";
import { InPlacePageRenderer } from "../InPlacePageRenderer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const LoadingScreen = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-white">
    {/* Decorative shapes */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Top right circle */}
      <motion.div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-background/10 to-purple-50"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom left square */}
      <motion.div
        className="absolute -left-16 -bottom-16 w-64 h-64 bg-gradient-to-tr from-background/5 to-orange-50"
        animate={{
          rotate: [0, -90, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center-left triangle */}
      <motion.div
        className="absolute left-20 top-1/2 w-48 h-48 bg-gradient-to-tr from-background/5 to-blue-50"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{
          rotate: [0, 120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flying airplane */}
      <motion.div
        className="absolute"
        initial={{ x: -100, y: 200 }}
        animate={{
          x: ["-100%", "200%"],
          y: [200, 100],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Icon 
          icon="material-symbols:flight" 
          className="w-12 h-12 text-background/40"
        />
      </motion.div>

      {/* Top-center circle */}
      <motion.div
        className="absolute top-20 left-1/2 w-32 h-32 rounded-full bg-gradient-to-b from-background/10 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-right pentagon */}
      <motion.div
        className="absolute right-20 bottom-20 w-40 h-40 bg-gradient-to-tl from-background/10 to-pink-50"
        style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
        animate={{
          rotate: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>

    {/* Loading content */}
    <motion.div
      className="relative z-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Modern loading animation */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-r from-background to-background/80 opacity-20" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 0.9, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-r from-background to-background/80 opacity-40" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-r from-background to-background/90" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm font-medium text-gray-600 tracking-wider">
          Loading
        </p>
        <motion.div 
          className="flex gap-1 justify-center mt-1"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="w-1 h-1 rounded-full bg-background/40" />
          <span className="w-1 h-1 rounded-full bg-background/40" />
          <span className="w-1 h-1 rounded-full bg-background/40" />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
);

const ErrorScreen = ({ error }: { error: Error }) => (
  <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <Icon 
        icon="solar:shield-warning-broken" 
        className="w-16 h-16 text-red-500 mx-auto"
      />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        We encountered an error while loading the page. Please try again later.
      </p>
      <div className="text-sm text-red-500/80 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
        {error.message}
      </div>
    </motion.div>
  </div>
);

export default function PageRenderer({ name, dataSources = {} }) {
  const [config, setConfig] = useState([]);
  
  const { data: rawData, error } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      return await db.from("pages").select("json").eq("name", name).single();
    },

  });

  useEffect(() => {
    if (rawData?.data?.json) {
      console.log("Received data:", rawData.data.json);
      try {
        const parsedConfig =
          typeof rawData.data.json === "string"
            ? JSON.parse(rawData.data.json)
            : rawData.data.json;

        const configArray = Array.isArray(parsedConfig)
          ? parsedConfig
          : [parsedConfig];
        console.log("Parsed config:", configArray);
        setConfig(configArray);
      } catch (e) {
        console.error("Error parsing config:", e);
      }
    }
  }, [rawData]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!rawData) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full">
      <InPlacePageRenderer nodes={config} dataSources={dataSources} />
    </div>
  );
}





// Add these interfaces at the top of the file
