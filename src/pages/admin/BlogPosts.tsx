import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  date: string;
  published: boolean;
  createdAt: string;
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/blog-posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error('Blog yazılarını yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazını silmək istədiyinizə əminsiniz?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/blog-posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Yazı silindi');
        fetchPosts();
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
            <h1 className="text-3xl font-bold">Blog Yazıları</h1>
          </div>
          <Button onClick={() => navigate('/admin/blog-posts/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Yazı
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bütün Yazılar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlıq</TableHead>
                  <TableHead>Tarix</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Heç bir yazı yoxdur
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {post.published ? 'Dərc olunub' : 'Qaralama'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/blog-posts/${post.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
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

export default BlogPosts;

