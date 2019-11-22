export const createLead = (data, cb) => dispatch => {
    const config = {
      method: "post",
      url: `${BASE_API}/lead/create`,
      headers: {
        "Content-Type": "application/json"
      },
      data
    };
    makeApiCall(config, "CREATING_LEAD", cb, null, null, true);
  }

  export const fetchLeads = (service_provider_id, cb) => dispatch => {
    const config = {
      method: "get",
      url: `${BASE_API}/service-provider/providers/${service_provider_id}/leads`
    };
    makeApiCall(config, "FETCHING_LEADS", cb, null, null, true);
  };
  