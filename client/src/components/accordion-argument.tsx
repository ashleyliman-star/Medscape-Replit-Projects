import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionArgumentProps {
  title: string;
  points: string[];
  color: 'blue' | 'green' | 'purple';
}

export default function AccordionArgument({ title, points, color }: AccordionArgumentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dotColor = color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-700' : 'text-green-600';

  return (
    <div className="argument-item">
      <Card 
        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800">{title}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className={`h-4 w-4 ${dotColor}`} />
          </motion.div>
        </div>
      </Card>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <Card className="bg-white rounded-b-lg px-4 pb-4 mt-1 border-t-0">
              <ul className="space-y-2 text-sm text-gray-700">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full ${dotColor.replace('text-', 'bg-')} mt-2 mr-3 flex-shrink-0`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
