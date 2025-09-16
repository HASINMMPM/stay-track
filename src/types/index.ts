// Global type definitions for the StayTrack API

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stay {
  id: string;
  userId: string;
  location: string;
  checkIn: Date;
  checkOut?: Date;
  duration?: number; // in hours
  createdAt: Date;
  updatedAt: Date;
}

// Request/Response types
export interface CreateStayRequest {
  location: string;
  checkIn: string; // ISO date string
  checkOut?: string; // ISO date string
}

export interface UpdateStayRequest {
  location?: string;
  checkIn?: string;
  checkOut?: string;
}
