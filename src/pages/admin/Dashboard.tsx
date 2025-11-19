import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FolderKanban, Settings, Users } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    projects: 0,
    services: 0,
    equipment: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const [postsRes, projectsRes, servicesRes, equipmentRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/api/blog-posts`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/services`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/equipment`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/contact-messages`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const posts = await postsRes.json();
      const projects = await projectsRes.json();
      const services = await servicesRes.json();
      const equipment = await equipmentRes.json();
      const messages = await messagesRes.json();

      setStats({
        blogPosts: posts.length,
        projects: projects.length,
        services: services.length,
        equipment: equipment.length,
        messages: messages.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Statistikaları yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-lg">Yüklənir...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: '1200px' }}>
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogPosts}</div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => navigate('/admin/blog-posts')}
              >
                İdarə et →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Layihələr</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => navigate('/admin/projects')}
              >
                İdarə et →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xidmətlər</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.services}</div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => navigate('/admin/services')}
              >
                İdarə et →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Texnika Parkı</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.equipment}</div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => navigate('/admin/equipment')}
              >
                İdarə et →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mesajlar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messages}</div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => navigate('/admin/messages')}
              >
                Bax →
              </Button>
            </CardContent>
          </Card>
        </div>


        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Tez Əməliyyatlar</CardTitle>
            <CardDescription>Admin panel funksiyaları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" onClick={() => navigate('/admin/blog-posts/new')}>
                Yeni Blog Yazısı
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/projects/new')}>
                Yeni Layihə
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/services/new')}>
                Yeni Xidmət
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/services')}>
                Xidmətləri İdarə Et
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/equipment/new')}>
                Yeni Texnika
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/messages')}>
                Mesajları Bax
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/images')}>
                Şəkil Qalereyası
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/vacancies')}>
                Vakansiyalar
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/cvs')}>
                CV-lər
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

