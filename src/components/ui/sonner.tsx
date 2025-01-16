"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-900 group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-900 dark:group-[.toaster]:border-slate-700",
          description: "group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-500",
          actionButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-100 dark:group-[.toast]:bg-slate-100 dark:group-[.toast]:text-slate-100",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-100 dark:group-[.toast]:text-slate-100",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
