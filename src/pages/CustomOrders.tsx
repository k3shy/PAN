import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, Check, ArrowRight, Image as ImageIcon, Package, Clock, DollarSign } from 'lucide-react';
import Layout from '../components/Layout';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  garmentType: string;
  size: string;
  quantity: string;
  description: string;
  budget: string;
  deadline: string;
}

export default function CustomOrders() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    garmentType: '',
    size: '',
    quantity: '1',
    description: '',
    budget: '',
    deadline: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const garmentTypes = [
    'T-Shirt',
    'Hoodie',
    'Jacket',
    'Pants',
    'Shorts',
    'Cap',
    'Other',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please upload image files only (JPG, PNG, GIF, etc.)');
      return;
    }

    const newImages: UploadedImage[] = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.garmentType) newErrors.garmentType = 'Please select a garment type';
    if (!formData.size) newErrors.size = 'Please select a size';
    if (!formData.description.trim()) newErrors.description = 'Please describe your design';
    if (images.length === 0) {
      alert('Please upload at least one reference image');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // In production, this would send to a backend
    // For now, store in localStorage
    const orderData = {
      ...formData,
      images: images.map(img => img.file.name),
      submittedAt: new Date().toISOString(),
      orderId: 'CUSTOM-' + Date.now(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('pan_custom_orders') || '[]');
    localStorage.setItem('pan_custom_orders', JSON.stringify([...existingOrders, orderData]));

    setSubmitted(true);
    
    // Clean up object URLs
    images.forEach(img => URL.revokeObjectURL(img.preview));
  };

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <Layout>
      <div className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pan-dark border border-white/5 rounded-sm p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-400" />
            </div>
            <h1 className="text-3xl font-grotesk font-bold text-pan-white mb-4">
              Order Submitted!
            </h1>
            <p className="text-pan-muted mb-6">
              Thank you for your custom order request. Our design team will review your submission and get back to you within 24-48 hours.
            </p>
            <div className="bg-pan-gray rounded-sm p-4 mb-6 text-left">
              <p className="text-xs text-pan-muted mb-2">What happens next:</p>
              <ul className="text-sm text-pan-white space-y-2">
                <li>✓ We'll review your design and reference images</li>
                <li>✓ You'll receive a quote via email</li>
                <li>✓ Once approved, we'll begin production</li>
                <li>✓ You'll get tracking updates throughout</li>
              </ul>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white mb-4">
            Custom Orders
          </h1>
          <p className="text-pan-muted">
            Bring your vision to life. Upload your design or reference images and we'll create something unique for you.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-pan-dark border border-white/5 rounded-sm p-4">
            <Package size={24} className="text-pan-accent mb-2" />
            <h3 className="text-sm font-semibold text-pan-white mb-1">Min. Order: 1 Piece</h3>
            <p className="text-xs text-pan-muted">Single items or bulk orders welcome</p>
          </div>
          <div className="bg-pan-dark border border-white/5 rounded-sm p-4">
            <Clock size={24} className="text-pan-accent mb-2" />
            <h3 className="text-sm font-semibold text-pan-white mb-1">2-3 Weeks</h3>
            <p className="text-xs text-pan-muted">Average production time</p>
          </div>
          <div className="bg-pan-dark border border-white/5 rounded-sm p-4">
            <DollarSign size={24} className="text-pan-accent mb-2" />
            <h3 className="text-sm font-semibold text-pan-white mb-1">Custom Pricing</h3>
            <p className="text-xs text-pan-muted">Quote based on complexity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
            <h2 className="text-xl font-grotesk font-bold text-pan-white mb-4">
              Reference Images <span className="text-pan-accent">*</span>
            </h2>
            <p className="text-sm text-pan-muted mb-6">
              Upload images of your design, logo, or inspiration. Multiple images welcome.
            </p>

            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-pan-accent bg-pan-accent/5'
                  : 'border-white/20 hover:border-pan-accent/50 hover:bg-pan-gray/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload size={40} className="text-pan-muted mx-auto mb-4" />
              <p className="text-pan-white mb-2">
                {dragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="text-sm text-pan-muted">or click to browse</p>
              <p className="text-xs text-pan-muted/60 mt-2">
                Supports: JPG, PNG, GIF, WebP (Max 10MB each)
              </p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-pan-white mb-3">
                  {images.length} image{images.length !== 1 ? 's' : ''} uploaded
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.id} className="relative group aspect-square bg-pan-gray rounded-sm overflow-hidden border border-white/10">
                      <img
                        src={img.preview}
                        alt={img.file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={16} className="text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                        <p className="text-xs text-white truncate">{img.file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
            <h2 className="text-xl font-grotesk font-bold text-pan-white mb-4">
              Contact Information <span className="text-pan-accent">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-pan-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-pan-white mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-pan-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="+254 700 000 000"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
            <h2 className="text-xl font-grotesk font-bold text-pan-white mb-4">
              Order Details <span className="text-pan-accent">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-pan-white mb-2">Garment Type</label>
                <select
                  value={formData.garmentType}
                  onChange={(e) => handleChange('garmentType', e.target.value)}
                  className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors ${
                    errors.garmentType ? 'border-red-500' : 'border-white/10'
                  }`}
                >
                  <option value="">Select type</option>
                  {garmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.garmentType && <p className="text-xs text-red-400 mt-1">{errors.garmentType}</p>}
              </div>
              <div>
                <label className="block text-sm text-pan-white mb-2">Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors ${
                    errors.size ? 'border-red-500' : 'border-white/10'
                  }`}
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && <p className="text-xs text-red-400 mt-1">{errors.size}</p>}
              </div>
              <div>
                <label className="block text-sm text-pan-white mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-pan-white mb-2">Budget Range (KSh)</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
                  placeholder="e.g., 5,000 - 10,000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-pan-white mb-2">Deadline (Optional)</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  className="w-full px-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-pan-white mb-2">
                Design Description <span className="text-pan-accent">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 bg-pan-gray border rounded-sm text-white focus:outline-none focus:border-pan-accent transition-colors resize-none ${
                  errors.description ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="Describe your design in detail: colors, placement, style, any specific requirements..."
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-pan-accent/20"
            >
              Submit Custom Order
            </button>
            <Link
              to="/"
              className="flex-1 sm:flex-none px-8 py-4 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
}
