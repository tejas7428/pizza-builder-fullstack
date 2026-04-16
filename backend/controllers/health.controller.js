// @desc    Health check endpoint
// @route   GET /api/health
// @access  Public
export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Pizza Builder API is running smoothly!'
  });
};