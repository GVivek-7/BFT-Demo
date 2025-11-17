import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
}

function Input({ className, type, label, placeholder, ...props }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value)
    }
  }, [props.value, props.defaultValue])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    props.onChange?.(e)
  }

  const showPlaceholder = !hasValue

  return (
    <div className="relative w-full flex flex-col space-y-2">
      {label && (
        <label
          className={cn(
            "mont md:text-[20px] md:leading-[18px] bg-none text-[18px] leading-[24px] font-medium uppercase"
          )}
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        data-slot="input"
        className={cn(
            "file:text-foreground selection:bg-primary selection:text-primary-foreground border-input h-12 w-full min-w-0 rounded-[6px] border-[#6E6E6E] border-[0.5px]  bg-transparent px-4 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "placeholder:text-[#3C3C3C]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        placeholder={showPlaceholder ? placeholder : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export { Input }
