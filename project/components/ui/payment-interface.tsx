'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PrivateQualification, GroupQualification } from '@/types/teacher';

interface PaymentInterfaceProps {
  qualification: PrivateQualification | GroupQualification;
  type: 'private' | 'group';
  onPaymentComplete: () => void;
}

export function PaymentInterface({ qualification, type, onPaymentComplete }: PaymentInterfaceProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [bookingData, setBookingData] = useState({
    studentCount: type === 'group' ? (qualification as GroupQualification).minStudents : 1,
    duration: '60',
    date: '',
    time: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: ''
  });

  const calculateTotal = () => {
    const baseRate = qualification.rate;
    const duration = parseInt(bookingData.duration);
    const students = bookingData.studentCount;
    return (baseRate * (duration / 60) * students).toFixed(2);
  };

  const validateBookingForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!bookingData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (type === 'group') {
      const groupQual = qualification as GroupQualification;
      if (bookingData.studentCount < groupQual.minStudents) {
        newErrors.studentCount = `Minimum ${groupQual.minStudents} students required`;
      }
      if (bookingData.studentCount > groupQual.maxStudents) {
        newErrors.studentCount = `Maximum ${groupQual.maxStudents} students allowed`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    
    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Valid expiry date is required (MM/YY)';
    }
    
    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      newErrors.cvv = 'Valid CVV is required';
    }
    
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBookingForm()) {
      setPaymentStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) return;
    
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setLoading(false);
    setPaymentStep('success');
    
    // Auto-complete after 2 seconds
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (paymentStep === 'success') {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-green-800">
            <strong>Booking Details:</strong><br />
            {qualification.name} - {qualification.currency}{calculateTotal()}<br />
            {bookingData.date} at {bookingData.time}<br />
            Duration: {bookingData.duration} minutes
            {type === 'group' && <><br />Students: {bookingData.studentCount}</>}
          </p>
        </div>
        <p className="text-sm text-gray-500">Redirecting...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center space-x-4 mb-6">
        <div className={`flex items-center space-x-2 ${paymentStep === 'details' ? 'text-blue-600' : 'text-green-600'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            paymentStep === 'details' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
          }`}>
            {paymentStep === 'details' ? '1' : <CheckCircle className="w-5 h-5" />}
          </div>
          <span className="font-medium">Booking Details</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className={`flex items-center space-x-2 ${
          paymentStep === 'payment' ? 'text-blue-600' : paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            paymentStep === 'payment' ? 'bg-blue-600 text-white' : 
            paymentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {paymentStep === 'success' ? <CheckCircle className="w-5 h-5" /> : '2'}
          </div>
          <span className="font-medium">Payment</span>
        </div>
      </div>

      {paymentStep === 'details' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900">{qualification.name}</h4>
              <p className="text-sm text-blue-700">{qualification.description}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary">
                  {type === 'private' ? (qualification as PrivateQualification).level : 'Group Session'}
                </Badge>
                <span className="font-bold text-blue-900">
                  {qualification.currency}{qualification.rate}/hour
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className={errors.date ? 'border-red-500' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className={errors.time ? 'border-red-500' : ''}
                />
                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={bookingData.duration} onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type === 'group' && (
                <div className="space-y-2">
                  <Label htmlFor="studentCount">Number of Students</Label>
                  <Input
                    id="studentCount"
                    type="number"
                    value={bookingData.studentCount}
                    onChange={(e) => setBookingData({ ...bookingData, studentCount: parseInt(e.target.value) || 1 })}
                    min={(qualification as GroupQualification).minStudents}
                    max={(qualification as GroupQualification).maxStudents}
                    className={errors.studentCount ? 'border-red-500' : ''}
                  />
                  {errors.studentCount && <p className="text-sm text-red-500">{errors.studentCount}</p>}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {qualification.currency}{calculateTotal()}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Proceed to Payment
            </Button>
          </form>
        </Card>
      )}

      {paymentStep === 'payment' && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lock className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Secure Payment</h3>
          </div>
          
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              </div>
              {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      setPaymentData({ ...paymentData, expiryDate: value });
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`pl-10 ${errors.expiryDate ? 'border-red-500' : ''}`}
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                  placeholder="123"
                  maxLength={3}
                  className={errors.cvv ? 'border-red-500' : ''}
                />
                {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={paymentData.cardholderName}
                onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                placeholder="John Doe"
                className={errors.cardholderName ? 'border-red-500' : ''}
              />
              {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                value={paymentData.billingAddress}
                onChange={(e) => setPaymentData({ ...paymentData, billingAddress: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={paymentData.city}
                  onChange={(e) => setPaymentData({ ...paymentData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={paymentData.zipCode}
                  onChange={(e) => setPaymentData({ ...paymentData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>{qualification.currency}{calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Processing Fee:</span>
                <span>{qualification.currency}2.50</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>Total:</span>
                <span className="text-xl text-blue-600">
                  {qualification.currency}{(parseFloat(calculateTotal()) + 2.50).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setPaymentStep('details')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Processing...' : `Pay ${qualification.currency}${(parseFloat(calculateTotal()) + 2.50).toFixed(2)}`}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}