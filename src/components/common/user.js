import Realm from '../common/realm';

module.exports = {

  current: function(){
    let Users = Realm.objects('User');
    return Users[0];
  },

  deleteAllUsers: function(){
    Realm.write(() => {
      Realm.delete(Realm.objects('User'));
    });

    return true;
  },

  setUser: function(params){
    Realm.write(() => {
      // right now we will delete all users
      // in the future we should be checking for one user?
      Realm.delete(Realm.objects('User'));

      let user = Realm.create('User', params);
    });

    return true
  }
}
