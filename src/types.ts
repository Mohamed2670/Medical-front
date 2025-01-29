export interface Drug {
  id: string;
  name: string;
  className: string;
  ndc: string[];
  description: string;
  netPrice: number;
  alternatives: Drug[];
  pricing: {
    [insuranceId: string]: {
      insuranceCoverage: number;
      patientPay: number;
    };
  };
}

export interface Insurance {
  id: string;
  name: string;
  coverageDetails: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PharmacySale {
  id: string;
  pharmacyId: string;
  pharmacyName: string;
  drugId: string;
  drugName: string;
  salePrice: number;
  netPrice: number;
  quantity: number;
  date: string;
  insuranceId: string;
  insuranceName: string;
}

export interface SalesAnalytics {
  totalSales: number;
  totalScripts: number;
  totalRevenue: number;
  belowNetPriceCount: number;
  salesByDrug: {
    [drugName: string]: {
      scripts: number;
      revenue: number;
    };
  };
}