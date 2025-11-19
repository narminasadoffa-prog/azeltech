import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Save, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Service {
  title: string;
  description: string;
  image: string; // JSON array string
  items: string;
  published: boolean;
}

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Service>({
    title: '',
    description: '',
    image: '[]', // JSON array string
    items: '',
    published: true,
  });

  useEffect(() => {
    checkAuth();
    if (id) {
      fetchService();
    }
  }, [id]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchService = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      const data = await response.json();
      let imageArray: string[] = [];
      if (data.image) {
        try {
          imageArray = JSON.parse(data.image);
        } catch {
          // Əgər JSON deyilsə, köhnə format kimi işlə
          if (typeof data.image === 'string') {
            imageArray = [data.image];
          }
        }
      }
      setImages(imageArray);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '[]',
        items: data.items || '',
        published: data.published ?? true,
      });
    } catch (error) {
      console.error('Error fetching service:', error);
      toast.error('Xidməti yükləmək mümkün olmadı');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= 3) {
      toast.error('Maksimum 3 şəkil yükləyə bilərsiniz');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Yalnız şəkil faylları yüklənə bilər');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Şəkil ölçüsü 5MB-dan böyük ola bilməz');
      return;
    }

    const uploadIndex = index !== undefined ? index : images.length;
    setUploadingIndex(uploadIndex);
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
        const newImages = [...images];
        if (index !== undefined && index < images.length) {
          newImages[index] = data.url;
        } else {
          newImages.push(data.url);
        }
        setImages(newImages);
        setFormData((prev) => ({ ...prev, image: JSON.stringify(newImages) }));
        toast.success('Şəkil uğurla yükləndi');
      } else {
        toast.error(data.error || 'Şəkil yüklənmədi');
      }
    } catch (error) {
      toast.error('Şəkil yüklənmədi');
    } finally {
      setUploadingIndex(null);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormData((prev) => ({ ...prev, image: JSON.stringify(newImages) }));
    toast.success('Şəkil silindi');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = id
        ? `${API_URL}/api/admin/services/${id}`
        : `${API_URL}/api/admin/services`;
      const method = id ? 'PUT' : 'POST';

      // Ensure image is JSON array string
      const submitData = {
        ...formData,
        image: JSON.stringify(images),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast.success(id ? 'Xidmət yeniləndi' : 'Xidmət yaradıldı');
        navigate('/admin/services');
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
            <Button variant="ghost" onClick={() => navigate('/admin/services')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">
              {id ? 'Xidməti Redaktə Et' : 'Yeni Xidmət'}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Xidmət Məlumatları</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlıq *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ağır Texnika İcarəsi"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Təsvir *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Xidmət haqqında ətraflı məlumat..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Şəkillər (1-3 arası)</Label>
                  <div className="space-y-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img
                              src={image.startsWith('http') ? image : (image.startsWith('/uploads') ? `${API_URL}${image}` : `${API_URL}/uploads/${image}`)}
                              alt={`Preview ${index + 1}`}
                              className="w-32 h-32 object-cover rounded border"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            {uploadingIndex === index && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                                <p className="text-white text-sm">Yüklənir...</p>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`image-file-${index}`} className="text-sm">
                              Şəkil {index + 1}
                            </Label>
                            <Input
                              id={`image-file-${index}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              disabled={uploadingIndex !== null}
                              className="cursor-pointer mt-1"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(index)}
                            disabled={uploadingIndex !== null}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <div className="border-2 border-dashed rounded-lg p-4">
                        <Label htmlFor="image-file-new" className="text-sm">
                          Yeni şəkil əlavə et ({images.length}/3)
                        </Label>
                        <Input
                          id="image-file-new"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingIndex !== null}
                          className="cursor-pointer mt-1"
                        />
                        {uploadingIndex === images.length && (
                          <p className="text-sm text-muted-foreground mt-2">Yüklənir...</p>
                        )}
                      </div>
                    )}
                  </div>
                  {images.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Ən azı 1 şəkil əlavə etməlisiniz
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items">Xidmət elementləri (JSON formatında)</Label>
                  <Textarea
                    id="items"
                    value={formData.items}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                    rows={3}
                    placeholder='["Element 1", "Element 2", "Element 3"]'
                  />
                  <p className="text-sm text-muted-foreground">
                    JSON array formatında, məsələn: ["Buldozerlər", "Ekskavatorlar"]
                  </p>
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
                    onClick={() => navigate('/admin/services')}
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

export default ServiceForm;

