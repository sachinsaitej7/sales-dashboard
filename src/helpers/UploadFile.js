import { get, MERCHANT_ID, SOURCE } from './LocalStorageHelper.js';
import { compressToBlob } from './Helpers.js';
import { sendEvent, hasNumber } from './Helpers.js';
import { toast } from 'react-toastify';

var FileName = undefined;
export function sendAnalyticsEvent(name, imageUrl, check_number) {
  let eventobj = {
    event: name,
    page_type: 'payment_fos',
    subject_merchant_id: get(MERCHANT_ID) || '',
    utm_campaign: get(SOURCE),
    utm_source: 'fos',
    cheque_number: check_number ? check_number : ""
  }
  if (imageUrl)
    eventobj['uploaded_url'] = imageUrl
  if (FileName)
    eventobj['file_name'] = FileName
  sendEvent(eventobj)
}

export function uploadFile(file, cb) {
  var formData = new FormData();
  formData.append('image', file);
  formData.append('bucket', 'mp_merac')
  fetch('https://magicpin.in/sam-api/merchant/contact/upload_cheque/', {
    method: 'POST',
    body: formData
  }).then((res) => {
    if (!res.ok) {
      cb(false, false);
      toast.error('Looks like the image you chose is not editable. Try to clear cache or choose another')
      sendAnalyticsEvent('upload_failed')
    }
    else return res.json()
  }).then((uploadUrl) => {
    if (uploadUrl) {
      cb(false, true, file.name, uploadUrl)
      console.log(uploadUrl);
      FileName = file.name
      sendAnalyticsEvent('upload_success', uploadUrl)
    }
  }).catch((err) => {
    cb(false, false)
    toast.error('Network error. Please ensure you are connected to the internet')
    sendAnalyticsEvent('upload_failed')
  });
}

export default function uploadCheque(file, cb) {
  cb(true);
  compressToBlob(file).then(blob => {
    uploadFile(blob, cb)
  }).catch((err) => {
    uploadFile(file, cb)
  })
  sendAnalyticsEvent('upload_attempted')
}