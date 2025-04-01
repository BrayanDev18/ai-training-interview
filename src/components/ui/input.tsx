'use client'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import * as React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  type?: string
  id?: string
  placeholder?: string
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, FormFieldProps<T>>(
  (props, ref) => {
    const { name, control, id, type = 'text', className, ...restProps } = props
    const radius = 100
    const [visible, setVisible] = React.useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY
    }: {
      currentTarget: HTMLElement
      clientX: number
      clientY: number
    }) {
      const { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? `${radius}px` : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              rgba(120,119,200,0.6),
              transparent 80%
            )
          `
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='group/input rounded-full p-[2px] transition duration-300'
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={id}
              ref={ref}
              className={cn(
                `shadow-input dark:placeholder-text-neutral-600 flex h-11 w-full rounded-full border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#20222C] dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
                className
              )}
              type={type}
              {...field}
              {...restProps}
            />
          )}
        />
      </motion.div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
