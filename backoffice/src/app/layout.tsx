import { SidebarProvider } from '@commonServices/components/ui/sidebar';
import AnimatedContainer from 'src/common/components/common/AnimatedContainer';
import AppSidebar from 'src/common/components/common/AppSidebar';
import './globals.css';
export const metadata = {
  title: 'EduMatch Dashboard',
  description: 'Dashboard layout',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="min-h-screen w-full bg-customgreys-primarybg flex ml-5">
            <AppSidebar />
            <AnimatedContainer>
              <main className="ml-16">{children}</main>
            </AnimatedContainer>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
