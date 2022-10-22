import pkg from '../../../package.json';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'Everything seems fine!',
    version: pkg.version,
  });
}
