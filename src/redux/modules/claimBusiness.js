const CLAIM = 'claimBusiness/CLAIM';
const CLAIM_SUCCESS = 'claimBusiness/CLAIM_SUCCESS';
const CLAIM_FAIL = 'claimBusiness/CLAIM_FAIL';
const GET_IMPRESSIONS = 'claimBusiness/GET_IMPRESSIONS';
const GET_IMPRESSIONS_SUCCESS = 'claimBusiness/GET_IMPRESSIONS_SUCCESS';
const GET_IMPRESSIONS_FAIL = 'claimBusiness/GET_IMPRESSIONS_FAIL';
const SAVE_CONTACT_LOADING = 'claimBusiness/SAVE_CONTACT_LOADING';
const SAVE_CONTACT_SUCCESS = 'claimBusiness/SAVE_CONTACT_SUCCESS';
const SAVE_CONTACT_FAILURE = 'claimBusiness/SAVE_CONTACT_FAILURE';
const CHANGE_LANGUAGE = 'claimBusiness/CHANGE_LANGUAGE';
const GET_CUST_PREF = 'claimBusiness/GET_CUST_PREF';
const GET_CUST_PREF_SUCCESS = 'claimBusiness/GET_CUST_PREF_SUCCESS';
const GET_CUST_PREF_FAIL = 'claimBusiness/GET_CUST_PREF_FAIL';
const GET_BPP_BRANDS = 'claimBusiness/GET_BPP_BRANDS';
const GET_BPP_BRANDS_SUCCESS = 'claimBusiness/GET_BPP_BRANDS_SUCCESS';
const GET_BPP_BRANDS_FAIL = 'claimBusiness/GET_BPP_BRANDS_FAIL';
const GET_SUBCATEGORIES = 'claimBusiness/GET_SUBCATEGORIES';
const GET_SUBCATEGORIES_SUCCESS = 'claimBusiness/GET_SUBCATEGORIES_SUCCESS';
const GET_SUBCATEGORIES_FAIL = 'claimBusiness/GET_SUBCATEGORIES_FAIL';
const ADD_OUTLET = 'claimBusiness/ADD_OUTLET';
const ADD_OUTLET_SUCCESS = 'claimBusiness/ADD_OUTLET_SUCCESS';
const ADD_OUTLET_FAIL = 'claimBusiness/ADD_OUTLET_FAIL';

const initialState = {
  submitted: false,
  contactLoading: true,
  contactLoaded: false, 
  language: "english"
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case CLAIM:
      return {
        ...state,
        submitting: true
      };
    case CLAIM_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        data: action.result
      };
    case CLAIM_FAIL:
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error
      };
      case GET_IMPRESSIONS:
      return {
        ...state,
        getting: true,
      }
      case GET_IMPRESSIONS_SUCCESS:
      return {
        ...state,
        getting: false,
        impressionsCount: action.result,
      }
      case GET_IMPRESSIONS_FAIL:
      return {
        ...state,
        getting: false,
      }
      case SAVE_CONTACT_LOADING :
        return {
          contactLoading: true,
          contactLoaded: false,
          err:''
        }
      case SAVE_CONTACT_SUCCESS :
        return {
          contactLoading: false,
          contactLoaded:true
        }
      case SAVE_CONTACT_FAILURE :
        return {
          contactLoading:false,
          contactLoaded:false,
          err:action.error
        }
      case CHANGE_LANGUAGE :
        window.localStorage.setItem('landingLanguage', action.payload);
        return {
          ...state,
          language: action.payload
        }
      case GET_CUST_PREF:
        return {
          ...state,
          gettingCustPref: true,
        }
      case GET_CUST_PREF_SUCCESS:
      return {
        ...state,
        gettingCustPref: false,
        customerPreference: action.result,
      }
      case GET_CUST_PREF_FAIL:
      return {
        ...state,
        gettingCustPref: false,
      }
      case GET_BPP_BRANDS:
        return {
          ...state,
          gettingBppBrands: true,
        }
      case GET_BPP_BRANDS_SUCCESS:
      return {
        ...state,
        gettingBppBrands: false,
        bppBrands: action.result,
      }
      case GET_BPP_BRANDS_FAIL:
      return {
        ...state,
        gettingBppBrands: false,
      }
      case GET_SUBCATEGORIES:
        return {
          ...state,
          gettingSubCategories: true,
        }
      case GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        gettingSubCategories: false,
        subCategories: action.result,
      }
      case GET_SUBCATEGORIES_FAIL:
      return {
        ...state,
        gettingSubCategories: false,
      }
      case ADD_OUTLET:
      return {
        ...state,
        addingOutlet: true,
        addedOutlet: false,
      }
      case ADD_OUTLET_SUCCESS:
      return {
        ...state,
        addingOutlet: false,
        addedOutlet: true,
      }
      case ADD_OUTLET_FAIL:
      return {
        ...state,
        addingOutlet: false,
        addedOutlet: true,
        error: action.error
      }
    default:
      return state;
  }
}

export function claimBusiness(storeinfo) {
  return {
    types: [CLAIM, CLAIM_SUCCESS, CLAIM_FAIL],
    promise: (client) => client.post('/claimBusiness', {
      data: { storeinfo }
    })
  };
}

export function getImpressions(merchantId) {
  return {
    types: [GET_IMPRESSIONS, GET_IMPRESSIONS_SUCCESS, GET_IMPRESSIONS_FAIL],
    promise: (client) => client.post('/getImpressions', {
      data: {merchantId}
    })
  }
}

export function saveMerchantContacts(name, phone, email, merchant_id, merchant_name,remarkType='basic', creationSource='portal' ) {
  return {
    types:[SAVE_CONTACT_LOADING, SAVE_CONTACT_SUCCESS, SAVE_CONTACT_FAILURE],
    promise: (client) => client.post('https://mcp.magicpin.in/mcp/merchant/contact/',{
      data: {
        merchant_id: merchant_id,
        merchant_name: merchant_name,
        phone:phone,
        name:name,
        email:email,
        remarketing_type:remarkType,
        creation_source:creationSource
      }
    })
  }
}

export function changeLanguage(value){
  return {
    type:CHANGE_LANGUAGE,
    payload:value
  }
}

export function getCustomerPreference(merchant_id,localityId) {
  return {
    types: [GET_CUST_PREF, GET_CUST_PREF_SUCCESS, GET_CUST_PREF_FAIL],
    promise: (client) => client.post('https://mcp.magicpin.in/mcp/merchant/customer/preference',{
      data: {
        merchant_id: merchant_id,
        locality_id: localityId
      }
    })
  }
}

export function getBppBrands(categoryId = 5) {
  return {
    types: [GET_BPP_BRANDS, GET_BPP_BRANDS_SUCCESS, GET_BPP_BRANDS_FAIL],
    promise: (client) => client.get('https://mcp.magicpin.in/mcp/merchant/bpp_brands',{
      params:{
        category_id: categoryId,
      }
    })
  }
}

export function addOutlet(payload) {
  const {outletName, contact, email, address, locality, pincode, link, createdBy, categoryId, subCategory, fileSelected, city, state, landingSource, timingsInJson} = payload;

  let data = new FormData();

  if(fileSelected && fileSelected != "")
    data.append('file', fileSelected);
  
  data.append('outlet_name', outletName);
  data.append('phone', contact);
  data.append('email', email);
  data.append('address', address);
  data.append('sub_category',subCategory);
  data.append('locality',locality);
  data.append('website_link', link);
  data.append('pin_code',pincode);
  data.append('city', city);
  data.append('state', state);
  data.append('created_by', createdBy);
  data.append('category_id', categoryId);
  data.append('country', 'India');
  data.append('landing_source', landingSource);
  data.append('timings', timingsInJson)
  
  return {
    types: [ADD_OUTLET, ADD_OUTLET_SUCCESS, ADD_OUTLET_FAIL],
    promise: (client) => client.post('https://mcp.magicpin.in/mcp/merchant/new_details/',{
      data
    })
  }
}


export function getSubCategories() {
  return {
    types: [GET_SUBCATEGORIES, GET_SUBCATEGORIES_SUCCESS, GET_SUBCATEGORIES_FAIL],
    promise: (client) => client.get('https://aryan.magicpin.in/merchant/getSubCategories')
  }
}
