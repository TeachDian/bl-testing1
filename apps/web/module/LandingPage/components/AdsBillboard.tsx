import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 

interface ImageProps {
  imageKey: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const AdsBillboard = ({
  imageKey,
  alt,
  width,
  height,
  className,
}: ImageProps) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-center ml-14"
    >
      <div className={`flex justify-center ${className}`}>
        <Image
          src={imageKey}
          alt={`${alt}`}
          width={width}
          height={height}
          className="rounded-md object-cover"
          style={{ height: height ? `${height}px` : "auto" }}
        />
      </div>
    </motion.div>
  );
};

export default AdsBillboard;
