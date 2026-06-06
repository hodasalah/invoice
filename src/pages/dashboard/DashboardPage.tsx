import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileSidebar } from '@/components/dashboard/sidebar/MobileSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Footer from '@/components/dashboard/footer';

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useAppSelector(
    state => state.user.currentUser
  );

  const {
    loading,
    stats,
    invoiceStatus
  } = useDashboardData(
    currentUser?.uid
  );
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <div className='flex h-screen '>
      <TooltipProvider>
        <Sidebar collapsed={collapsed} />

        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className='flex-1 flex flex-col overflow-auto bg-gray-50 dark:bg-gray-950 transition-colors duration-300'>
          <Header
            collapsed={collapsed}
            toggleCollapse={() => setCollapsed((prev) => !prev)}
            onMobileMenuClick={() => setMobileOpen(true)}
          />
          <main className='p-4 flex-1'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </div>
  );
}
