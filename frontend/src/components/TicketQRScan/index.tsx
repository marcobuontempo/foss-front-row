import React, { useState } from 'react'
import './TicketQRScan.css'
import Html5QRcodePlugin from '@components/Html5QRcodePlugin'
import { Html5QrcodeResult } from 'html5-qrcode';
import { defaultTicketDetails } from '@components/TicketQRGenerator';
import TicketQRDisplay from '@components/TicketQRDisplay';

type Props = {}

export default function TicketQRScan({ }: Props) {
  const [ticket, setTicket] = useState(defaultTicketDetails);
  const [uid, setUid] = useState("");
  const [success, setSuccess] = useState(false);

  const onNewScanResult = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    const { uid, ...ticket } = JSON.parse(decodedText);
    // ensure data has been parsed correctly before storing
    if (
      uid &&
      ticket.eventid &&
      ticket.ticketid &&
      ticket.venue &&
      ticket.unixdatetime &&
      ticket.seat
    ) {
      setTicket(ticket);
      setUid(uid);
      setSuccess(true);
    }
  };

  const handleCheckInTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Checking in...")
    // POST request /scan
  }

  return (
    <div className='TicketQRScan'>
      {
        success ?
          <TicketQRDisplay ticket={ticket} isCheckin={true} handleCheckInTicket={handleCheckInTicket} />
          :
          <Html5QRcodePlugin qrCodeSuccessCallback={onNewScanResult} />
      }
    </div>
  )
}

// {"eventid":"65698383166a218cf09ae32d","ticketid":"65698383166a218cf09ae335","title":"TEST EVENT!!!","unixdatetime":1735650000000,"venue":"AUS","seat":"General Admission [GA]","uid":"44bc18e1cbc078e11c9bf20b2634faec041c6b509e628b6cb23277c8b593c2ec"}