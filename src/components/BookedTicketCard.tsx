import type { MouseEvent } from 'react';
import { PrimaryButton } from './buttons';

interface BookedTicketCardProps {
  bookedTicketData: {
    ticketId: string;
    bookedDate: string;
    destination: {
      to: string;
      from: string;
    };
    sitPos: number;
    passangerName: string;
    passangerPhone: string;
    totalPayment: number;
    paidOff: boolean;
  };

  onBtnPay?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function BookedTicketCard({
  bookedTicketData,
  onBtnPay = () => {},
}: BookedTicketCardProps) {
  return (
    <div className="rounded-md bg-gray-200 p-4">
      <div className="mb-4">
        <p>
          <span className="font-bold">(ID Tiket)</span>{' '}
          {bookedTicketData.ticketId}
        </p>

        <p>
          <span className="font-bold">(Tanggal Tiket)</span>{' '}
          {bookedTicketData.bookedDate}
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

      <PrimaryButton onClick={onBtnPay} disabled={bookedTicketData.paidOff}>
        {bookedTicketData.paidOff ? 'Sudah Lunas' : 'Bayar'}
      </PrimaryButton>
    </div>
  );
}
