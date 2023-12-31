import axios from 'axios';
import { linkMSTeam } from 'src/config/constants';

export async function fetchTeamOtherBackend(token: string, uniqueCode: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(linkMSTeam.secret +`/${uniqueCode}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Team no existe en el sistema.');
  }
}