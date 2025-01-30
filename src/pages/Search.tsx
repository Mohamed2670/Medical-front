import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import debounce from 'debounce';
import { api } from '../api/api';
import { Drug, Insurance } from '../types';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Drug[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [selectedNdc, setSelectedNdc] = useState<string>('');

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length >= 2) {
        const results = await api.searchDrugsSuggestions(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSearch = async () => {
    if (selectedDrug && selectedNdc) {
      navigate(`/drug/${selectedDrug.id}?ndc=${selectedNdc}`);
      return;
    }

    try {
      const results = await api.searchDrugs(searchQuery);
      setDrugs(results);
      setSelectedDrug(null);
      setInsurances([]);
      setSelectedInsurance(null);
      setSelectedNdc('');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error searching drugs:', error);
    }
  };

  const handleDrugSelect = async (drug: Drug) => {
    setSelectedDrug(drug);
    setSearchQuery(drug.name);
    setShowSuggestions(false);
    try {
      const insuranceList = await api.getInsuranceForDrug(drug.id);
      setInsurances(insuranceList);
    } catch (error) {
      console.error('Error fetching insurance:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Drug Search</h1>
        
        <div className="space-y-6">
          {/* Search Input with Suggestions */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                placeholder="Search for a drug..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
                {suggestions.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleDrugSelect(drug)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{drug.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{drug.className}</div>
                    </div>
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      ${drug.netPrice.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Drug Results */}
          {drugs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Results</h2>
              <div className="grid gap-4">
                {drugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleDrugSelect(drug)}
                    className={`p-4 border rounded-md text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedDrug?.id === drug.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">{drug.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Class: {drug.className}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Insurance Selection */}
          {insurances.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Select Insurance</h2>
              <select
                value={selectedInsurance?.id || ''}
                onChange={(e) => {
                  const insurance = insurances.find(i => i.id === e.target.value);
                  setSelectedInsurance(insurance || null);
                }}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Select NDC</h2>
              <select
                value={selectedNdc}
                onChange={(e) => setSelectedNdc(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              View Drug Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};