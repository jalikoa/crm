import UISidebar from '@/components/ui-sidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="d-flex">
      <UISidebar />
      <main className="flex-grow-1">
        {children}
      </main>
    </div>
  )
}
