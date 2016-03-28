import Realm from 'realm';

const KEY = new Int8Array(64);

class User {}
User.schema = {
  name: 'User',
  properties: {
    email: Realm.Types.STRING,
    token: Realm.Types.STRING,
    refresh: Realm.Types.STRING
  }
}

export default new Realm({schema: [User], encryptionKey: KEY, schemaVersion: 2});
