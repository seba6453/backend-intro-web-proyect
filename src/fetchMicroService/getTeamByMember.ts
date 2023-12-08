import axios from 'axios';
import { linkMSTeam } from 'src/config/constants';
import { Team } from 'src/team/entity/team.entity';

export async function fetchTeamOtherBackendByMember(token: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(linkMSTeam.secret, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Usuario no existe en el sistema.');
  }
}