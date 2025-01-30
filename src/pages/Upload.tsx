import React, { useRef, useState } from 'react';
import { Upload as UploadIcon, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { read, utils } from 'xlsx';
import { api } from '../api/api';

export const Upload: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('Processing file...');
      
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      setUploadStatus('Uploading data...');
      await api.uploadDrugsExcel(file);
      
      setUploadStatus('File uploaded successfully!');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadStatus('Error uploading file');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bulk Upload</h1>
        
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
              <div className="text-center space-y-4">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                <div>
                  <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                    <UploadIcon className="h-5 w-5 mr-2" />
                    <span>Choose Excel File</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".xlsx,.xls"
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: .xlsx, .xls
                </p>
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div className={`flex items-center justify-center space-x-2 p-4 rounded-md ${
                uploadStatus.includes('Error')
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : uploadStatus.includes('success')
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
              }`}>
                {isUploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-current" />
                ) : uploadStatus.includes('Error') ? (
                  <AlertCircle className="h-5 w-5" />
                ) : uploadStatus.includes('success') ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : null}
                <span>{uploadStatus}</span>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Instructions</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• File must be in Excel format (.xlsx or .xls)</li>
              <li>• First row should contain column headers</li>
              <li>• Required columns: Name, NDC, Class, Price</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};