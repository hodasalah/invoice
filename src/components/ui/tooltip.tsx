// components/ui/tooltip.tsx
'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

// Re-export Provider and Trigger unchanged
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
	extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
	arrow?: boolean;
}

export const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	TooltipContentProps
>(
	(
		{ className, side = 'right', align = 'center', arrow = true, ...props },
		ref,
	) => (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				ref={ref}
				side={side}
				align={align}
				sideOffset={5}
				className={cn(
					'pointer-events-none z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
					className,
				)}
				{...props}
			>
				{arrow && (
					<TooltipPrimitive.Arrow className='fill-current text-popover-border' />
				)}
				{props.children}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
