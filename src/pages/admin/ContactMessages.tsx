import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchMessages();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/contact-messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast.error('Mesajları yükləmək mümkün olmadı');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">Yüklənir...</div>
      </AdminLayout>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

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
            <h1 className="text-3xl font-bold">Əlaqə Mesajları</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} oxunmamış</Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bütün Mesajlar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Mövzu</TableHead>
                  <TableHead>Tarix</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Heç bir mesaj yoxdur
                    </TableCell>
                  </TableRow>
                ) : (
                  messages.map((message) => (
                    <TableRow key={message.id} className={!message.read ? 'bg-blue-50' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {message.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {message.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {message.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {message.phone}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{message.subject || '-'}</TableCell>
                      <TableCell>
                        {new Date(message.createdAt).toLocaleDateString('az-AZ')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={message.read ? 'secondary' : 'default'}>
                          {message.read ? 'Oxunub' : 'Yeni'}
                        </Badge>
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

export default ContactMessages;


