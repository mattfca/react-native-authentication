var Buffer = require('buffer/').Buffer
import Moment from 'moment'

import Api from './api';
import Realm from './realm';

class Jwt {
  checkExpiredAndRefresh(){
    let User = Realm.objects('User')[0];
    let token = User.token;

    let jwtArr = token.split(".");
    let jwtDecoded = JSON.parse(new Buffer(jwtArr[1], 'base64').toString());
    let now = parseInt(Moment().format("X"));

    if(User.refresh != null){ // we will only check if refresh is not null
      if((jwtDecoded.exp - now) <= 0){
        // Expired
        Api.refresh({
          email: User.email,
          refresh: User.refresh
        })
          .then((data) => {
            if(data.success){
              // We have a new JWT token
              Realm.write(() => {
                User.token = data.token;
                User.refresh = data.refresh
              });

              return true;
            }else{
              // This refresh token didn't work, let's delete it
              Realm.write(() => {
                // right now we will delete all users
                // in the future we should be checking for one user?
                Realm.delete(Realm.objects('User'));
              });
              return false;
            }
          });
      }else{
        // token is still good
        return true;
      }
    }
  }
}

export default new Jwt;
