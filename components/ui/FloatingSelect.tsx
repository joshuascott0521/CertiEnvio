import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface FloatingSelectProps {
  label: string
  value: string
  onChange: (value: string) => void | Promise<void>;
  options: { value: string; label: string }[]
  disabled?: boolean
  className?: string
  placeholder?: string
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  className = "",
  placeholder = "",
}) => {
  return (
    <div className="relative w-full">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={`peer pt-5 border border-gray-300 rounded-lg ${className}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side="bottom" position="popper" avoidCollisions={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <label
        className={`pointer-events-none absolute left-3 top-1 text-xs text-muted-foreground transition-all
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-blue-500
          ${value ? "top-1 text-sm text-blue-500" : ""}
        `}
      >
        {label}
      </label>
    </div>
  )
}
