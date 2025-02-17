"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  href,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden" variant="default">
        <CardContent className="p-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex justify-center text-primary"
          >
            {icon}
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-2 text-center text-xl font-bold"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            {description}
          </motion.p>
        </CardContent>
        {href && (
          <CardFooter className="flex justify-center p-6 pt-0">
            <Button
              title="Learn More"
              icon={<ArrowRightIcon className="ml-2 h-4 w-4" />}
              // href={href}
              variant="outline"
            />
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
