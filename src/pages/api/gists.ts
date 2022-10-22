import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  fetch('https://api.github.com/users/nicholasgriffintn/gists', {
    method: 'GET',
    headers: {
      'User-Agent': 'Nicholas-Griffin-App',
    },
  })
    .then((json) => {
      return json.json();
    })
    .then((data) => {
      res.setHeader('Cache-Control', 'max-age=180000');
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(405).json(error);
    });
}
