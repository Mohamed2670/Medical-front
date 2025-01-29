import axios from 'axios';
import { Drug, Insurance, PharmacySale, SalesAnalytics } from '../types';
import { mockDrugs, mockInsurances, mockPharmacySales } from './mockData';

// Test credentials:
// Email: test@example.com
// Password: Test123!

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

export const api = {
  login: async (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'Test123!') {
      return { token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },

  searchDrugs: async (query: string) => {
    const results = mockDrugs.filter(drug => 
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.className.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  },

  getInsuranceForDrug: async (drugId: string) => {
    return mockInsurances;
  },

  getDrugDetails: async (drugId: string, ndcCode: string) => {
    const drug = mockDrugs.find(d => d.id === drugId);
    if (!drug) {
      throw new Error('Drug not found');
    }
    return drug;
  },

  getPharmacySales: async () => {
    return mockPharmacySales;
  },

  getSalesAnalytics: async (): Promise<SalesAnalytics> => {
    const sales = mockPharmacySales;
    const analytics: SalesAnalytics = {
      totalSales: sales.reduce((sum, sale) => sum + sale.quantity, 0),
      totalScripts: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0),
      belowNetPriceCount: sales.filter(sale => sale.salePrice < sale.netPrice).length,
      salesByDrug: {}
    };

    sales.forEach(sale => {
      if (!analytics.salesByDrug[sale.drugName]) {
        analytics.salesByDrug[sale.drugName] = {
          scripts: 0,
          revenue: 0
        };
      }
      analytics.salesByDrug[sale.drugName].scripts++;
      analytics.salesByDrug[sale.drugName].revenue += sale.salePrice * sale.quantity;
    });

    return analytics;
  }
};