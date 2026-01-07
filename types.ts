
export interface NavItem {
  label: string;
  href: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  hours: string;
  features: string[];
}
