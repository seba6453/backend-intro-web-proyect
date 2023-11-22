import axios from 'axios';

export async function fetchMemberOtherBackend(token: string, id_team: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(`http://localhost:3001/team/member/${id_team}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('El equipo no existe en el sistema.');
  }
}