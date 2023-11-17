import axios from 'axios';

export async function fetchTeamOtherBackend(token: string, uniqueCode: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(`http://localhost:3001/team/${uniqueCode}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Team no existe en el sistema.');
  }
}