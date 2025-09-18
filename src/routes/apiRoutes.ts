import { Router } from 'express';
import authRoutes from './authRoutes';
import buildingRoutes from './buildingRoutes';
import leaseRoutes from './leaseRoutes';
import paymentRoutes from './paymentRoutes';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/building', buildingRoutes);
apiRoutes.use('/lease', leaseRoutes);
apiRoutes.use('/payment', paymentRoutes);

export default apiRoutes;
