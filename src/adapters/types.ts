export interface ServerResponse {
  token: string;
  data?: UserData;
}

interface UserAttributes {
  username: string;
  spotify_id?: string;
  refresh_token: string;
  access_token: string;
}

interface PlaylistAttributes {
  data: any;
}
interface UserData {
  id: string;
  attributes: UserAttributes;
  relationships: PlaylistAttributes;
}
