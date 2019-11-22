const currentServiceProvider = createReducer(currentProviderState, {
    FETCHING_LEADS_SUCCESS: (state, payload) => {
      return {
        ...state,
        leads: payload.data.leads,
        leads_total: payload.data.total_count
      };
    },
    CREATING_LEAD_SUCCESS: (state, payload) => {
      console.log(payload.data)
      return {
        ...state,
        leads: payload.data,
        leads_total: payload.data.length
      }
    },
    FETCHING_CURRENT_SERVICE_PROVIDER_SUCCESS: (state, payload) => {
      return {
        ...state,
        ...payload.data,
      };
    }
  });
  
  // Service providers available for selection
  const serviceProviders = createReducer(serviceProviderState, {
    FETCHING_SERVICE_PROVIDERS_SUCCESS: (state, payload) => {
      return {
        ...state,
        ...payload.data
      };
    }
  });
  
  export { currentServiceProvider, serviceProviders };
  