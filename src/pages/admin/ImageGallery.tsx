import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Copy, Check, Image as ImageIcon, ArrowLeft, Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ImageItem {
  fileName: string;
  url: string;
  fullUrl: string;
  size: number;
  uploadedAt: Date;
}

const ImageGallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchImages();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/images`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Şəkilləri yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
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
        toast.success('Şəkil uğurla yükləndi');
        // Reset file input
        e.target.value = '';
        // Refresh images list
        await fetchImages();
      } else {
        toast.error(data.error || 'Şəkil yüklənmədi');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Şəkil yüklənmədi');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Link kopyalandı!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Kopyalama uğursuz oldu');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredImages = images.filter((image) =>
    image.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <h1 className="text-3xl font-bold">Şəkil Qalereyası</h1>
        </div>

        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Şəkil Yüklə</CardTitle>
            <CardDescription>Yeni şəkil yükləyin və linkini alın</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="cursor-pointer max-w-md"
              />
              {uploading && <p className="text-sm text-muted-foreground">Yüklənir...</p>}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <Input
            placeholder="Şəkil adı ilə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {filteredImages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {searchTerm ? 'Axtarışa uyğun şəkil tapılmadı' : 'Hələ şəkil yüklənməyib'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image, index) => {
              const imageUrl = image.url.startsWith('http')
                ? image.url
                : image.url.startsWith('/uploads')
                ? `${API_URL}${image.url}`
                : `${API_URL}/uploads/${image.url}`;
              const fullImageUrl = image.fullUrl || imageUrl;

              return (
                <Card key={image.fileName} className="overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={imageUrl}
                      alt={image.fileName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <p className="text-sm font-medium text-foreground mb-1 truncate">
                        {image.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(image.size)} • {formatDate(image.uploadedAt)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={fullImageUrl}
                          readOnly
                          className="text-xs flex-1"
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(fullImageUrl, index)}
                          className="flex-shrink-0"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={image.url}
                          readOnly
                          className="text-xs flex-1"
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(image.url, index + 10000)}
                          className="flex-shrink-0"
                        >
                          {copiedIndex === index + 10000 ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-sm text-muted-foreground text-center">
          Cəmi {filteredImages.length} şəkil
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImageGallery;

