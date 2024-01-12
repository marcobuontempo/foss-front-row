import { Html5QrcodeCameraScanConfig, Html5QrcodeScanner, QrcodeSuccessCallback } from 'html5-qrcode';
import { useEffect } from 'react';
import './Html5QRcodePlugin.css'


type Props = {
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
}

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: { [key: string]: any }) => {
  let config: Html5QrcodeCameraScanConfig = {
    fps: undefined,
    qrbox: undefined,
    aspectRatio: undefined,
    disableFlip: undefined,
    videoConstraints: undefined,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

export default function Html5QRcodePlugin({ qrCodeSuccessCallback, fps = 10, qrbox, aspectRatio = 1.0, disableFlip }: Props) {
  useEffect(() => {
    const verbose = false;
    const config = createConfig({ fps, qrbox, aspectRatio, disableFlip });

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(qrCodeSuccessCallback, undefined);
    
    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div id={qrcodeRegionId} className='Html5QRcodePlugin w-100' />
  )
}