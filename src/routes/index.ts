import { Router } from 'express';

const router = Router();

// API routes will be defined here
router.get('/', (req, res) => {
  res.json({
    message: 'StayTrack API Routes',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

export default router;
