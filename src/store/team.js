import { defineStore } from 'pinia';

export const useTeamStore = defineStore('team', {
  state: () => {
    return {
      teams: [],
      currentTeamId: '',
      currentTeamName: 'Select a team',
      isSelected: false
     };
  },
  actions: {
    setCurrentTeam(team) {
      this.currentTeamId = team.id;
      this.currentTeamName = team.name;
      this.isSelected = this.currentTeamId !== '' && this.currentTeamId !== null;
    },
    setTeams(teams) {
      this.teams = teams;
    }
  },
  getters: {

  }
})
