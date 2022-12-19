import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function bookedTickets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const endpointAPI = `${process.env.BASE_URL_BOOKED_TICKETS}`;
    if (req.method === 'GET') {
      const { uidToken } = req.query;
      const responseAxios = await axios.get(endpointAPI, {
        params: {
          uidToken,
        },
      });
      const responseData = responseAxios.data;

      res.status(responseAxios.status);
      res.json(responseData);
    } else {
      res.status(400);
      res.json({
        status: 'Invalid HTTP method',
      });
    }
  } catch (error) {
    res.status(500);
    res.json({
      status: 'failed',
    });
  }
}
