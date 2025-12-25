import AnimatedContainer from 'src/common/components/common/AnimatedContainer';
import AppSidebar from 'src/common/components/common/AppSidebar';
import './globals.css';
import { SidebarProvider } from 'common/services/components/ui/sidebar';
import LoadingOverlay from 'src/common/components/common/LoadingOverlay';
export const metadata = {
  title: 'EduMatch Dashboard',
  description: 'Dashboard layout',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="min-h-screen w-full bg-customgreys-primarybg flex ml-17">
            <AppSidebar />
            <AnimatedContainer>
              <LoadingOverlay />
              <main className="ml-16">{children}</main>
            </AnimatedContainer>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
