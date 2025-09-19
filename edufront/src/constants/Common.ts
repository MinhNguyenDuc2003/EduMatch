import {
  BookOpen,
  BookText,
  Building2,
  Calculator,
  DollarSign,
  GraduationCap,
  LogIn,
  Search,
} from 'lucide-react';
import { title } from 'process';

export const ToastVariant = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};
export const ResponseStatus = {
  CREATED: 201,
  SUCCESS: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};
export const ResponseTitle = {
  NOT_FOUND: 'Not Found',
  BAD_REQUEST: 'Bad Request',
};
export const HAVE_BEEN_DELETED = ' have been deleted';
export const DELETE_FAILED = 'Delete failed';
export const UPDATE_SUCCESSFULLY = 'Update successfully';
export const CREATE_SUCCESSFULLY = 'Create successfully';
export const UPDATE_FAILED = 'Update failed';
export const CREATE_FAILED = 'Create failed';
export const ADD_PRODUCT_INTO_WAREHOUSE_SUCCESSFULLY = 'Add product(s) into warehouse successfully';
export const TOAST_DURATION = 4000;
export const CUSTOMER_URL = '/customers';
export const COUNTRY_URL = '/location/countries';
export const STATE_OR_PROVINCE_URL = '/location/state-or-provinces';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 0;
export const FORMAT_DATE_YYYY_MM_DD_HH_MM = 'YYYYMMDDHHmmss';

//Column header to export for product
export const mappingExportingProductColumnNames = {
  id: 'Id',
  name: 'Product Name',
  shortDescription: 'Short Description',
  description: 'Description',
  specification: 'Specification',
  sku: 'SKU',
  gtin: 'GTIN',
  slug: 'Slug',
  isAllowedToOrder: 'Allowed Order',
  isPublished: 'Published',
  isFeatured: 'Featured',
  isVisible: 'Visible',
  stockTrackingEnabled: 'Stock Tracking Enabled',

  price: 'Price',
  brandId: 'Brand Id',
  brandName: 'Brand Name',
  metaTitle: 'Meta Title',
  metaKeyword: 'Meta Keyword',
  metaDescription: 'Meta Description',
};

export const studentMenuItems = [
  {
    title: 'Scholarship Directory',
    description: 'Find scholarships by category.',
    icon: BookOpen,
    href: '/scholarships',
  },
  {
    title: 'College Search',
    description: "Find the college that's right for you.",
    icon: Search,
    href: '/colleges',
  },
  {
    title: 'Student Resources',
    description: 'Top resources for your scholarship journey.',
    icon: GraduationCap,
    href: '/resources',
  },
  {
    title: 'College Matches',
    description: 'Personalized list of colleges that fit you.',
    icon: Building2,
    href: '/matches',
  },
  {
    title: 'Student Loans',
    description: 'Explore loan options to help pay for college.',
    icon: DollarSign,
    href: '/loans',
  },
  {
    title: 'Calculators',
    description: 'Calculate your cost to attend college.',
    icon: Calculator,
    href: '/calculators',
  },
];

export const scholarshipProviderMenuItems = [
  {
    title: 'Submit Scholarship',
    description: 'share your scholarship with eligibility students.',
    icon: BookOpen,
    href: '/provider/scholarships/create',
  },
  {
    title: 'Provider Log In',
    description: 'Log in to your provider account.',
    icon: LogIn,
    href: '/provider/login',
  },
  {
    title: 'Guidelines ',
    description: 'Guidelines for submitting scholarships.',
    icon: BookText,
    href: '/provider/guidelines',
  },
];
