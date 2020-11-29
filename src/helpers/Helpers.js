import ImageTools from './ImageTools';
import { get, ACTOR_ID, ORIGIN_SOURCE, REFERRAL } from './LocalStorageHelper';
import React from 'react'
import moment from 'moment';
import {POP_UPS, userTypes, defaultErrorMessage, countries, countriesInfo, days} from '../constants';
const request = require('superagent');

export function currencyString(amount, country = countries.INDIA, precisionValue = 2){
  const currency = countriesInfo[country.toUpperCase()].symbol;

  amount = Number(amount)
  if(isNaN(amount) || !isFinite(amount)) return `${currency} ${amount}`;
  
  if(amount < 0 )
    return `-${currency}` + Math.abs(amount).toLocaleString(countriesInfo[country.toUpperCase()].locale, { minimumFractionDigits: precisionValue, maximumFractionDigits: precisionValue});
  return `${currency}` + amount.toLocaleString(countriesInfo[country.toUpperCase()].locale, { minimumFractionDigits: precisionValue, maximumFractionDigits: precisionValue});
}

export function changeFromINR(amount, country){
  switch(country.toUpperCase()){
    case countries.INDONESIA:
      return amount * 200;
    default:
      return amount;
  }
}

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function getCountryCode(country = countries.INDIA){
  return countriesInfo[country.toUpperCase()].abbr;
}

export function getCurrencySymbol(country = countries.INDIA){
  return countriesInfo[country.toUpperCase()].symbol;
}

export function compactCurrencyString(amount, country = countries.INDIA, precisionValue = 2, maxSkipValue = 0){
  const currency = countriesInfo[country.toUpperCase()].symbol;

  amount = Number(amount)
  if(isNaN(amount) || !isFinite(amount)) return `${currency} ${amount}`;
  
  if(amount < 0 )
    return `-${currency}` + compactNumericString(Math.abs(amount), country, precisionValue, maxSkipValue);
  return `${currency}` + compactNumericString(amount, country, precisionValue, maxSkipValue);
}

export function numericString(amount, country = countries.INDIA, precisionValue = 2){
  amount = Number(amount)
  if(isNaN(amount) || !isFinite(amount)) return amount;
  return amount.toLocaleString(countriesInfo[country.toUpperCase()].locale, { maximumFractionDigits: precisionValue });
}

export function compactNumericString(amount, country = countries.INDIA, precisionValue = 2, maxSkipValue = 0 ){
  amount = Number(amount)
  if(isNaN(amount) || !isFinite(amount)) return amount;
  
  let str = '';
  if(amount < 0){ str = '-'; amount *= -1; }

  country = country.toUpperCase();
  switch(country){
    case countries.INDIA:
      if(amount >= 10**7 && amount > maxSkipValue) str += (amount/10**7).toLocaleString(countriesInfo.INDIA.locale, { maximumFractionDigits: precisionValue}) + ' Cr';
      else if(amount >= 10**5 && amount > maxSkipValue) str += (amount/10**5).toLocaleString(countriesInfo.INDIA.locale, { maximumFractionDigits: precisionValue}) + ' Lacs';
      else if (amount >= 10**3 && amount > maxSkipValue) str += (amount/10**3).toLocaleString(countriesInfo.INDIA.locale, { maximumFractionDigits: precisionValue}) +' K';
      else str += amount.toLocaleString(countriesInfo.INDIA.locale, { maximumFractionDigits: precisionValue});
      break;
    case countries.INDONESIA:
      if(amount >= 10**12 && amount > maxSkipValue) str += (amount/10**12).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) + ' T';
      else if(amount >= 10**9 && amount > maxSkipValue) str += (amount/10**9).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) + ' M';
      else if(amount >= 10**6 && amount > maxSkipValue) str += (amount/10**6).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) + ' Jt';
      else if(amount >= 10**4 && amount > maxSkipValue) str += (amount/10**3).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) + ' Rb';
      else str += amount.toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue});
      break;
    default:
      if(amount >= 10**9 && amount > maxSkipValue) str += (amount/10**9).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue})+' B'
      else if(amount >= 10**6 && amount > maxSkipValue) str += (amount/10**6).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) + ' M'
      else if (amount >= 10**3 && amount > maxSkipValue) str += (amount/10**3).toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue}) +' K'
      else str += amount.toLocaleString(countriesInfo[country].locale, { maximumFractionDigits: precisionValue});
      break;
  }

  return str;
}

// Use this for view count, impression count, click count etc.
export function customCompactNumericString(amount, precisionValue = 2, maxSkipValue = 0 ){
  amount = Number(amount)
  if(isNaN(amount) || !isFinite(amount)) return amount;
  
  let str = '';
  if(amount < 0){ str = '-'; amount *= -1; }

    if(amount >= 10**9 && amount > maxSkipValue) str += (amount/10**9).toLocaleString("en-US",{ maximumFractionDigits: precisionValue})+' B'
    else if(amount >= 10**6 && amount > maxSkipValue) str += (amount/10**6).toLocaleString("en-US",{ maximumFractionDigits: precisionValue}) + ' M'
    else if (amount >= 10**3 && amount > maxSkipValue) str += (amount/10**3).toLocaleString("en-US",{ maximumFractionDigits: precisionValue}) +' K'
    else str += amount.toLocaleString("en-US",{ maximumFractionDigits: precisionValue});

  return str;
}

export function convertNth(n){
  if(n%10 == 1) return n.toString() + 'st';
  if(n%10 == 2) return n.toString() + 'nd';
  if(n%10 == 3) return n.toString() + 'rd';
  return n.toString() + 'th';
}

export function getBrowserInfo(){
  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName  = navigator.appName;
  var fullVersion  = ''+parseFloat(navigator.appVersion); 
  var majorVersion = parseInt(navigator.appVersion,10);
  var nameOffset,verOffset,ix;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
  browserName = "Opera";
  fullVersion = nAgt.substring(verOffset+6);
  if ((verOffset=nAgt.indexOf("Version"))!=-1) 
    fullVersion = nAgt.substring(verOffset+8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
  browserName = "Microsoft Internet Explorer";
  fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome" 
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
  browserName = "Chrome";
  fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version" 
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
  browserName = "Safari";
  fullVersion = nAgt.substring(verOffset+7);
  if ((verOffset=nAgt.indexOf("Version"))!=-1) 
    fullVersion = nAgt.substring(verOffset+8);
  }
  // In Firefox, the true version is after "Firefox" 
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
  browserName = "Firefox";
  fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent 
  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
            (verOffset=nAgt.lastIndexOf('/')) ) 
  {
  browserName = nAgt.substring(nameOffset,verOffset);
  fullVersion = nAgt.substring(verOffset+1);
  if (browserName.toLowerCase()==browserName.toUpperCase()) {
    browserName = navigator.appName;
  }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1)
    fullVersion=fullVersion.substring(0,ix);
  if ((ix=fullVersion.indexOf(" "))!=-1)
    fullVersion=fullVersion.substring(0,ix);

  majorVersion = parseInt(''+fullVersion,10);
  if (isNaN(majorVersion)) {
  fullVersion  = ''+parseFloat(navigator.appVersion); 
  majorVersion = parseInt(navigator.appVersion,10);
  }
  return {
    browser_name  : browserName,
    full_version  : fullVersion,
    major_version : majorVersion,
    app_name : navigator.appName,
    user_agent : navigator.userAgent
  }
}

window.requestIdleCallback = window.requestIdleCallback || function (handler) {
  let startTime = Date.now();

  return setTimeout(function () {
      handler({
          didTimeout: false,
          timeRemaining: function () {
              return Math.max(0, 50.0 - (Date.now() - startTime));
          }
      });
  }, 1);
};

window.cancelIdleCallback = window.cancelIdleCallback || function (id) {
  clearTimeout(id);
};

export function sendEvent(event){
  if(process.env.NODE_ENV === 'development') return
 var event = {
    actor_type: 'merchant',
    timestamp: Date.now(),  //in milliseconds
    count: 1,
    utm_source: 'merchant_portal',
    url: window.location.href,
    actor_id_ref: get(ACTOR_ID),
    ...event
  }

  if(!event.actor_id){
    event.actor_id = get(ACTOR_ID) || (10000000 + parseInt(Math.floor(Math.random() * 10000000) + 1))
    event.entity_type = 'merchant_logout'
    event.origin_source = get(ORIGIN_SOURCE)
    event.extra = JSON.stringify({
      'merchant_claim_name':localStorage.getItem('landingName') || '',
      'merchant_phone':localStorage.getItem('landingPhone') || '',
      'merchant_email':localStorage.getItem('landingEmail') || '',
      'merchant_name': localStorage.getItem('landingMerchant') ||'',
      'merchant_locality': localStorage.getItem('landingLocality')||'',
      'merchant_city': localStorage.getItem('landingCity')||'',
      'merchant_country': localStorage.getItem('landingCountry')||'',
      'merchant_langugae': localStorage.getItem('landingLanguage')||'',
      ...getBrowserInfo()
    })
    event.merchant_claim_name = localStorage.getItem('landingName') || ''
    event.merchant_phone = localStorage.getItem('landingPhone') || ''
    event.merchant_email = localStorage.getItem('landingEmail') || ''
    event.merchant_name = localStorage.getItem('landingMerchant') ||''
    event.merchant_locality = localStorage.getItem('landingLocality')||''
    event.merchant_city = localStorage.getItem('landingCity')||''
    event.merchant_country = localStorage.getItem('landingCountry')||''
    event.merchant_langugae = localStorage.getItem('landingLanguage')||''
    if(get(REFERRAL))
      event.referrerId = get(REFERRAL)
  }

  requestIdleCallback((deadline) => {
      request.post('https://magicpin.in/api/postEvent')
      .send({event})
      .end()
    },{timeout:100}
  )
}

export function createMCPLog(event){
    if(process.env.NODE_ENV === 'development') return
    var event = {
        utm_source: 'merchant_portal',
        ...event
    }
    requestIdleCallback((deadline) => {
        request.post('https://magicpin.in/api/createMCPLog')
        .send(event)
        .end()
    },{timeout:300})
}

export function logErrorToServer(merchantId, error, errorInfo, isFatal=false){
  if(process.env.NODE_ENV === 'development'){
    console.error(error)
    return
  }
  let event={
    entity_type : 'error',
    event:'merchant_portal_error',
    extra: JSON.stringify({error, errorInfo}),
    actor_id:merchantId || 'default',
    isFatal: isFatal,
  }
    sendEvent(event)
}

window.sendEvent = sendEvent;

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
};

export function compressToBlob(file) {
  return new Promise((resolve, reject) => {
    // console.log('uploading', file)

    // check if file size is small enough
    if(file.size < 250*1024) return resolve(file);

    ImageTools.resize(file, (blob, success) => {
      if(blob) return resolve(blob);
      return reject(file);
    });
  });
}

export function compressToFile(file){
  return new Promise((resolve, reject)=>{
    compressToBlob(file).then(blob=>{
      const file = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now()
      });
      resolve(file)
    })
    .catch(err=>reject(err))
  })
}

export function loadScript(src, globalObjPresent){
  return new Promise((resolve, reject) => {
    if (globalObjPresent == 'google' && typeof window.google === 'object' && typeof window.google.maps === 'object') return resolve()
    if(globalObjPresent && typeof globalObjPresent === 'object') return resolve();
    var script = document.createElement('script');
    script.src =  src;
    script.async = false;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', (err) => reject(err));
    document.body.appendChild(script);
  });
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
  
export function getPlaceHolder(state, placeholder){
  if(!state || !placeholder){
    return 'अपने स्टोर के विषय में लिखे'
  }
  const stateLanguages={
    "andaman & nicobar islands":"bengali",
    "andhra pradesh":"telugu",
    "arunachal pradesh":"bengali",
    "assam":"hindi",
    "bihar":"hindi",
    "chandigarh":"punjabi",
    "chhattisgarh":"hindi",
    "dadra & nagar haveli":"gujarati",
    "delhi":"hindi",
    "daman & dui":"gujarati",
    "goa":"hindi",
    "gujarat":"gujarati",
    "haryana":"hindi",
    "himachal pradesh":"hindi",
    "jammu and kashmir":"hindi",
    "jharkhand":"hindi",
    "karnataka":"kannada",
    "kerala":"malayalam",
    "lakshadweep":"malayalam",
    "madhya pradesh":"hindi",
    "maharashtra":"marathi",
    "manipur":"hindi",
    "meghalaya":"bengali",
    "mizoram":"bengali",
    "nagaland":"bengali",
    "odisha":"oriya",
    "puducherry":"tamil",
    "punjab":"punjabi",
    "rajasthan":"hindi",
    "sikkim":"nepali",
    "tamil nadu":"tamil",
    "telangana":"telugu",
    "tripura":"bengali",
    "uttar pradesh":"hindi",
    "uttarakhand":"hindi",
    "west bengal":"bengali",
    "indonesia":"bahasa"
  }
  switch(placeholder){
    case 'placeholder':
      switch(stateLanguages[state.toLowerCase()]){
        case "bengali":
          return 'আপনার দোকান সম্পর্কে লিখুন'
        case "telugu":
          return 'మీ స్టోర్ గురించి వ్రాయండి'
        case "punjabi":
          return 'ਆਪਣੇ ਸਟੋਰ ਬਾਰੇ ਲਿਖੋ'
        case "gujarati":
          return 'તમારા સ્ટોર વિશે લખો'
        case "kannada":
          return 'ನಿಮ್ಮ ಅಂಗಡಿಯ ಬಗ್ಗೆ ಬರೆಯಿರಿ'
        case "malyalam":
          return 'നിങ്ങളുടെ സ്റ്റോറിനെക്കുറിച്ച് എഴുതുക'
        case "marathi":
          return 'आपल्या स्टोअरबद्दल लिहा'
        case "tamil":
          return 'உங்கள் கடை பற்றி எழுதுங்கள்'
        case "nepali":
          return 'तपाईंको स्टोरको बारेमा लेख्नुहोस्'
        case "bahasa":
          return "Tulis tentang outlet Anda"
        default:
          return 'अपने स्टोर के विषय में लिखे'
    }
    default:
      return 'अपने स्टोर के विषय में लिखे'
  }
}

export function scrollTo(element, top, left, duration, easingFunction) {
  try{
    let startTop = element.scrollTop;
    let startLeft = element.scrollLeft;
    let changeTop = top - startTop;
    let changeLeft = left - startLeft;
    let currentTime = 0;
    let increment = 20;
        
    const animateScroll = function(){        
        currentTime += increment;
        let valTop = easingFunction(null, currentTime, startTop, changeTop, duration);
        let valLeft = easingFunction(null, currentTime, startLeft, changeLeft, duration);
        element.scrollTop = valTop;
        element.scrollLeft = valLeft;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }
  catch(err){
    console.log(err)
  }
}

export function changeTranslator(keyword){
  switch(keyword){
    case 'hindi_generic_merchant_remarketing':
      document.cookie = "googtrans=/en/hi; path=/";
      break
  }
}

export function scrollBy(element, direction, value, duration=200, easingFunction){
  switch(direction.toLowerCase()){
    case 'left':
      return scrollTo(element, 0, element.scrollLeft - value, duration, easingFunction)
    case 'right':
      return scrollTo(element, 0, element.scrollLeft + value, duration, easingFunction)
    case 'up':
      return scrollTo(element, element.scrollTop - value, 0, duration, easingFunction)
    case 'down':
      return scrollTo(element, element.scrollTop + value, 0, duration, easingFunction)
    default:
      return
  }
}

export function exportCsv(titleRow, Data, fileName='MagicpinData.csv'){
  let csv = titleRow+'\n';
  Data.forEach(function(row) {
      csv += row.join(',');
      csv += "\n";
  });
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();

}

export function exportCsvFromGoogleChart(chartInstance, fileName='MagicpinData.csv'){
  exportCsv(chartInstance.props.columns.map(column => column.label),
          chartInstance.props.rows,
          fileName
)
}

export function hasNumber(myString) {
  return /^\d+$/g.test(myString);
}

export function isValidPhone(phone) {
  return /^\d{9,15}$/g.test(phone);
}

export function isValidGst(gst){
  const gstRegExpression = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegExpression.test(gst.toUpperCase());
}
export function isValidIfsc(ifsc){
  const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
  return ifscRegex.test(ifscRegex);
}

export function isValidEmail(email){
  const emailRegex = /^[a-zA-Z._0-9\-]+@([a-zA-Z_0-9\-]+\.)+\w+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password){
  const passwordRegex=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.*){6,20}$/;
  return passwordRegex.test(password);
}

export function extractHashtag(node, Index){
  if(node.type === 'tag' && node.name === 'tag'){
    return <span key={Index} style={{color:'#458eff', cursor:'pointer', fontFamily:'robotobold'}}>{node.attribs.name}</span>
  }
}

export function generateArrayOfDates(startDate, endDate, format="YYYY-MM-DD"){
  endDate = moment(endDate, format)
  startDate = moment(startDate, format).subtract(1, 'days')
  let period = endDate.diff(startDate, 'days')
  let ans=[]
  for(let i=0;i < period; i+=1) ans.push(startDate.add(1, 'days').format(format))
  return ans
}

export function generateArrayOfYears(startDate, endDate, format="YYYY"){
  endDate = moment(endDate, format)
  startDate = moment(startDate, format).subtract(365, 'days')
  let period = endDate.diff(startDate, 'days')
  let ans=[]
  for(let i=0;i < period; i+=1) ans.push(startDate.add(365, 'days').format(format))
  return ans
}

export function groupDataTableByTime(dataTable, time, inputFormat='YYYY-MM-DD'){
  //time any one of day,date, week, month
  if(!['day','date','week','month', 'year'].includes(time)){
    console.error(time ,' is unsupported parameter')
  }
  switch(time){
    case 'day':
      return {format:'dddd', data:groupbyFormat({dataTable, outputFormat:'dddd', inputFormat})}
    case 'date':
      return {format:'YYYY-MM-DD', data:dataTable.map(row=>[moment(row[0], inputFormat).toDate(),...row.slice(1,)])}
    case 'week':
      return {format:'YYYY-MM-DD', data: groupByInterval({dataTable, interval: 7, inputFormat:'YYYY-MM-DD',outputFormat:'YYYY-MM-DD'})}
    case 'month':
      return {format:'MMM-YY',data:groupbyFormat({dataTable, outputFormat:'MMM-YY', inputFormat})}
    case 'year':
      return {format:'YYYY', data: groupByInterval({dataTable, interval: 365, inputFormat:'YYYY-MM-DD',outputFormat:'YYYY'})}
    }
}

function groupbyFormat({dataTable, inputFormat, outputFormat}){
  let groupedData =  dataTable.reduce((agg, row)=>{
    let date=moment(row[0], inputFormat).format(outputFormat)
    if(agg[date]){
      row.slice(1,).forEach((ele, idx)=>agg[date][idx]+=ele)
    }
    else agg[moment(row[0], inputFormat).format(outputFormat)]=row.slice(1,)
    return agg;
  },{})
  return Object.keys(groupedData).map(time=>[moment(time, outputFormat).toDate(),...groupedData[time]])
}

function groupByInterval({dataTable, interval, inputFormat, outputFormat}){
  let ans = []
  for(let i=0; i<dataTable.length; i+=interval){
    let row=[]
    // row.push(dataTable[i][0])
    row.push(...dataTable.slice(i, i+interval).reduce((agg, row)=>{
      row.slice(1,).forEach((val, idx)=>agg[idx+1]+=val)
      // debugger
      return agg
    }))
    ans.push(row)
  }
  return ans.map(row=>[moment(row[0], inputFormat).toDate(), ...row.slice(1,)])
}

export function hardRefresh(){
  if ('serviceWorker' in navigator) {
    if(navigator.serviceWorker.getRegistrations)
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        if (registrations.length) {
          for(let registration of registrations) {
            registration.unregister();
          }
        }
      });
    else if (navigator.serviceWorker.getRegistration)
      navigator.serviceWorker.getRegistration().then(function (registration) {
        if (registration) {
          registration.unregister();
        }
      });
  }
  window.location.reload(true);
}

//this check should be last condition because it will prevent from opening popup on same day
export function showPopup(popupName){
  if(!POP_UPS.includes(popupName)){
    return false
  }
  if(moment().format("YYYY-MM-DD") !== localStorage.getItem(popupName)){
    localStorage.setItem(popupName,moment().format('YYYY-MM-DD'))
    return true
  }
  return false
}

//this check should be last condition because it will prevent from opening popup for 2 days
export function showPopupAfter2days(popupName){
  if(!POP_UPS.includes(popupName)){
    return false
  }

  if(!localStorage.getItem(popupName))
  {
    localStorage.setItem(popupName,moment().add(2,'days').format('YYYY-MM-DD'))
  }
  if(moment().format("YYYY-MM-DD") === localStorage.getItem(popupName)){
    localStorage.setItem(popupName,moment().add(2,'days').format('YYYY-MM-DD'))
    return true
  }
  return false
}

export function getUserTypeFromDesignation(designation){
  if(!designation) return userTypes.MERCHANT;  // for now if no desination: treat as merchant

  switch(designation.toUpperCase()){
    case 'OWNER': return userTypes.MERCHANT;
    case 'MANAGER': return userTypes.MERCHANT_MANAGER;
    case 'EMPLOYEE': return userTypes.MERCHANT_EMPLOYEE;
    default: return userTypes.MERCHANT;
  }
}

export function Flex({onClick, style={}, alignItems='center', justifyContent='center',children, rootClassName="", HtmlTag='div', column, row, rowReverse, columnReverse}){
  let flexDirection
  if(column) flexDirection="column"
  if(row) flexDirection="row"
  if(rowReverse) flexDirection="row-reverse"
  if(columnReverse) flexDirection="column-reverse"
  return <HtmlTag onClick={onClick || null} className={rootClassName} style={{...style, display:'flex', flexDirection:flexDirection || undefined, alignItems, justifyContent}}>{children}</HtmlTag>
}

export function Grid({HtmlTag='div', style={}, rows, columns, rowGap='16px', columnGap='16px', rootClassName="", children}){
  return <HtmlTag className={rootClassName} style={{...style, display:'grid', gridTemplateRows:rows, gridTemplateColumns: columns, gridRowGap:rowGap, gridColumnGap: columnGap}}>{children}</HtmlTag>
}

export function getDefaultError(){
  return defaultErrorMessage
}

export function sortDescending(arr, keyString){
  return  arr.sort(( a, b ) => (a[keyString] >= b[keyString] ? -1 : 1));
}


export function generateHash(accessToken){
     let mod=1000000007
     let hash=0
     for(let i=0;i<accessToken.length;i++){
        if(accessToken[i] >= 'a' && accessToken[i]<='f'){
          hash=(hash*11+(accessToken.charCodeAt(i) -87))%mod
        }
        else{
          hash=(hash*11+(Number(accessToken[i])))%mod
        }
     }
     return hash
}

export function convertTimeToAmPm(time) {
  if (!time) {
    return time
  }
  let timeSplit = time.toString().split(":")
  if (timeSplit.length !== 2) {
    return time
  }
  let hour = Number(timeSplit[0])
  let amPm = (hour < 12 || hour === 24) ? " am" : " pm"
  return (hour % 12 || 12) + ":" + timeSplit[1] + amPm
}

export function convertTimeToReadableFormat(timingsData) {
  if (!timingsData) {
    return "Timings not set"
  }
  let timings = timingsData
  let result = ""
  let keys = Object.keys(timings)
  for (let i=0; i<days.length;i++) {
    let index = keys.indexOf(days[i])
    if (index < 0) {
      timings[days[i]] = {
        start: "00:00",
        end: "00:00"
      }
    }
  }

  for (let i=0; i<days.length;i++) {
    let startDay = days[i]
    let endDay = days[i]
    let startTime = timings[startDay].start
    let endTime = timings[startDay].end

    while (i < days.length-1 && startTime === timings[days[i+1]].start && endTime === timings[days[i+1]].end)  {
      i++
    }

    endDay = days[Math.min(i, days.length-1)]

    result += (startDay !== endDay ? startDay.substr(0,3)+" - "+endDay.substr(0,3) : startDay.substr(0,3)) + ": "
    if (startTime === endTime) {
      result += "Closed"
    } else {
      result += convertTimeToAmPm(startTime) + "- " + convertTimeToAmPm(endTime)
    }
    if (i !== days.length - 1) {
      result += ", "
    }
  }
  return result
}

export function convertTimingsForOnboarding(timings) {
  if (!timings) {
    return {}
  }
  let result = {}
  timings.forEach((timing) => {
    if (!timing || !timing.time_slots || timing.time_slots.length <= 0) {
      return
    }
    let firstLetter = timing.day.substr(0, 1)
    let rest = timing.day.substr(1).toLowerCase()
    let day = firstLetter + rest
    result[day] = {
      start: timing.time_slots[0].opentime.substr(0, 5),
      end: timing.time_slots[0].closetime.substr(0, 5)
    }
  })
  return result
}


