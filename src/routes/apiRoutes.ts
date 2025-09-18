import { Router } from 'express';
import authRoutes from './authRoutes';
import buildingRoutes from './buildingRoutes';
import leaseRoutes from './leaseRoutes';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/building', buildingRoutes);
apiRoutes.use('/lease', leaseRoutes);

export default apiRoutes;
