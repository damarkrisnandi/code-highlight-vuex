import { URL_API } from "../constants";
import { kirimData, dapatkanOpsi, unduhKode } from './index'

export class UserService {
    setUrl(url) {
        return `${URL_API}/user/${url}`
    }
    login(username) {
        const url = this.setUrl('login');
    
          return kirimData(url, {
            name: username
          });
    }
    register(username) {
        const url = this.setUrl('register');
    
          return kirimData(url, {
            name: username
          });
    }


}

export class CodeService {
    get() {
        return dapatkanOpsi();
    }

    download(url, data) {
        return unduhKode(url, data);
    }
}