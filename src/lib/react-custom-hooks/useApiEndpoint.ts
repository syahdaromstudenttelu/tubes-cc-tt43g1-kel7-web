import { useEffect, useState } from 'react';

export const useApiEndpoint = () => {
  const [bookTicketAPI, setBookTicketAPI] = useState('');
  const [bookedTicketsAPI, setBookedTicketsAPI] = useState('');

  useEffect(() => {
    const devAPI = 'http://localhost:3000/api';
    const prodAPI = 'https://tubes-cc-tt43g1-kel7-web.vercel.app/api';
    if (window.location.hostname === 'localhost') {
      setBookTicketAPI(() => `${devAPI}/bookTicket`);
      setBookedTicketsAPI(() => `${devAPI}/bookedTickets`);
    } else {
      setBookTicketAPI(() => `${prodAPI}/bookTicket`);
      setBookTicketAPI(() => `${prodAPI}/bookedTickets`);
    }
  }, []);

  return { bookTicketAPI, bookedTicketsAPI };
};
