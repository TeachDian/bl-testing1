import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 

interface ImageProps {
  imageKey: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: React.ReactNode;
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
    className="flex justify-center">
      <div className={`${className}`}>
        <div className="flex justify-center">
          <Image
            src={imageKey}
            alt={`${alt}`}
            width={width}
            height={height}
            className="rounded-md object-cover h-[500px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AdsBillboard;
