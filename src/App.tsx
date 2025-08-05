import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Factory, Calendar, User } from 'lucide-react';

interface FormData {
  date: string;
  shift: string;
  operator: string;
  // Hasil Produksi (kg)
  capMedium: string;
  capSmall: string;
  plugMedium: string;
  plugSmall: string;
  assemblingMedium: string;
  assemblingSmall: string;
  // Pemakaian Material (kg)
  usagePP: string;
  usageHDPE: string;
  usageMB: string;
  usageLDPE: string;
  // Bon (kg)
  bonPP: string;
  bonHDPE: string;
  bonMB: string;
  bonLDPE: string;
  // Material Hilang (kg)
  bekuan: string;
  sapuan: string;
  moveSteelmill: string;
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    shift: '',
    operator: '',
    // Hasil Produksi
    capMedium: '',
    capSmall: '',
    plugMedium: '',
    plugSmall: '',
    assemblingMedium: '',
    assemblingSmall: '',
    // Pemakaian Material
    usagePP: '',
    usageHDPE: '',
    usageMB: '',
    usageLDPE: '',
    // Bon
    bonPP: '',
    bonHDPE: '',
    bonMB: '',
    bonLDPE: '',
    // Material Hilang
    bekuan: '',
    sapuan: '',
    moveSteelmill: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Replace this URL with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date.trim()) {
      newErrors.date = 'Tanggal wajib diisi';
    }

    if (!formData.shift.trim()) {
      newErrors.shift = 'Shift wajib diisi';
    }

    if (!formData.operator.trim()) {
      newErrors.operator = 'Nama operator wajib diisi';
    }

    // Validate numeric fields
    const numericFields = [
      'capMedium', 'capSmall', 'plugMedium', 'plugSmall', 'assemblingMedium', 'assemblingSmall',
      'usagePP', 'usageHDPE', 'usageMB', 'usageLDPE',
      'bonPP', 'bonHDPE', 'bonMB', 'bonLDPE',
      'bekuan', 'sapuan', 'moveSteelmill'
    ];

    numericFields.forEach(field => {
      const value = formData[field as keyof FormData];
      if (value && isNaN(Number(value))) {
        newErrors[field] = 'Harus berupa angka';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // For now, we'll simulate the API call
      // Replace this with actual Google Sheets integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Uncomment this section when you have your Google Apps Script URL
      /*
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      */

      setSubmitStatus('success');
      setFormData({
        date: '',
        shift: '',
        operator: '',
        capMedium: '',
        capSmall: '',
        plugMedium: '',
        plugSmall: '',
        assemblingMedium: '',
        assemblingSmall: '',
        usagePP: '',
        usageHDPE: '',
        usageMB: '',
        usageLDPE: '',
        bonPP: '',
        bonHDPE: '',
        bonMB: '',
        bonLDPE: '',
        bekuan: '',
        sapuan: '',
        moveSteelmill: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrors({});
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Berhasil Disimpan!</h2>
          <p className="text-gray-600 mb-6">Data produksi telah berhasil dikirim ke Google Sheets.</p>
          <button
            onClick={resetForm}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Input Data Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Factory className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Form Data Produksi</h1>
          </div>
          <p className="text-gray-600">Input data produksi harian untuk tracking dan monitoring</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">Terjadi kesalahan saat mengirim data. Silakan coba lagi.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Informasi Shift
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.date ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-2">
                    Shift *
                  </label>
                  <select
                    id="shift"
                    name="shift"
                    value={formData.shift}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.shift ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Shift</option>
                    <option value="1">Shift 1</option>
                    <option value="2">Shift 2</option>
                    <option value="3">Shift 3</option>
                  </select>
                  {errors.shift && <p className="text-red-600 text-sm mt-1">{errors.shift}</p>}
                </div>

                <div>
                  <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Operator *
                  </label>
                  <input
                    type="text"
                    id="operator"
                    name="operator"
                    value={formData.operator}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.operator ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama operator"
                  />
                  {errors.operator && <p className="text-red-600 text-sm mt-1">{errors.operator}</p>}
                </div>
              </div>
            </div>

            {/* Hasil Produksi */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hasil Produksi (kg)</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cap Medium</label>
                    <input
                      type="number"
                      name="capMedium"
                      value={formData.capMedium}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cap Small</label>
                    <input
                      type="number"
                      name="capSmall"
                      value={formData.capSmall}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plug Medium</label>
                    <input
                      type="number"
                      name="plugMedium"
                      value={formData.plugMedium}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plug Small</label>
                    <input
                      type="number"
                      name="plugSmall"
                      value={formData.plugSmall}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assembling Medium</label>
                    <input
                      type="number"
                      name="assemblingMedium"
                      value={formData.assemblingMedium}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assembling Small</label>
                    <input
                      type="number"
                      name="assemblingSmall"
                      value={formData.assemblingSmall}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pemakaian Material */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pemakaian Material (kg)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PP</label>
                  <input
                    type="number"
                    name="usagePP"
                    value={formData.usagePP}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HDPE</label>
                  <input
                    type="number"
                    name="usageHDPE"
                    value={formData.usageHDPE}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MB</label>
                  <input
                    type="number"
                    name="usageMB"
                    value={formData.usageMB}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LDPE</label>
                  <input
                    type="number"
                    name="usageLDPE"
                    value={formData.usageLDPE}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Bon */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bon (kg)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PP</label>
                  <input
                    type="number"
                    name="bonPP"
                    value={formData.bonPP}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HDPE</label>
                  <input
                    type="number"
                    name="bonHDPE"
                    value={formData.bonHDPE}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MB</label>
                  <input
                    type="number"
                    name="bonMB"
                    value={formData.bonMB}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LDPE</label>
                  <input
                    type="number"
                    name="bonLDPE"
                    value={formData.bonLDPE}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Material Hilang */}
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Hilang (kg)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bekuan</label>
                  <input
                    type="number"
                    name="bekuan"
                    value={formData.bekuan}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sapuan</label>
                  <input
                    type="number"
                    name="sapuan"
                    value={formData.sapuan}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Move Steelmill</label>
                  <input
                    type="number"
                    name="moveSteelmill"
                    value={formData.moveSteelmill}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Mengirim Data...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Simpan Data Produksi
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Petunjuk Setup Google Sheets:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Buat Google Sheet baru untuk data produksi</li>
            <li>Buka Extensions → Apps Script di Google Sheet</li>
            <li>Ganti kode default dengan kode Google Apps Script yang disediakan</li>
            <li>Deploy sebagai web app dan copy URL-nya</li>
            <li>Ganti GOOGLE_SCRIPT_URL di kode dengan URL web app Anda</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;