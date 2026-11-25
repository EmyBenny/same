import React, { useEffect, useId, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Info, Lock, X } from 'lucide-react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { cn, getInitials } from '../../lib/utils';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  type = 'button',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D7A68]';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-[#0F1E36] text-white hover:bg-[#182C4B]',
    accent: 'bg-[#0D7A68] text-white hover:bg-[#0A6153]',
    secondary: 'bg-[#F3F2EE] text-[#0F1E36] hover:bg-[#E8E6DF]',
    outline: 'bg-white text-[#0F1E36] border border-[#D8D6CF] hover:bg-[#FAF9F6]',
    ghost: 'bg-transparent text-[#374151] hover:bg-[#F3F2EE] hover:text-[#0F1E36]',
    destructive: 'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-9 px-3.5 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-6 text-sm',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.14, ease: EASE_OUT_EXPO }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </motion.button>
  );
};

/* -------------------------------------------------------------------------- */
/* Form Controls (Input, Textarea, Select)                                    */
/* -------------------------------------------------------------------------- */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  id,
  className,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#0F1E36]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full h-10 px-3.5 rounded-lg bg-white text-sm text-[#111827] placeholder:text-[#9CA3AF] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A68]/25',
          error ? 'border-[#DC2626] focus-visible:border-[#DC2626]' : 'border-[#D8D6CF] focus-visible:border-[#0D7A68]',
          className
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <p className="text-xs text-[#DC2626] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#5B6472]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  id,
  className,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-[#0F1E36]">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-lg bg-white text-sm text-[#111827] placeholder:text-[#9CA3AF] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A68]/25',
          error ? 'border-[#DC2626]' : 'border-[#D8D6CF] focus-visible:border-[#0D7A68]',
          className
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <p className="text-xs text-[#DC2626] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#5B6472]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  id,
  className,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-[#0F1E36]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full h-10 px-3 rounded-lg bg-white text-sm text-[#111827] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A68]/25',
          error ? 'border-[#DC2626]' : 'border-[#D8D6CF] focus-visible:border-[#0D7A68]',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Surface Card                                                               */
/* -------------------------------------------------------------------------- */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  padding = 'md',
  className,
  children,
  ...props
}) => {
  const paddings: Record<NonNullable<CardProps['padding']>, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return (
    <div
      className={cn(
        'bg-white border border-[#E5E4DF] rounded-xl',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Semantic Status Indicator (Accessible Text + Icon, Zero Pill Sandwich)     */
/* -------------------------------------------------------------------------- */

export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral' | 'private';

export const StatusLabel: React.FC<{
  tone: StatusTone;
  label: string;
  className?: string;
}> = ({ tone, label, className }) => {
  const styles: Record<StatusTone, { color: string; Icon: React.ComponentType<{ className?: string }> }> = {
    success: { color: 'text-[#0A6153]', Icon: CheckCircle2 },
    warning: { color: 'text-[#B45309]', Icon: Clock },
    danger: { color: 'text-[#DC2626]', Icon: AlertCircle },
    neutral: { color: 'text-[#5B6472]', Icon: Info },
    private: { color: 'text-[#0F1E36]', Icon: Lock },
  };
  const { color, Icon } = styles[tone];
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap', color, className)}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Segmented Tabs with Shared Layout Animation                                */
/* -------------------------------------------------------------------------- */

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

export const SegmentedTabs: React.FC<{
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}> = ({ tabs, activeTab, onChange, className }) => {
  const groupId = useId();
  return (
    <div
      role="tablist"
      className={cn('inline-flex items-center gap-1 p-1 bg-[#F3F2EE] border border-[#E5E4DF] rounded-lg', className)}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D7A68]',
              active ? 'text-[#0F1E36]' : 'text-[#5B6472] hover:text-[#0F1E36]'
            )}
          >
            {active && (
              <motion.span
                layoutId={`tab-pill-${groupId}`}
                transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                className="absolute inset-0 bg-white rounded-md shadow-xs border border-[#E5E4DF]/60"
              />
            )}
            <span className="relative z-10 inline-flex items-center">
              {tab.label}
              {typeof tab.count === 'number' && (
                <span className="ml-1.5 font-mono text-[11px] tabular-nums opacity-75">
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Modal Dialog with Cinematic Entrance & Exit                                */
/* -------------------------------------------------------------------------- */

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}> = ({ open, onClose, title, description, children, maxWidthClass = 'max-w-lg' }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091324]/45 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
            className={cn(
              'w-full bg-white border border-[#E5E4DF] rounded-xl shadow-lg overflow-hidden',
              maxWidthClass
            )}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#E5E4DF]">
              <div>
                <h2 id="modal-title" className="text-lg font-semibold text-[#0F1E36]">
                  {title}
                </h2>
                {description && <p className="mt-1 text-sm text-[#5B6472]">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-[#5B6472] hover:text-[#0F1E36] hover:bg-[#F3F2EE] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                    */
/* -------------------------------------------------------------------------- */

export const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
}> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 w-max max-w-xs text-xs text-white bg-[#0F1E36] rounded-md shadow-md z-40 pointer-events-none"
        >
          {content}
        </span>
      )}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Resilient Avatar                                                           */
/* -------------------------------------------------------------------------- */

export const Avatar: React.FC<{
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ src, name, size = 'md', className }) => {
  const [imgError, setImgError] = useState(false);
  const sizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  if (!src || imgError) {
    return (
      <div
        aria-label={name}
        className={cn(
          'rounded-full bg-[#0F1E36] text-white font-display font-semibold flex items-center justify-center shrink-0 select-none',
          sizes[size],
          className
        )}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={cn('rounded-full object-cover bg-[#F3F2EE] shrink-0', sizes[size], className)}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* Empty, Loading, Error States                                               */
/* -------------------------------------------------------------------------- */

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon, title, description, actionLabel, onAction }) => (
  <div className="border border-dashed border-[#D8D6CF] bg-[#FAF9F6] rounded-xl p-8 text-center">
    {icon && (
      <div className="mx-auto mb-3 w-10 h-10 rounded-lg bg-white border border-[#E5E4DF] flex items-center justify-center text-[#5B6472]">
        {icon}
      </div>
    )}
    <h3 className="text-base font-semibold text-[#0F1E36]">{title}</h3>
    <p className="mt-1.5 text-sm text-[#5B6472] max-w-md mx-auto">{description}</p>
    {actionLabel && onAction && (
      <div className="mt-5">
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    )}
  </div>
);

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => (
  <div className="space-y-3" aria-busy="true" aria-label="Loading content">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="h-12 w-full rounded-lg bg-[#F3F2EE] animate-pulse border border-[#E5E4DF]/50"
      />
    ))}
  </div>
);

export const ErrorBanner: React.FC<{
  title: string;
  message: string;
  onRetry?: () => void;
}> = ({ title, message, onRetry }) => (
  <div
    role="alert"
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]"
  >
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs mt-0.5 text-[#B91C1C]">{message}</p>
      </div>
    </div>
    {onRetry && (
      <Button variant="outline" size="sm" onClick={onRetry} className="border-[#FCA5A5] text-[#991B1B]">
        Retry
      </Button>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Animated Progress Bar                                                      */
/* -------------------------------------------------------------------------- */

export const ProgressBar: React.FC<{ value: number; className?: string }> = ({
  value,
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full h-2 bg-[#F3F2EE] rounded-full overflow-hidden', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        className="h-full bg-[#0D7A68] rounded-full"
      />
    </div>
  );
};
