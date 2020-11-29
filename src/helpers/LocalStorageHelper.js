export const COUNTRY = 'landingCountry'
export const CITY = 'landingCity'
export const EMAIL = 'landingEmail'
export const LOCALITY = 'landingLocality'
export const MERCHANT = 'landingMerchant'
export const MERCHANT_ID = 'landingMerchantId'
export const MERCHANT_LOGO = 'landingMerchantLogo'
export const MERCHANT_RATING = 'landingMerchantRating'
export const MERCHANT_REVIEWS = 'landingMerchantReviews'
export const NAME = 'landingName'
export const PHONE = 'landingPhone'
export const SOURCE = 'landingSource'
export const ACTOR_ID = 'session_actor_id'
export const SOURCE_SET_TIME = 'sourceSetTime'
export const CATEGORY_ID = 'category_id'
export const ORIGIN_SOURCE = 'landingOriginSource'
export const REFERRAL = 'referral'
export const AGENT_ID = 'agentId'
export const PRIVILEGE_ACTIVATED = 'privilegeActivated'



export function setCookie(key, value) {
  if (key === SOURCE) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 172800;
    now.setTime(expireTime);
    document.cookie = key + "=" + value + ";expires=" + now.toGMTString()
  }
  else
    document.cookie = key + "=" + value
}

export function getCookie(key) {
  let arr = document.cookie.split(';')
  let keyVal = ''
  let str = ''
  for (let ind in arr) {
    str = arr[ind] ? String(arr[ind]) : ''
    keyVal = str.split('=')
    if (keyVal[0] && String(keyVal[0]) && keyVal[0].trim() === key)
      return keyVal[1]
  }
  return ''
}

export function set(key, value) {
  if (!localStorage) {
    if (key === SOURCE || key === ACTOR_ID) {
      setCookie(key, value)
    }
    return
  }
  localStorage.setItem(key, value)
}

export function get(key) {
  if (!localStorage) {
    if (key === SOURCE || key === ACTOR_ID) {
      return getCookie(key)
    }
    return
  }
    return localStorage.getItem(key)
}

export function remove(key) {
  if (!localStorage) {
    // if (key === SOURCE || key === ACTOR_ID) {
    //   return getCookie(key)
    // }
    return
  }
    return localStorage.removeItem(key);
}

function timeOutLandingSource() {
  if (get(SOURCE) && get(SOURCE_SET_TIME)) {
    let diff = (Date.now() - get(SOURCE_SET_TIME)) / (1000 * 60 * 60 * 24)
    if (diff !== undefined && diff > 2) {
      localStorage.removeItem(SOURCE)
    }
  }
  else if (get(SOURCE) && !get(SOURCE_SET_TIME)) {
    set(SOURCE_SET_TIME, Date.now())
  }
}

export function setSource(value) {
  if(get(SOURCE) === 'custom'){
    timeOutLandingSource()
  }
  if(!get(SOURCE) || (value !== 'direct' && get(SOURCE) !== 'custom')){
    set(SOURCE, value);
    set(SOURCE_SET_TIME, Date.now())
  }
  setOriginSource(value)
}

export function setOriginSource(source){
  if (get(ORIGIN_SOURCE))
    return
  set(ORIGIN_SOURCE, source)
}

export function setActorId(){
  set(ACTOR_ID, 10000000 + parseInt(Math.floor(Math.random() * 10000000) + 1 ))
}