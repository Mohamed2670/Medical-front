import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { api } from '../api/api';
import { Drug, Insurance } from '../types';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [selectedNdc, setSelectedNdc] = useState<string>('');

  const handleSearch = async () => {
    // If we have a selected drug and NDC, navigate to details
    if (selectedDrug && selectedNdc) {
      navigate(`/drug/${selectedDrug.id}?ndc=${selectedNdc}`);
      return;
    }

    // Otherwise, perform drug search
    try {
      const results = await api.searchDrugs(searchQuery);
      setDrugs(results);
      setSelectedDrug(null);
      setInsurances([]);
      setSelectedInsurance(null);
      setSelectedNdc('');
    } catch (error) {
      console.error('Error searching drugs:', error);
    }
  };

  const handleDrugSelect = async (drug: Drug) => {
    setSelectedDrug(drug);
    try {
      const insuranceList = await api.getInsuranceForDrug(drug.id);
      setInsurances(insuranceList);
    } catch (error) {
      console.error('Error fetching insurance:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Drug Search</h1>
        
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a drug..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Drug Results */}
          {drugs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Results</h2>
              <div className="grid gap-4">
                {drugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleDrugSelect(drug)}
                    className={`p-4 border rounded-md text-left hover:bg-gray-50 ${
                      selectedDrug?.id === drug.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{drug.name}</h3>
                    <p className="text-sm text-gray-500">Class: {drug.className}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Insurance Selection */}
          {insurances.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Select Insurance</h2>
              <select
                value={selectedInsurance?.id || ''}
                onChange={(e) => {
                  const insurance = insurances.find(i => i.id === e.target.value);
                  setSelectedInsurance(insurance || null);
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select insurance...</option>
                {insurances.map((insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* NDC Selection */}
          {selectedDrug && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Select NDC</h2>
              <select
                value={selectedNdc}
                onChange={(e) => setSelectedNdc(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select NDC code...</option>
                {selectedDrug.ndc.map((ndc) => (
                  <option key={ndc} value={ndc}>
                    {ndc}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          {selectedDrug && selectedNdc && (
            <button
              onClick={handleSearch}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View Drug Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};