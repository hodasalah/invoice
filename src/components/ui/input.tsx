import * as React from "react"

import { cn } from "@/lib/utils"
// i edit classes in this component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          className
        )}
        ref={ref}
        {...props}
      />
      
    )
  }
)
Input.displayName = "Input"

export { Input }
