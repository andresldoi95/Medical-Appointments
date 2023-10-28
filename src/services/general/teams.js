import axios from '@/http/oauth2-axios';

const urlOauth2 = import.meta.env.VITE_OAUTH2_API;


function getUserTeams() {
  return axios.get(urlOauth2 + '/teams/' + localStorage.getItem('userId'));
}


const teamsService = { getUserTeams };

export default teamsService;
