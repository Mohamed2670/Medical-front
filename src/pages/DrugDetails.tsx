import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pill, AlertCircle, Repeat } from 'lucide-react';
import { api } from '../api/api';
import { Drug } from '../types';

export const DrugDetails: React.FC = () => {
  const { drugId } = useParams();
  const [searchParams] = useSearchParams();
  const ndcCode = searchParams.get('ndc');
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      if (!drugId || !ndcCode) return;
      
      try {
        const drugData = await api.getDrugDetails(drugId, ndcCode);
        setDrug(drugData);
      } catch (err) {
        setError('Failed to load drug details');
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [drugId, ndcCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !drug) {
    return (
      <div className="text-center text-red-600 p-8">
        <AlertCircle className="h-12 w-12 mx-auto mb-4" />
        <p>{error || 'Drug not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <Pill className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">{drug.name}</h1>
              <p className="text-blue-100">NDC: {ndcCode}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Drug Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Drug Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Class Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{drug.className}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{drug.description}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Alternatives */}
          {drug.alternatives.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Repeat className="h-5 w-5 mr-2" />
                Alternative Medications
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {drug.alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-gray-900">{alt.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Class: {alt.className}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};