'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { PrivateQualification, GroupQualification } from '@/types/teacher';
import { AddQualificationDialog } from './add-qualification-dialog';
import { EditQualificationDialog } from './edit-qualification-dialog';
import { PaymentInterface } from './payment-interface';

interface QualificationsTableProps {
  privateQualifications: PrivateQualification[];
  groupQualifications: GroupQualification[];
  onUpdatePrivate: (qualifications: PrivateQualification[]) => void;
  onUpdateGroup: (qualifications: GroupQualification[]) => void;
}

export function QualificationsTable({ 
  privateQualifications, 
  groupQualifications, 
  onUpdatePrivate, 
  onUpdateGroup 
}: QualificationsTableProps) {
  const [editingQualification, setEditingQualification] = useState<{
    type: 'private' | 'group';
    qualification: PrivateQualification | GroupQualification;
  } | null>(null);
  
  const [paymentQualification, setPaymentQualification] = useState<{
    type: 'private' | 'group';
    qualification: PrivateQualification | GroupQualification;
  } | null>(null);
  
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'private' | 'group';
    id: string;
    name: string;
  } | null>(null);

  const handleAddPrivate = (qualification: PrivateQualification) => {
    onUpdatePrivate([...privateQualifications, qualification]);
    toast.success('Private qualification added successfully!');
  };

  const handleAddGroup = (qualification: GroupQualification) => {
    onUpdateGroup([...groupQualifications, qualification]);
    toast.success('Group qualification added successfully!');
  };

  const handleEditPrivate = (qualification: PrivateQualification) => {
    const updated = privateQualifications.map(q => 
      q.id === qualification.id ? qualification : q
    );
    onUpdatePrivate(updated);
    toast.success('Private qualification updated successfully!');
  };

  const handleEditGroup = (qualification: GroupQualification) => {
    const updated = groupQualifications.map(q => 
      q.id === qualification.id ? qualification : q
    );
    onUpdateGroup(updated);
    toast.success('Group qualification updated successfully!');
  };

  const handleDeletePrivate = (id: string) => {
    const updated = privateQualifications.filter(q => q.id !== id);
    onUpdatePrivate(updated);
    toast.success('Private qualification deleted successfully!');
    setDeleteConfirm(null);
  };

  const handleDeleteGroup = (id: string) => {
    const updated = groupQualifications.filter(q => q.id !== id);
    onUpdateGroup(updated);
    toast.success('Group qualification deleted successfully!');
    setDeleteConfirm(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Private Qualifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Private Qualifications</CardTitle>
          <AddQualificationDialog 
            type="private" 
            onAdd={handleAddPrivate}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {privateQualifications.map((qual) => (
                  <TableRow key={qual.id}>
                    <TableCell className="font-medium">{qual.name}</TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(qual.level)}>
                        {qual.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {qual.currency}{qual.rate}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setPaymentQualification({ type: 'private', qualification: qual })}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingQualification({ type: 'private', qualification: qual })}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirm({ type: 'private', id: qual.id, name: qual.name })}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {privateQualifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                      No private qualifications added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Group Qualifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Group Qualifications</CardTitle>
          <AddQualificationDialog 
            type="group" 
            onAdd={handleAddGroup}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupQualifications.map((qual) => (
                  <TableRow key={qual.id}>
                    <TableCell className="font-medium">{qual.name}</TableCell>
                    <TableCell>{qual.minStudents}-{qual.maxStudents}</TableCell>
                    <TableCell className="font-medium">
                      {qual.currency}{qual.rate}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setPaymentQualification({ type: 'group', qualification: qual })}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingQualification({ type: 'group', qualification: qual })}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirm({ type: 'group', id: qual.id, name: qual.name })}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {groupQualifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                      No group qualifications added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditQualificationDialog
        type={editingQualification?.type || 'private'}
        qualification={editingQualification?.qualification || null}
        open={!!editingQualification}
        onOpenChange={(open) => !open && setEditingQualification(null)}
        onEdit={(qual) => {
          if (editingQualification?.type === 'private') {
            handleEditPrivate(qual as PrivateQualification);
          } else {
            handleEditGroup(qual as GroupQualification);
          }
          setEditingQualification(null);
        }}
      />

      {/* Payment Dialog */}
      <Dialog open={!!paymentQualification} onOpenChange={(open) => !open && setPaymentQualification(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Session - {paymentQualification?.qualification.name}</DialogTitle>
          </DialogHeader>
          {paymentQualification && (
            <PaymentInterface
              qualification={paymentQualification.qualification}
              type={paymentQualification.type}
              onPaymentComplete={() => {
                setPaymentQualification(null);
                toast.success('Session booked successfully!');
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Confirm Deletion</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete <strong>"{deleteConfirm?.name}"</strong>? 
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                if (deleteConfirm?.type === 'private') {
                  handleDeletePrivate(deleteConfirm.id);
                } else {
                  handleDeleteGroup(deleteConfirm.id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}