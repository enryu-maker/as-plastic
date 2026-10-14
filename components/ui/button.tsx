import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'whatsapp' | 'heroOutline' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  brand: 'btn-brand',
  whatsapp: 'btn-whatsapp',
  heroOutline: 'btn-hero-outline',
  default: 'btn-default',
  destructive: 'btn-destructive',
  outline: 'btn-outline',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'btn-size-default',
  sm: 'btn-size-sm',
  lg: 'btn-size-lg',
  icon: 'btn-size-icon',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const combinedClasses = cn(
      'ui-button',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(combinedClasses, (children.props as any).className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
