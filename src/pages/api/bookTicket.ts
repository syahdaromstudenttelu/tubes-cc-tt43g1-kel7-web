import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type TicketShifts = 'morning' | 'afternoon';
type SitPos = '1' | '2' | '3' | '4' | '5';

interface BookTicketReqBodyProps {
  uidToken: string;
  bookTo: string;
  bookFrom: string;
  bookDate: string;
  bookShift: TicketShifts;
  bookSitPos: SitPos;
  bookPassangerName: string;
  bookPassangerPhone: string;
  bookTotalPayment: number;
}

interface PaidTicketReqBodyProps {
  uidToken: string;
  ticketId: string;
}

export default async function bookTicket(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const endpointAPI = `${process.env.BASE_URL_BOOK_TICKET}`;
    if (req.method === 'POST') {
      const bookTicketReqBody: BookTicketReqBodyProps = req.body;
      const responseAxios = await axios.post(endpointAPI, bookTicketReqBody);
      const responseData = responseAxios.data;

      res.status(responseAxios.status);
      res.json(responseData);
    } else if (req.method === 'GET') {
      const responseAxios = await axios.get(endpointAPI);
      const responseData = responseAxios.data;

      res.status(responseAxios.status);
      res.json(responseData);
    } else if (req.method === 'PATCH') {
      const paidTicketReqBody: PaidTicketReqBodyProps = req.body;
      const responseAxios = await axios.patch(endpointAPI, paidTicketReqBody);
      const responseData = responseAxios.data;

      res.status(responseAxios.status);
      res.json(responseData);
    } else {
      res.status(400);
      res.json({
        status: 'failed',
        message: 'Invalid HTTP method',
      });
    }
  } catch (error) {
    res.status(500);
    res.json({
      status: 'failed',
    });
  }
}
