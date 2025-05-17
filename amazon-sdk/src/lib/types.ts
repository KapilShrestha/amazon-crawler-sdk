export interface Product {
    title: string;
    price: string | null;
    asin: string;
    image: string;
    rating: string | null;
    url: string;
  }
  
  export interface SearchResult {
    totalResults: number;
    products: Product[];
    currentPage: number;  // Added this property
  }