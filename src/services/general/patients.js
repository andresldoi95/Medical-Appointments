import axios from '@/http/oauth2-axios';

const urlOauth2 = import.meta.env.VITE_OAUTH2_API;
const endpoint = '/patients';


function create(patientData) {
  return axios.post(urlOauth2 + endpoint, patientData);
}

async function show(id) {
  return await axios.get(urlOauth2 + endpoint + '/' + id);
}

function update(id, patientData) {
  return axios.put(urlOauth2 + endpoint + '/' + id, patientData);
}

async function destroy(id) {
  return await axios.delete(urlOauth2 + endpoint + '/' + id);
}

const patientsService = { create, show, update, destroy };

export default patientsService;
