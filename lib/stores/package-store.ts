import { create } from "zustand";

export interface PackageItem {
  id: string;
  name: string;
  accountSize: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  profitSplit: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
}

const defaultPackages: PackageItem[] = [
  {
    id: "1",
    name: "Starter",
    accountSize: 10000,
    originalPrice: 99,
    discountedPrice: 49,
    discountPercentage: 50,
    profitSplit: "80%",
    features: ["$10,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
    isPopular: false,
    isActive: true,
  },
  {
    id: "2",
    name: "Standard",
    accountSize: 25000,
    originalPrice: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    profitSplit: "80%",
    features: ["$25,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
    isPopular: false,
    isActive: true,
  },
  {
    id: "3",
    name: "Professional",
    accountSize: 50000,
    originalPrice: 299,
    discountedPrice: 199,
    discountPercentage: 33,
    profitSplit: "85%",
    features: ["$50,000 Account", "85% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
    isPopular: true,
    isActive: true,
  },
  {
    id: "4",
    name: "Elite",
    accountSize: 100000,
    originalPrice: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    profitSplit: "90%",
    features: ["$100,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
    isPopular: false,
    isActive: true,
  },
  {
    id: "5",
    name: "Master",
    accountSize: 200000,
    originalPrice: 899,
    discountedPrice: 599,
    discountPercentage: 33,
    profitSplit: "90%",
    features: ["$200,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
    isPopular: false,
    isActive: true,
  },
];

interface PackageStore {
  packages: PackageItem[];
  addPackage: (pkg: Omit<PackageItem, "id">) => void;
  updatePackage: (id: string, data: Partial<PackageItem>) => void;
  deletePackage: (id: string) => void;
  toggleActive: (id: string) => void;
  /** Returns only active packages for the marketing page */
  getActivePackages: () => PackageItem[];
}

export const usePackageStore = create<PackageStore>((set, get) => ({
  packages: defaultPackages,

  addPackage: (pkg) =>
    set((state) => ({
      packages: [...state.packages, { ...pkg, id: Date.now().toString() }],
    })),

  updatePackage: (id, data) =>
    set((state) => ({
      packages: state.packages.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),

  deletePackage: (id) =>
    set((state) => ({
      packages: state.packages.filter((p) => p.id !== id),
    })),

  toggleActive: (id) =>
    set((state) => ({
      packages: state.packages.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ),
    })),

  getActivePackages: () => get().packages.filter((p) => p.isActive),
}));
