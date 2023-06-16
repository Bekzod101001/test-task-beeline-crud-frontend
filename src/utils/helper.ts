
export function getScrollBarWidth() {
  const el: HTMLDivElement = document.createElement('div');
  el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
  document.body.appendChild(el);
  const width: number = el.offsetWidth - el.clientWidth;
  el.remove();
  return width;
}

export function imageMapperFromStorage(fileName: string, prefix: string = 'partners') {
  const baseUrl = `https://my.agrobank.uz/storage/${prefix}`
  const firstLetter = fileName.charAt(0)
  const seperatedFileName = fileName.split('.')
  const fileExtension = seperatedFileName[seperatedFileName.length - 1]
  const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '')

  return `${baseUrl}/${firstLetter}/${fileNameWithoutExtension}/default.${fileExtension}`
}

export function uuidv4() {
  const ho = (n: any, p: any) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
  const data = crypto.getRandomValues(new Uint8Array(16)); /// Fill the buffer with random data
  data[6] = (data[6] & 0xf) | 0x40; /// Patch the 6th byte to reflect a version 4 UUID
  data[8] = (data[8] & 0x3f) | 0x80; /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
  const view = new DataView(data.buffer); /// Create a view backed by a 16-byte buffer
  return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
}

export function deepClone(data: Object) {
  return JSON.parse(JSON.stringify(data));
}

export function getCardTypeByPan(pan: string) {
  let res = pan.slice(0, 4)

  return res === '8600' ? 'uzcard' : res === '9860' ? 'humo' : ''
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function generateRandomID (length: number = 4) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function inputNumbersOnly (event: KeyboardEvent) {
  const charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    return event.preventDefault();
  }
  return true;
}

export function clearSpacesFromNumbers (value: string) {
  return value.replace(/\D+/g, '')
}

export function checkBankCardValidity(number: string | number) {
  return clearSpacesFromNumbers(String(number)).length === 16
}

export function checkPhoneNumberValidity(number: string | number) {
  const unFormattedNumber:string = clearSpacesFromNumbers(String(number));

  if(!unFormattedNumber.startsWith('998')) return false;

  return unFormattedNumber.length === 12;
}

let clonedValue = '';
export function sendRequestIfValid() {
  const check = (value: string) => {
    const unFormattedValue = clearSpacesFromNumbers(value);

    if(clonedValue === unFormattedValue) return false;

    clonedValue = unFormattedValue;

    return true;
  }
  const clear = () => {
    clonedValue = ''
  }

  return {
    check, clear
  }
}

export function addLeadingZero(number: number): string {
  if(number < 10) return `0${number}`;

  return `${number}`;
}