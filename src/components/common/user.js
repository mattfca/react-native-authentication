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
  }

}
