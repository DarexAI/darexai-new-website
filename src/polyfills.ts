// Global polyfills for browser compatibility
// This file ensures compatibility between Node.js dependencies and browser environments

// Polyfill for global in browser environments
if (typeof global === 'undefined') {
  (window as any).global = globalThis;
}

// Ensure process.env exists in browser environments
if (typeof process === 'undefined') {
  (window as any).process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'production',
    },
  };
}

// Buffer polyfill for browser environments (if needed)
if (typeof Buffer === 'undefined') {
  (window as any).Buffer = class Buffer {
    static from(data: any): ArrayBuffer {
      if (typeof data === 'string') {
        return new TextEncoder().encode(data).buffer;
      }
      return data;
    }
    
    static isBuffer(): boolean {
      return false;
    }
  };
}

export {};