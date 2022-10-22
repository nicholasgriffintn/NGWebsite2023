import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  fetch(
    `https://api.github.com/users/nicholasgriffintn/repos?sort=updated&type=public&per_page=${
      req.query.limit || '8'
    }&page=${req.query.offset || '1'}`,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'Nicholas-Griffin-App',
      },
    }
  )
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
