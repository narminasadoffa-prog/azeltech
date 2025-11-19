import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Equipment {
  id: string;
  category: string;
  name: string;
  description: string | null;
  image: string | null;
  count: string | null;
  published: boolean;
}

const Equipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchEquipment();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/equipment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEquipment(data);
    } catch (error) {
      toast.error('Texnika parkını yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu texnikanı silmək istədiyinizə əminsiniz?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/equipment/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Texnika silindi');
        fetchEquipment();
      } else {
        toast.error('Silinmə uğursuz oldu');
      }
    } catch (error) {
      toast.error('Xəta baş verdi');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">Yüklənir...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="container mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">Texnika Parkı</h1>
          </div>
          <Button onClick={() => navigate('/admin/equipment/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Texnika
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bütün Texnikalar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kateqoriya</TableHead>
                  <TableHead>Ad</TableHead>
                  <TableHead>Sayı</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Heç bir texnika yoxdur
                    </TableCell>
                  </TableRow>
                ) : (
                  equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count || '-'}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {item.published ? 'Aktiv' : 'Qeyri-aktiv'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/equipment/${item.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Equipment;

