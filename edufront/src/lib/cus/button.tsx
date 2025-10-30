'use client';

import { cn } from '@/lib/utils';
import { sStore } from '@/stores';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { isObject } from 'lodash';
import * as React from 'react';

export type IColorNames =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark'
  | string;

export type IButton = {
  CancelDisable?: boolean;
  results?: any;
  full?: boolean;
  hidden?: boolean;
  isPlump?: boolean;
  reasonable?: boolean;
  shadown?: boolean;
  hug?: boolean;
  className?: string;
  isBorder?: boolean;
  setBorder?: {
    width?: number;
    style?: string;
    color?: string;
    radius?: string;
  };
  color?: IColorNames;
  background?: IColorNames;
  borderColor?: IColorNames;
  iconLeft?: any;
  iconRight?: any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  shape?: 'circle' | 'square' | '';
  btnType?:
    | 'ok'
    | 'back'
    | 'ghost'
    | 'btnType'
    | 'outline_cancel'
    | 'delete'
    | 'outline'
    | 'extra'
    | 'full_normal'
    | 'clarity'
    | 'outline_secondary'
    | 'outline_warning'
    | 'black_white'
    | 'custom'
    | 'confirm'
    | 'cover'
    | 'outline_upload'
    | 'choose'
    | 'cancel'
    | 'none_background'
    | 'outline_active'
    | 'outline_back'
    | 'outline_disable'
    | 'icon'
    | 'normal_no_outline'
    | 'secondary_border_line'
    | 'boder_main'
    | 'hug'
    | 'outline_secondary_gradient'
    | 'outline_active_gradient'
    | '';
  hover?: boolean;
  hoverBg?: any;
  loading?:
    | boolean
    | {
        status: boolean;
        render?: (status: boolean) => any;
      };
};

const buttonVariants = cva(
  // base styles thay thế .Button
  'touch-manipulation flex flex-row items-center justify-center gap-2 rounded-md text-[0.75rem] text-[#3d4c63] bg-white transition-all duration-200 ease-in-out w-fit h-fit min-h-[24px] cursor-pointer outline-none focus:shadow-[rgba(0,0,0,0.3)_2px_8px_4px_-6px] disabled:cursor-auto disabled:font-bold disabled:shadow-none disabled:opacity-50 disabled:bg-[var(--bg-disable_button)] disabled:text-[var(--whites)]',
  {
    variants: {
      variant: {
        Gray: 'bg-[#E6E6E6] px-2 py-1 [&_.value]:text-white hover:opacity-90 [&_.value]:text-black',
        Blue: 'bg-[#3D6CB9] px-2 py-1 [&_.value]:text-white hover:opacity-90 ',
        ok: 'bg-gradient-to-b from-[#3D6CB9] to-[#1B3053] px-2 py-1 [&_.value]:text-white hover:opacity-90',
        back: 'bg-[#dee1e6]',
        confirm: 'bg-[#36b37e] [&_.value]:text-white',
        choose: 'bg-[var(--primary-brand)] [&_.value]:text-white',
        cancel: 'bg-[#dee1e6] [&_.value]:text-[var(--text-primary)]',
        clarity:
          'bg-transparent border-0 shadow-none text-[var(--normal)] [&_.value]:w-full [&_.value]:text-center [&_.value]:justify-center',
        ghost: 'bg-transparent border-0 shadow-none text-[var(--text-primary)] ',
        outline:
          'border border-[var(--primary-brand)] text-[var(--whites)] bg-[var(--gadient-green-enable)] px-1.5 py-0.5  shadow-none',
        outline_secondary:
          'border border-[var(--btn_submain)] bg-[var(--secondary-normal)] text-[var(--whites)]',
        boder_main:
          'border border-[var(--primary-brand)] text-[var(--primary-brand)] bg-[var(--whites)] px-1.5 py-0.5 max-h-6 shadow-none',
        outline_upload:
          'border border-[var(--primary-brand)] text-[var(--primary-brand)] shadow-none px-1.5 py-0.5 max-h-6 [&_.value]:text-[13px] [&_.value]:font-medium',
        outline_cancel:
          'border border-[var(--btn_error)] bg-[var(--btn_error)] text-[var(--whites)] shadow-none px-1.5 py-0.5 max-h-6',
        outline_back:
          'border border-[var(--text-stroke)] text-[var(--text-primary)] shadow-none px-1.5 py-0.5 max-h-6',
        outline_warning:
          'border border-[var(--btn_warning)] bg-[var(--btn_warning)] text-[var(--whites)] shadow-none px-1.5 py-0.5 max-h-6',
        delete:
          'border border-[var(--danger-main)] bg-[var(--danger-main)] text-[var(--whites)] hover:shadow-md',
        full_normal: 'border border-[var(--text-stroke)] justify-between',
        black_white:
          'border border-[var(--text-stroke)] bg-transparent text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--text-constrast)]',
        outline_active_gradient:
          'bg-[var(--gradient-green-enable)] text-[var(--whites)] px-1.5 py-0.5 max-h-6',
        outline_secondary_gradient:
          'bg-[var(--gradient-blue-enable)] text-[var(--whites)] px-1.5 py-0.5 max-h-6',
        outline_active:
          'border border-[var(--secondary-normal)] bg-[var(--secondary-normal)] text-[var(--whites)] px-1.5 py-0.5 max-h-6 shadow-none',
        outline_disable:
          'border border-[var(--bg-disable_button)] bg-[var(--bg-disable_button)] text-[var(--bg-disable)] px-1.5 py-0.5 max-h-6 shadow-none',
        cover: 'h-full min-h-12',
        none_background: 'bg-[var(--primary-light)] shadow-none [&_.value]:font-normal',
        icon: 'p-0 shadow-none h-full m-auto',
        normal_no_outline:
          'max-h-6 cursor-pointer z-10 relative hover:shadow-none hover:transform-none',
        secondary_border_line:
          'border border-[var(--secondary-normal)] max-h-6 cursor-pointer z-10 relative hover:shadow-none hover:transform-none',
        hug: 'p-1 max-w-fit min-w-0 min-h-0 max-h-fit shadow-none',
        custom: '',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
        xl: 'h-12 px-5 text-lg',
        icon: 'size-9',
      },
      full: { true: 'w-full', false: '' },
      reasonable: { true: 'min-w-max px-2 py-1 text-[12px]', false: '' },
      shadown: { true: 'shadow-md', false: '' },
      isPlump: { true: 'min-w-[100px] px-4 min-h-[24px] max-h-[24px]', false: '' },
      shape: { circle: 'rounded-full', square: 'rounded-md' },
      cancelDisable: {
        true: 'disabled:bg-transparent disabled:text-[var(--whites)]',
        false: '',
      },
      hover: {
        true: 'hover:shadow-[rgba(0,0,0,0.3)_2px_8px_8px_-5px] hover:-translate-y-0.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'ok',
      size: 'md',
      full: false,
      shadown: true,
      reasonable: false,
      isPlump: false,
      shape: 'square',
      cancelDisable: false,
      hover: true,
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  IButton & {
    asChild?: boolean;
    value?: string;
    label?: string;
  };

export function Button({
  className,
  variant,
  size,
  full,
  hug,
  reasonable,
  shadown,
  isPlump,
  shape,
  CancelDisable,
  hover,
  asChild = false,
  iconLeft,
  iconRight,
  value,
  children,
  loading,
  color,
  background,
  borderColor,
  label,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const formFocusID = sStore((state) => state.Joint.formFocusID);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props?.onClick?.(e);
  };

  return (
    <Comp
      type="button"
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' && formFocusID) handleClick(e as any);
      }}
      className={cn(
        buttonVariants({
          variant,
          size,
          full,
          reasonable,
          shadown,
          isPlump,
          shape,
          cancelDisable: CancelDisable,
          hover,
        }),
        color,
        background,
        className
      )}
      title={props.title}
      {...props}
    >
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {(value || children || label) && (
        <span className="value flex items-center gap-2 font-semibold leading-none transition-all w-max">
          {value || children || label}
        </span>
      )}
      {iconRight && <span className="ml-1">{iconRight}</span>}
      {isObject(loading)
        ? loading.render?.(loading.status)
        : loading && (
            <svg
              className="ml-2 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
    </Comp>
  );
}
