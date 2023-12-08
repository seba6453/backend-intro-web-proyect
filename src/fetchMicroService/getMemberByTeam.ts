import axios from 'axios';
import { linkMSTeam } from 'src/config/constants';
import { Member } from 'src/proyect/entities/user.entity';

export async function fetchMemberOtherBackendByTeam(token: string, id_team: string): Promise<Member[]> {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(linkMSTeam.secret + `/member/${id_team}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Usuario no existe en el sistema.');
  }
}