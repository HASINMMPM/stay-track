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

export interface Stay {
  id: string;
  userId: string;
  location: string;
  checkIn: Date;
  checkOut?: Date;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStayRequest {
  location: string;
  checkIn: string;
  checkOut?: string;
}

export interface UpdateStayRequest {
  location?: string;
  checkIn?: string;
  checkOut?: string;
}
