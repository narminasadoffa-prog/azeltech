import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Vacancy {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  type: string;
  published: boolean;
}

const VacancyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Vacancy>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: '',
    published: false,
  });

  useEffect(() => {
    checkAuth();
    if (id) {
      fetchVacancy();
    }
  }, [id]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchVacancy = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/vacancies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch vacancy');
      }
      const data = await response.json();
      setFormData({
        title: data.title || '',
        description: data.description || '',
        requirements: data.requirements || '',
        location: data.location || '',
        salary: data.salary || '',
        type: data.type || '',
        published: data.published ?? false,
      });
    } catch (error) {
      console.error('Error fetching vacancy:', error);
      toast.error('Vakansiyanı yükləmək mümkün olmadı');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = id
        ? `${API_URL}/api/admin/vacancies/${id}`
        : `${API_URL}/api/admin/vacancies`;
      const method = id ? 'PUT' : 'POST';

      const cleanedData = {
        ...formData,
        requirements: formData.requirements || null,
        location: formData.location || null,
        salary: formData.salary || null,
        type: formData.type || null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        toast.success(id ? 'Vakansiya yeniləndi' : 'Vakansiya yaradıldı');
        navigate('/admin/vacancies');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        toast.error(errorData.error || 'Xəta baş verdi');
      }
    } catch (error) {
      console.error('Error submitting vacancy:', error);
      toast.error('Xəta baş verdi. Konsolu yoxlayın.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="container mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin/vacancies')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold">
              {id ? 'Vakansiyanı Redaktə Et' : 'Yeni Vakansiya'}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vakansiya Məlumatları</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlıq *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Təsvir *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Tələblər</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={4}
                    placeholder="Təcrübə, təhsil, bacarıqlar və s."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Yer</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Bakı, Sumqayıt və s."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Maaş</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="500-1000 AZN"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">İş növü</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="İş növünü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Tam ştat</SelectItem>
                      <SelectItem value="part-time">Yarım ştat</SelectItem>
                      <SelectItem value="contract">Müqavilə</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Dərc olunub</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saxlanılır...' : 'Saxla'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/vacancies')}
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

export default VacancyForm;

