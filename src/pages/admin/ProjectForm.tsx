import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Project {
  no: string;
  name: string;
  contractor: string;
  period: string;
  image: string;
  published: boolean;
}

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Project>({
    no: '',
    name: '',
    contractor: '',
    period: '',
    image: '',
    published: true,
  });

  useEffect(() => {
    checkAuth();
    if (id) {
      fetchProject();
    }
  }, [id]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      const data = await response.json();
      setFormData({
        no: data.no || '',
        name: data.name || '',
        contractor: data.contractor || '',
        period: data.period || '',
        image: data.image || '',
        published: data.published ?? true,
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Layihəni yükləmək mümkün olmadı');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Yalnız şəkil faylları yüklənə bilər');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Şəkil ölçüsü 5MB-dan böyük ola bilməz');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        toast.success('Şəkil uğurla yükləndi');
      } else {
        toast.error(data.error || 'Şəkil yüklənmədi');
      }
    } catch (error) {
      toast.error('Şəkil yüklənmədi');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = id
        ? `${API_URL}/api/admin/projects/${id}`
        : `${API_URL}/api/admin/projects`;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(id ? 'Layihə yeniləndi' : 'Layihə yaradıldı');
        navigate('/admin/projects');
      } else {
        toast.error('Xəta baş verdi');
      }
    } catch (error) {
      toast.error('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="container mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">
              {id ? 'Layihəni Redaktə Et' : 'Yeni Layihə'}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Layihə Məlumatları</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="no">№ *</Label>
                  <Input
                    id="no"
                    value={formData.no}
                    onChange={(e) => setFormData({ ...formData, no: e.target.value })}
                    placeholder="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Ad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Layihə adı"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractor">Podratçı *</Label>
                  <Input
                    id="contractor"
                    value={formData.contractor}
                    onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                    placeholder="Podratçı şirkəti"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Dövr *</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2021-2023"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Şəkil</Label>
                  <div className="space-y-2">
                    <Input
                      id="image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="cursor-pointer"
                    />
                    {uploading && <p className="text-sm text-muted-foreground">Yüklənir...</p>}
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image.startsWith('http') ? formData.image : (formData.image.startsWith('/uploads') ? `${API_URL}${formData.image}` : `${API_URL}/uploads/${formData.image}`)}
                        alt="Preview"
                        className="max-w-xs max-h-48 object-cover rounded border"
                        onError={(e) => {
                          console.error('Preview image load error:', formData.image);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Aktiv</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saxlanılır...' : 'Saxla'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/projects')}
                  >
                    Ləğv et
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectForm;

