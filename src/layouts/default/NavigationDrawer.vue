<template>
  <v-navigation-drawer :model-value="appStore.openedDrawer" app clipped hide-overlay>
    <v-list-item
      prepend-icon="mdi-medical-cotton-swab"
      :title="appName"
      :subtitle="userStore.name"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item
      :active="teamStore.isSelected"
      @click="expandTeams = !expandTeams"
      link
      prepend-icon="mdi-account-multiple"
      :append-icon="
        !teamStore.isSelected || (teamStore.isSelected && teamStore.teams.length > 1)
          ? expandTeams
            ? 'mdi-menu-left'
            : 'mdi-menu-right'
          : ''
      "
      :title="teamStore.currentTeamName"
    >
      <v-list-item
        @click="setCurrentTeam(team)"
        v-show="teamStore.currentTeamId != team.id && expandTeams"
        link
        v-for="team in teamStore.teams"
        :key="team.id"
        :title="team.name"
      ></v-list-item>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      prepend-icon="mdi-view-dashboard"
      :active="router.currentRoute.value.name === 'Home'"
      link
      :to="{ name: 'Home' }"
      title="Dashboard"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item
      v-if="teamStore.isSelected"
      prepend-icon="mdi-account-injury"
      :active="router.currentRoute.value.name === 'Patients'"
      link
      :to="{ name: 'Patients' }"
      title="Patients"
    ></v-list-item>
    <v-list-item
      v-if="teamStore.isSelected"
      prepend-icon="mdi-calendar-check"
      link
      :to="{ name: 'Appointments' }"
      title="Appointments"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { useTeamStore } from "@/store/team";
import teamsService from "@/services/general/teams";
import router from "@/router";
import { ref } from "vue";
const userStore = useUserStore();
const appStore = useAppStore();
const appName = import.meta.env.VITE_APP_NAME;
const teamStore = useTeamStore();

const loadTeams = () => {
  if (teamStore.teams.length === 0) {
    teamsService.getUserTeams().then(({ data }) => {
      teamStore.setTeams(data);
    });
  }
};

const setCurrentTeam = (team) => {
  teamStore.setCurrentTeam({
    id: team.id,
    name: team.name,
  });
  localStorage.setItem("currentTeamId", team.id);
  localStorage.setItem("currentTeamName", team.name);
};

if (teamStore.teams.length === 0) {
  loadTeams();
}

if (!teamStore.isSelected && localStorage.getItem("currentTeamId")) {
  teamStore.setCurrentTeam({
    id: localStorage.getItem("currentTeamId"),
    name: localStorage.getItem("currentTeamName"),
  });
}

const expandTeams = ref(false);
</script>
