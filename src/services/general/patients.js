import axios from '@/http/oauth2-axios';

const urlOauth2 = import.meta.env.VITE_OAUTH2_API;
const endpoint = '/patients';


function create(patientData) {
  return axios.post(urlOauth2 + endpoint, patientData);
}


const patientsService = { create };

export default patientsService;
