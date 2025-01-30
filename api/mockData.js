"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPharmacySales = exports.mockInsurances = exports.mockDrugs = void 0;
exports.mockDrugs = [
    {
        id: "d1",
        name: "Lisinopril",
        className: "ACE Inhibitor",
        ndc: ["00093-0130-01", "00093-0130-05", "00093-0130-10"],
        description: "Used to treat high blood pressure and heart failure",
        netPrice: 45.99,
        pricing: {
            "i1": { insuranceCoverage: 35.99, patientPay: 10.00 },
            "i2": { insuranceCoverage: 20.99, patientPay: 25.00 },
            "i3": { insuranceCoverage: 30.99, patientPay: 15.00 }
        },
        alternatives: [
            {
                id: "d2",
                name: "Enalapril",
                className: "ACE Inhibitor",
                ndc: ["00186-0930-01"],
                description: "Alternative ACE inhibitor for blood pressure",
                netPrice: 42.99,
                pricing: {
                    "i1": { insuranceCoverage: 32.99, patientPay: 10.00 },
                    "i2": { insuranceCoverage: 17.99, patientPay: 25.00 },
                    "i3": { insuranceCoverage: 27.99, patientPay: 15.00 }
                },
                alternatives: []
            }
        ]
    },
    {
        id: "d3",
        name: "Metformin",
        className: "Biguanide",
        ndc: ["00378-0053-01", "00378-0053-05"],
        description: "First-line medication for type 2 diabetes",
        netPrice: 35.99,
        pricing: {
            "i1": { insuranceCoverage: 25.99, patientPay: 10.00 },
            "i2": { insuranceCoverage: 10.99, patientPay: 25.00 },
            "i3": { insuranceCoverage: 20.99, patientPay: 15.00 }
        },
        alternatives: [
            {
                id: "d4",
                name: "Glipizide",
                className: "Sulfonylurea",
                ndc: ["00781-1577-01"],
                description: "Alternative diabetes medication",
                netPrice: 32.99,
                pricing: {
                    "i1": { insuranceCoverage: 22.99, patientPay: 10.00 },
                    "i2": { insuranceCoverage: 7.99, patientPay: 25.00 },
                    "i3": { insuranceCoverage: 17.99, patientPay: 15.00 }
                },
                alternatives: []
            }
        ]
    }
];
exports.mockInsurances = [
    {
        id: "i1",
        name: "HealthFirst Plus",
        coverageDetails: "Tier 1 Coverage - $10 copay"
    },
    {
        id: "i2",
        name: "MediCare Complete",
        coverageDetails: "Tier 2 Coverage - $25 copay"
    },
    {
        id: "i3",
        name: "BlueShield Premium",
        coverageDetails: "Tier 1 Coverage - $15 copay"
    }
];
exports.mockPharmacySales = [
    {
        id: "s1",
        pharmacyId: "p1",
        pharmacyName: "HealthMart Pharmacy",
        drugId: "d1",
        drugName: "Lisinopril",
        salePrice: 42.99,
        netPrice: 45.99,
        quantity: 30,
        date: "2024-03-15",
        insuranceId: "i1",
        insuranceName: "HealthFirst Plus"
    },
    {
        id: "s2",
        pharmacyId: "p2",
        pharmacyName: "MediCare Pharmacy",
        drugId: "d1",
        drugName: "Lisinopril",
        salePrice: 47.99,
        netPrice: 45.99,
        quantity: 25,
        date: "2024-03-14",
        insuranceId: "i2",
        insuranceName: "MediCare Complete"
    },
    {
        id: "s3",
        pharmacyId: "p3",
        pharmacyName: "Community Drugs",
        drugId: "d3",
        drugName: "Metformin",
        salePrice: 33.99,
        netPrice: 35.99,
        quantity: 40,
        date: "2024-03-15",
        insuranceId: "i3",
        insuranceName: "BlueShield Premium"
    }
];
