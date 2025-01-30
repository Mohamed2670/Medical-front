"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const mockData_1 = require("./mockData");
const API_BASE_URL = 'https://api.example.com';
exports.api = {
    login: async (email, password) => {
        if (email === 'test@example.com' && password === 'Test123!') {
            return { token: 'mock-jwt-token' };
        }
        throw new Error('Invalid credentials');
    },
    searchDrugsSuggestions: async (query) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        const results = mockData_1.mockDrugs.filter(drug => drug.name.toLowerCase().includes(query.toLowerCase()) ||
            drug.className.toLowerCase().includes(query.toLowerCase()) ||
            drug.ndc.some(code => code.includes(query)));
        return results;
    },
    searchDrugs: async (query) => {
        const results = mockData_1.mockDrugs.filter(drug => drug.name.toLowerCase().includes(query.toLowerCase()) ||
            drug.className.toLowerCase().includes(query.toLowerCase()));
        return results;
    },
    uploadDrugsExcel: async (file) => {
        // In a real implementation, this would send the file to the server
        // For now, we'll just return a success message
        return { message: 'File uploaded successfully' };
    },
    getInsuranceForDrug: async (drugId) => {
        return mockData_1.mockInsurances;
    },
    getDrugDetails: async (drugId, ndcCode) => {
        const drug = mockData_1.mockDrugs.find(d => d.id === drugId);
        if (!drug) {
            throw new Error('Drug not found');
        }
        return drug;
    },
    getPharmacySales: async () => {
        return mockData_1.mockPharmacySales;
    },
    getSalesAnalytics: async () => {
        const sales = mockData_1.mockPharmacySales;
        const analytics = {
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
