import { openDatabase } from "expo-sqlite";

const db = openDatabase("authV2.db");
if (!db) {
  throw new Error("Failed to open the database.");
}

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL,
            firstName TEXT,
            lastName TEXT,
            email TEXT NOT NULL UNIQUE,
            contactNumber TEXT,
            address TEXT,
            profilePicture TEXT,
            username TEXT UNIQUE,
            password TEXT NOT NULL
          );`,
          [],
          () => resolve(),
          (_, err) => reject(err)
        );
      },
      (err) => reject(err)
    );
  });
};

export const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO users (
          firstName, 
          lastName, 
          email, 
          contactNumber, 
          address, 
          profilePicture, 
          username, 
          password
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.contactNumber,
          user.address,
          user.profilePicture,
          user.username,
          user.password,
        ],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM users WHERE username = ? AND password = ?;`,
          [username, password],
          (_, { rows }) => resolve(rows._array[0]),
          (_, err) => reject(err)
        );
      },
      (err) => reject(err)
    );
  });
};

export const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?,
            contactNumber = ?,
            address = ?,
            profilePicture = ?,
            username = ?,
            password = ?
          WHERE id = ?;`,
          [
            user.firstName,
            user.lastName,
            user.email,
            user.contactNumber,
            user.address,
            user.profilePicture,
            user.username,
            user.password,
            user.id,
          ],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      },
      (err) => reject(err)
    );
  });
};