// ============================================
// components/checkout/CheckoutForm.jsx
// ============================================
import { Input } from '../common/Input';
import { Select } from '../common/Select';

export const CheckoutForm = ({
  formData,
  onFormChange,
  onSubmit,
  isLoading = false,
}) => {
  const deliveryOptions = [
    { label: 'Shop Pickup - Free', value: 'pickup' },
    { label: 'Home Delivery - ₦2,500', value: 'delivery' },
  ];

  const paymentOptions = [
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Pay on Delivery', value: 'pay_on_delivery' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-bold mb-4">Shipping Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => onFormChange('fullName', e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            placeholder="+234 800 123 4567"
            value={formData.phone}
            onChange={(e) => onFormChange('phone', e.target.value)}
            required
          />
          <Input
            label="Delivery Address"
            placeholder="123 Main Street, Lagos"
            value={formData.address}
            onChange={(e) => onFormChange('address', e.target.value)}
            required={formData.deliveryType === 'delivery'}
          />
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold mb-4">Delivery & Payment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Delivery Type"
            value={formData.deliveryType}
            onChange={(e) => onFormChange('deliveryType', e.target.value)}
            options={deliveryOptions}
          />

          <Select
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) => onFormChange('paymentMethod', e.target.value)}
            options={paymentOptions}
          />
        </div>
      </div>

      <Card className="bg-cyan-500/10 border-cyan-500/50">
        <p className="text-cyan-400 text-sm">
          <span className="font-bold">Note:</span> Please ensure your information is correct
          before proceeding. You will receive an order confirmation via email.
        </p>
      </Card>

      <Button onClick={onSubmit} disabled={isLoading} className="w-full">
        {isLoading ? 'Processing...' : 'Place Order'}
      </Button>
    </div>
  );
};
