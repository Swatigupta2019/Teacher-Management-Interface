'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { PrivateQualification, GroupQualification } from '@/types/teacher';

interface EditQualificationDialogProps {
  type: 'private' | 'group';
  qualification: PrivateQualification | GroupQualification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (qualification: PrivateQualification | GroupQualification) => void;
}

export function EditQualificationDialog({ type, qualification, open, onOpenChange, onEdit }: EditQualificationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
    currency: '$',
    description: '',
    level: 'beginner',
    minStudents: '',
    maxStudents: ''
  });

  useEffect(() => {
    if (qualification) {
      setFormData({
        name: qualification.name,
        rate: qualification.rate.toString(),
        currency: qualification.currency,
        description: qualification.description || '',
        level: (qualification as PrivateQualification).level || 'beginner',
        minStudents: (qualification as GroupQualification).minStudents?.toString() || '',
        maxStudents: (qualification as GroupQualification).maxStudents?.toString() || ''
      });
    }
  }, [qualification]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.rate || parseFloat(formData.rate) <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }
    
    if (type === 'group') {
      if (!formData.minStudents || parseInt(formData.minStudents) <= 0) {
        newErrors.minStudents = 'Minimum students must be greater than 0';
      }
      if (!formData.maxStudents || parseInt(formData.maxStudents) <= 0) {
        newErrors.maxStudents = 'Maximum students must be greater than 0';
      }
      if (parseInt(formData.minStudents) >= parseInt(formData.maxStudents)) {
        newErrors.maxStudents = 'Maximum must be greater than minimum';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !qualification) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseQualification = {
      id: qualification.id,
      name: formData.name,
      rate: parseFloat(formData.rate),
      currency: formData.currency,
      description: formData.description
    };
    
    if (type === 'private') {
      onEdit({
        ...baseQualification,
        level: formData.level as 'beginner' | 'intermediate' | 'advanced'
      } as PrivateQualification);
    } else {
      onEdit({
        ...baseQualification,
        minStudents: parseInt(formData.minStudents),
        maxStudents: parseInt(formData.maxStudents)
      } as GroupQualification);
    }
    
    setLoading(false);
    onOpenChange(false);
    setErrors({});
  };

  if (!qualification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit {type === 'private' ? 'Private' : 'Group'} Qualification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter qualification name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Rate *</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                placeholder="0.00"
                className={errors.rate ? 'border-red-500' : ''}
              />
              {errors.rate && <p className="text-sm text-red-500">{errors.rate}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">USD ($)</SelectItem>
                  <SelectItem value="€">EUR (€)</SelectItem>
                  <SelectItem value="£">GBP (£)</SelectItem>
                  <SelectItem value="¥">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === 'private' && (
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === 'group' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minStudents">Min Students *</Label>
                <Input
                  id="minStudents"
                  type="number"
                  value={formData.minStudents}
                  onChange={(e) => setFormData({ ...formData, minStudents: e.target.value })}
                  placeholder="1"
                  className={errors.minStudents ? 'border-red-500' : ''}
                />
                {errors.minStudents && <p className="text-sm text-red-500">{errors.minStudents}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students *</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                  placeholder="10"
                  className={errors.maxStudents ? 'border-red-500' : ''}
                />
                {errors.maxStudents && <p className="text-sm text-red-500">{errors.maxStudents}</p>}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter qualification description"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Qualification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}