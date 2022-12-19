import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { ticketExpChecker } from '../lib/ticketExpChecker';
import {
  setBookDate,
  setBookFrom,
  setBookPassangerName,
  setBookPassangerPhone,
  setBookShift,
  setBookSitPos,
  setBookTo,
  setBookTotalPayment,
  setTicketId,
} from '../redux-app/slices/bookTicketSlice';
import type { BookedTicketProps } from '../redux-app/slices/userBookedTicketsSlice';
import { useAppDispatch } from '../redux-app/typed-hook/typedHooks';
import { PrimaryButton } from './buttons';

export default function BookedTicketCard({
  bookedTicketData,
}: {
  bookedTicketData: BookedTicketProps;
}) {
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();

  const disableButtonPay = () => {
    if (bookedTicketData.paidOff) return true;

    if (
      ticketExpChecker(
        bookedTicketData.bookedShift,
        bookedTicketData.bookedDate
      ) === true
    )
      return true;

    return false;
  };

  const onBtnPay = () => {
    if (bookedTicketData.paidOff) return;
    reduxDispatch(setTicketId(bookedTicketData.ticketId));
    reduxDispatch(setBookFrom(bookedTicketData.destination.from));
    reduxDispatch(setBookTo(bookedTicketData.destination.to));
    reduxDispatch(setBookDate(bookedTicketData.bookedDate));
    reduxDispatch(setBookShift(bookedTicketData.bookedShift));
    reduxDispatch(setBookSitPos(bookedTicketData.sitPos));
    reduxDispatch(setBookPassangerName(bookedTicketData.passangerName));
    reduxDispatch(setBookPassangerPhone(bookedTicketData.passangerPhone));
    reduxDispatch(setBookTotalPayment(bookedTicketData.totalPayment));
    nextRouter.push('/ticket-payment');
  };

  return (
    <div className="rounded-md bg-gray-200 p-4">
      <div className="mb-4">
        <p>
          <span className="font-bold">(ID Tiket)</span>{' '}
          {bookedTicketData.ticketId}
        </p>

        <p>
          <span className="font-bold">(Tanggal Tiket)</span>{' '}
          {format(new Date(bookedTicketData.bookedDate), 'dd-MM-yyyy')}
        </p>

        <p>
          <span className="font-bold">(Tanggal Tiket)</span>{' '}
          {bookedTicketData.bookedShift === 'morning'
            ? 'Pagi (08.00)'
            : 'Sore (16.00)'}
        </p>

        <p>
          <span className="font-bold">(Tujuan)</span>{' '}
          {bookedTicketData.destination.from} ke{' '}
          {bookedTicketData.destination.to}
        </p>

        <p>
          <span className="font-bold">(No. Kursi)</span>{' '}
          {bookedTicketData.sitPos}
        </p>

        <p>
          <span className="font-bold">(Nama)</span>{' '}
          {bookedTicketData.passangerName}
        </p>

        <p>
          <span className="font-bold">(No. Telepon)</span>{' '}
          {bookedTicketData.passangerPhone}
        </p>

        <p>
          <span className="font-bold">(Total Pembayaran)</span>{' '}
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(bookedTicketData.totalPayment)}
        </p>

        <p>
          <span className="font-bold">(Status Pembayaran)</span>{' '}
          {bookedTicketData.paidOff ? 'LUNAS' : 'BELUM LUNAS'}
        </p>
      </div>

      <PrimaryButton onClick={onBtnPay} disabled={disableButtonPay()}>
        {ticketExpChecker(
          bookedTicketData.bookedShift,
          bookedTicketData.bookedDate
        ) === false &&
          bookedTicketData.paidOff &&
          'Sudah Lunas'}

        {ticketExpChecker(
          bookedTicketData.bookedShift,
          bookedTicketData.bookedDate
        ) === false &&
          !bookedTicketData.paidOff &&
          'Bayar'}

        {ticketExpChecker(
          bookedTicketData.bookedShift,
          bookedTicketData.bookedDate
        ) && 'Tiket Hangus'}
      </PrimaryButton>
    </div>
  );
}
