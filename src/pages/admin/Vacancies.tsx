import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  location: string | null;
  salary: string | null;
  type: string | null;
  published: boolean;
  createdAt: string;
}

const Vacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchVacancies();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchVacancies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/vacancies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vacancies');
      }

      const data = await response.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      toast.error('Vakansiyaları yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu vakansiyanı silmək istədiyinizə əminsiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/vacancies/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Vakansiya silindi');
        fetchVacancies();
      } else {
        toast.error('Vakansiya silinmədi');
      }
    } catch (error) {
      console.error('Error deleting vacancy:', error);
      toast.error('Xəta baş verdi');
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">Vakansiyalar</h1>
          </div>
          <Button onClick={() => navigate('/admin/vacancies/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Vakansiya
          </Button>
        </div>

        {vacancies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">Hələ vakansiya yoxdur</p>
              <Button
                className="mt-4"
                onClick={() => navigate('/admin/vacancies/new')}
              >
                <Plus className="h-4 w-4 mr-2" />
                İlk Vakansiyanı Yarat
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vacancies.map((vacancy) => (
              <Card key={vacancy.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{vacancy.title}</CardTitle>
                    <Badge variant={vacancy.published ? 'default' : 'secondary'}>
                      {vacancy.published ? 'Aktiv' : 'Qeyri-aktiv'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {vacancy.location && (
                      <p className="text-sm text-muted-foreground">
                        📍 {vacancy.location}
                      </p>
                    )}
                    {vacancy.salary && (
                      <p className="text-sm text-muted-foreground">
                        💰 {vacancy.salary}
                      </p>
                    )}
                    {vacancy.type && (
                      <p className="text-sm text-muted-foreground">
                        ⏰ {vacancy.type}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {vacancy.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/vacancies/${vacancy.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Redaktə
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(vacancy.id)}
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

export default Vacancies;

