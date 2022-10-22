import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(500).json({
    status: 'Error',
    message: 'Sorry, there is no longer hosted within the site.',
  });
}
