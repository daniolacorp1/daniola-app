// src/pages/DealDetail.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { supabase } from '../lib/supabase-client';
import type { Deal } from '../types/deal';
import { Badge } from 'lucide-react';
// Removed local Deal interface declaration as it conflicts with the imported Deal type

const DealDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deal, setDeal] = React.useState<Deal | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data, error } = await supabase
          .from('deals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setDeal(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load deal details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!deal) {
    return <div>Deal not found</div>;
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{deal.title}</h1>
          <Badge>{deal.status}</Badge>
        </div>
        <Button variant="outline" onClick={() => navigate('/deals')}>
          Back to Deals
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Deal Overview</CardTitle>
              <CardDescription>Key information about the deal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p>{deal.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">Value</h3>
                  <p>{deal.value}</p>
                </div>
                <div>
                  <h3 className="font-medium">Timeline</h3>
                  <p>{deal.timeline}</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <p>{deal.status}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p>{deal.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Deal related documents</CardDescription>
            </CardHeader>
            <CardContent>
              {deal.documents?.length ? (
                deal.documents.map((doc: any) => (
                  <div key={doc.id}>{/* Document item */}</div>
                ))
              ) : (
                <p>No documents available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Updates</CardTitle>
              <CardDescription>Recent deal updates</CardDescription>
            </CardHeader>
            <CardContent>
              {deal.updates?.length ? (
                deal.updates.map((update: any) => (
                  <div key={update.id}>{/* Update item */}</div>
                ))
              ) : (
                <p>No updates available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Deal related tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {deal.tasks?.length ? (
                deal.tasks.map((task: any) => (
                  <div key={task.id}>{/* Task item */}</div>
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealDetail;