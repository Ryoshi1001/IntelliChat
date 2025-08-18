// src/global.d.ts

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

// Extend the global Window interface if needed
declare global {
  interface Window {
    myCustomProperty?: string;
  }
}
