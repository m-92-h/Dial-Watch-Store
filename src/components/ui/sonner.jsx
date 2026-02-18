import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-600 dark:text-emerald-400" />,
        info: <InfoIcon className="size-5 text-sky-600 dark:text-sky-400" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-600 dark:text-amber-400" />,
        error: <OctagonXIcon className="size-5 text-rose-600 dark:text-rose-400" />,
        loading: <Loader2Icon className="size-5 text-muted-foreground animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:font-sans",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-bold group-[.toast]:rounded-lg",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg",
          success: "group-[.toaster]:!bg-emerald-50/90 dark:group-[.toaster]:!bg-emerald-950/30 group-[.toaster]:!text-emerald-900 dark:group-[.toaster]:!text-emerald-100 group-[.toaster]:!border-emerald-200 dark:group-[.toaster]:!border-emerald-800/50",
          error: "group-[.toaster]:!bg-rose-50/90 dark:group-[.toaster]:!bg-rose-950/30 group-[.toaster]:!text-rose-900 dark:group-[.toaster]:!text-rose-100 group-[.toaster]:!border-rose-200 dark:group-[.toaster]:!border-rose-800/50",
          info: "group-[.toaster]:!bg-sky-50/90 dark:group-[.toaster]:!bg-sky-950/30 group-[.toaster]:!text-sky-900 dark:group-[.toaster]:!text-sky-100 group-[.toaster]:!border-sky-200 dark:group-[.toaster]:!border-sky-800/50",
          warning: "group-[.toaster]:!bg-amber-50/90 dark:group-[.toaster]:!bg-amber-950/30 group-[.toaster]:!text-amber-900 dark:group-[.toaster]:!text-amber-100 group-[.toaster]:!border-amber-200 dark:group-[.toaster]:!border-amber-800/50",
        },
      }}
      style={
        {
          "--normal-bg": "transparent",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1rem",
        }
      }
      {...props} />
  );
}

export { Toaster }
