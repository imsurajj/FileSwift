import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 40, 
  color = "#8B5CF6",
  text 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
      {text && (
        <p className="mt-2 text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
} 