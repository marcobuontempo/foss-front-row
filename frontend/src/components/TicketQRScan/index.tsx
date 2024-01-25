import React, { useState } from 'react'
import './TicketQRScan.css'
import Html5QRcodePlugin from '@components/Html5QRcodePlugin'
import { Html5QrcodeResult } from 'html5-qrcode';
import { defaultTicketDetails } from '@components/TicketQRGenerator';
import TicketQRDisplay from '@components/TicketQRDisplay';
import { consumeTicket } from '@services/api';
import { toast } from 'react-toastify';

type Props = {}

export default function TicketQRScan({ }: Props) {
  const [ticket, setTicket] = useState(defaultTicketDetails);
  const [uid, setUid] = useState("");
  const [scanSuccess, setScanSuccess] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const onNewScanResult = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    const { uid, ...ticket } = JSON.parse(decodedText);
    // ensure data has been parsed correctly before storing
    if (
      uid &&
      ticket.id &&
      ticket.event &&
      ticket.title &&
      ticket.venue &&
      ticket.unixdatetime &&
      ticket.seat
    ) {
      setTicket(ticket);
      setUid(uid);
      setScanSuccess(true);
    }
  };

  const handleCheckInTicket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Update ticket in database
    await consumeTicket(ticket.event, ticket.id, uid)
      .then(response => {
        setCheckInSuccess(true);
        toast.success("Ticket Successfully Consumed!")
      })
      .catch(error => {
        let message = "Cannot process ticket!";
        if (error.response.status === 422) {
          setCheckInSuccess(true);
          message = "Ticket already consumed!"
        }
        toast.error(message);
      })
  }

  return (
    <div className='TicketQRScan'>
      {
        scanSuccess ?
          <TicketQRDisplay ticket={ticket} isScanned={true} handleCheckInTicket={handleCheckInTicket} checkInSuccess={checkInSuccess} />
          :
          <Html5QRcodePlugin qrCodeSuccessCallback={onNewScanResult} />
      }
    </div>
  )
}