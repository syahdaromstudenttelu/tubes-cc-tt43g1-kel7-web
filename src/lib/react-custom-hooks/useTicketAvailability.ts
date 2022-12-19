import axios from 'axios';
import { useState } from 'react';
import type { TicketAvailabilityProps } from '../../redux-app/slices/bookTicketAvailabilitySlice';
import { addBookTicketAvailability } from '../../redux-app/slices/bookTicketAvailabilitySlice';
import { useAppDispatch } from '../../redux-app/typed-hook/typedHooks';
import { useApiEndpoint } from './useApiEndpoint';

interface BookTicketAvailabilityDatesProps {
  ticketDate: string;
  ticketAvailability: TicketAvailabilityProps;
}

interface BookTicketAvailabilityProps {
  codeDestination: string;
  ticketDates: BookTicketAvailabilityDatesProps[];
}

interface ResBookTicketAvailabilityProps {
  status: string;
  data: BookTicketAvailabilityProps[];
}

export const useTicketAvailability = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { bookTicketAPI } = useApiEndpoint();
  const reduxDispatch = useAppDispatch();

  const updateTicketAvailability = async () => {
    try {
      const response = await axios.get(bookTicketAPI);
      const responseData = response.data;

      const bookTicketAvailability: ResBookTicketAvailabilityProps =
        responseData;

      const bookTicketAvailabilityData = bookTicketAvailability.data;

      setSuccess(() => true);
      reduxDispatch(addBookTicketAvailability(bookTicketAvailabilityData));
    } catch (error) {
      setError(() => true);
    }
  };

  return {
    success,
    error,
    updateTicketAvailability,
  };
};
