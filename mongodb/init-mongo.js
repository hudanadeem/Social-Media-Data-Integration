
const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;

const admin = db.getSiblingDB("admin");

admin.createUser({
  user: MONGO_INITDB_ROOT_USERNAME,
  pwd: MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
  ],
});

