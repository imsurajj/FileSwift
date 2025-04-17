import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  labelPosition?: 'left' | 'right';
}

export default function ToggleSwitch({
  enabled,
  onChange,
  label,
  size = 'md',
  labelPosition = 'right'
}: ToggleSwitchProps) {
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'w-3 h-3',
      translate: 'translate-x-4',
      text: 'text-xs'
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'w-5 h-5',
      translate: 'translate-x-5',
      text: 'text-sm'
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'w-6 h-6',
      translate: 'translate-x-7',
      text: 'text-base'
    }
  };

  const { switch: switchClass, dot: dotClass, translate, text: textClass } = sizeClasses[size];

  return (
    <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>
      {label && (
        <span className={`font-medium text-gray-600 ${textClass} ${labelPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
          {label}
        </span>
      )}
      <button 
        type="button"
        onClick={onChange}
        className={`${switchClass} ${enabled ? 'bg-purple-600' : 'bg-gray-300'} rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none`}
        aria-pressed={enabled}
      >
        <motion.span 
          className={`${dotClass} bg-white rounded-full shadow-sm`}
          initial={false}
          animate={{ x: enabled ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ x: enabled ? undefined : 0 }}
        />
        <span className="sr-only">{enabled ? 'Enable' : 'Disable'}</span>
      </button>
    </div>
  );
} 