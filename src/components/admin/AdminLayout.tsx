import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Çıxış edildi');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4" style={{ maxWidth: '1200px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Çıxış
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;

