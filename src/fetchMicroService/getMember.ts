import axios from 'axios';
import { linkMSAuth } from 'src/config/constants';

export async function fetchMemberOtherBackend(token: string, id_team: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(linkMSAuth + `/member/${id_team}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('El equipo no existe en el sistema.');
  }
}