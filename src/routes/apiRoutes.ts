import { Router } from 'express';
import authRoutes from './authRoutes';
import buildingRoutes from './buildingRoutes';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/building', buildingRoutes);

export default apiRoutes;
