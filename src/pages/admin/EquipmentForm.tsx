import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Equipment {
  category: string;
  name: string;
  description: string | null;
  image: string | null;
  count: string | null;
  published: boolean;
}

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<Equipment>({
    category: '',
    name: '',
    description: null,
    image: null,
    count: null,
    published: true,
  });

  useEffect(() => {
    checkAuth();
    fetchCategories();
    if (id) {
      fetchEquipment();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/equipment/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      const data = await response.json();
      setFormData({
        category: data.category || '',
        name: data.name || '',
        description: data.description || null,
        image: data.image || null,
        count: data.count || null,
        published: data.published ?? true,
      });
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('Texnikanı yükləmək mümkün olmadı');
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
      if (!token) {
        toast.error('Giriş edilməyib');
        navigate('/admin/login');
        return;
      }

      // Clean form data - remove empty strings and ensure proper values
      const cleanedData = {
        category: formData.category.trim() || '',
        name: formData.name.trim() || '',
        description: formData.description?.trim() || null,
        image: formData.image?.trim() || null,
        count: formData.count?.trim() || null,
        published: formData.published ?? true,
      };

      // Validate required fields
      if (!cleanedData.category || !cleanedData.name) {
        toast.error('Kateqoriya və ad mütləqdir');
        setLoading(false);
        return;
      }

      const url = id
        ? `${API_URL}/api/admin/equipment/${id}`
        : `${API_URL}/api/admin/equipment`;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        data = { error: 'Invalid response from server' };
      }

      if (response.ok) {
        toast.success(id ? 'Texnika yeniləndi' : 'Texnika yaradıldı');
        navigate('/admin/equipment');
      } else {
        console.error('Error response:', data);
        toast.error(data.error || 'Xəta baş verdi');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="container mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/admin/equipment')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <h1 className="text-3xl font-bold">
            {id ? 'Texnikanı Redaktə Et' : 'Yeni Texnika'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Texnika Məlumatları</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Kateqoriya *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Kateqoriya seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Ad *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Shantui SD32 Buldozer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Təsvir</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
                  rows={4}
                  placeholder="Texnika haqqında ətraflı məlumat..."
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
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">Sayı</Label>
                <Input
                  id="count"
                  value={formData.count || ''}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value || null })}
                  placeholder="4 ədəd, 5+ ədəd, Mövcuddur"
                />
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
                  onClick={() => navigate('/admin/equipment')}
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

export default EquipmentForm;

