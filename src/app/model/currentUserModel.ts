import { Buffer } from 'buffer';
export class CurrentUserModel{
  jwtToken: string = '';
  userInfo: Partial<{
    username: string;
    names: string;
    perfil: string;
    unidad:string;

  }> = {};



  constructor(payload: any) {

    this.jwtToken = payload.data.access_token;

    function jwt_decode(jwtToken: string) {
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(Buffer.from(base64, 'base64').toString());
    }

    let datadecode=jwt_decode(this.jwtToken);
    this.userInfo = {

      username: datadecode['USER'],
      names: datadecode['nombres'],
    };


  }
}
