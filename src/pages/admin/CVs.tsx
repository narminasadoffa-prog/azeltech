import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Download, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface CV {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string | null;
  cvFile: string;
  message: string | null;
  read: boolean;
  createdAt: string;
}

const CVs = () => {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchCVs();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/cvs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CVs');
      }

      const data = await response.json();
      setCVs(data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      toast.error('CV-ləri yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/cvs/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('CV oxunmuş kimi işarələndi');
        fetchCVs();
      }
    } catch (error) {
      console.error('Error marking CV as read:', error);
      toast.error('Xəta baş verdi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu CV-ni silmək istədiyinizə əminsiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/cvs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('CV silindi');
        fetchCVs();
      } else {
        toast.error('CV silinmədi');
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      toast.error('Xəta baş verdi');
    }
  };

  const handleDownload = (cv: CV) => {
    const cvUrl = cv.cvFile.startsWith('http')
      ? cv.cvFile
      : cv.cvFile.startsWith('/cvs')
      ? `${API_URL}${cv.cvFile}`
      : `${API_URL}/cvs/${cv.cvFile}`;
    
    window.open(cvUrl, '_blank');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = cvs.filter((cv) => !cv.read).length;

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">CV-lər</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} yeni</Badge>
            )}
          </div>
        </div>

        {cvs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">Hələ CV yoxdur</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {cvs.map((cv) => (
              <Card key={cv.id} className={!cv.read ? 'border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{cv.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{cv.email}</p>
                    </div>
                    <Badge variant={cv.read ? 'secondary' : 'default'}>
                      {cv.read ? 'Oxunub' : 'Yeni'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {cv.phone && (
                      <p className="text-sm text-muted-foreground">📞 {cv.phone}</p>
                    )}
                    {cv.position && (
                      <p className="text-sm text-muted-foreground">💼 {cv.position}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      📅 {formatDate(cv.createdAt)}
                    </p>
                    {cv.message && (
                      <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                        {cv.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(cv)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      CV-ni Yüklə
                    </Button>
                    {!cv.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(cv.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Oxunmuş kimi işarələ
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cv.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Sil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CVs;

