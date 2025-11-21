'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

type BottomSheetProps = {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  animationMs?: number;
  overlayClassName?: string;
  overlayVisibleClassName?: string;
  overlayHiddenClassName?: string;
  panelClassName?: string;
};

export default function BottomSheet({
  open,
  children,
  onClose,
  closeOnOverlayClick = false,
  animationMs = 500,
  overlayClassName,
  overlayVisibleClassName = 'opacity-70',
  overlayHiddenClassName = 'opacity-0',
  panelClassName,
}: BottomSheetProps) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // allow next frame to apply enter transition
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), animationMs);
      return () => clearTimeout(timer);
    }
  }, [open, animationMs]);

  if (!isMounted) return null;

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-all duration-500 ease-out',
          overlayClassName ?? 'bg-black/70',
          isVisible ? overlayVisibleClassName : overlayHiddenClassName
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      >
        <div
          className={clsx(
            'flex flex-col items-center justify-center bg-base-300 rounded-t-4xl px-4 py-10',
            panelClassName
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}


