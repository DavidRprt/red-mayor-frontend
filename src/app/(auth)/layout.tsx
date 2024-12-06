export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-24  bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  )
}
