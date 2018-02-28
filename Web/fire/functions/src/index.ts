// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//CORS
const cors = require('cors')({origin: true});

// Password generator
const generator = require('generate-password');

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      res.redirect(303, snapshot.ref);
    });
  })

//GESTORES

exports.addGestor = functions.https.onRequest((req, res) => {

  cors(req, res, () => {console.log('cors')});

    const email = req.query.email;
    const name = req.query.name;

    const password = generator.generate({length: 20, numbers:true, symbols: true, strict: true });
    admin.auth().createUser({
        email: email,
        password:  password
    }).then(userRecord => {
        const data = {
            nombre: name,
            email: email,
            uid: userRecord.uid,
            curso: ''
        };
        admin.database().ref('/gestores').child(data.uid).set(data).then(snapshot => {
            res.status(200).send();
          }).catch(error => console.log("error: " + error));
    }).catch(error => console.log("error: " + error));
});

exports.deleteGestor = functions.https.onRequest((req, res) => {
  cors(req, res, () => {console.log('cors')});

    const uid = req.query.uid;
    admin.auth().deleteUser(uid).then(userRecord => {
        admin.database().ref('/gestores').child(uid).remove().then(r => {
            res.status(200).send();
          }).catch(error => console.log("error: " + error))
    }).catch(error => console.log("error: " + error));
});

//ALUMNOS

exports.addAlumno = functions.https.onRequest((req, res) => {
  cors(req, res, () => {console.log('cors')});

  const email = req.query.email;
  const name = req.query.name;
  const curso = req.query.curso;

  const password = generator.generate({length: 20, numbers:true, symbols: true, strict: true });
  admin.auth().createUser({
    email: email,
    password:  password
  }).then(userRecord => {
    const data = {
      Nombre: name,
      Email: email,
      Grado: +curso,
      nick: name,
      puntos: 0,
      uid: userRecord.uid
    };
    admin.database().ref('/usuarios').child(userRecord.uid).set(data).then(snapshot => {
      res.status(200).send();
    }).catch(error => console.log("error: " + error));
  }).catch(error => console.log("error: " + error));
});

exports.deleteAlumno = functions.https.onRequest((req, res) => {
  cors(req, res, () => {console.log('cors')});

  const uid = req.query.uid;
  admin.auth().deleteUser(uid).then(userRecord => {
    admin.database().ref('/usuarios').child(uid).remove().then(r => {
      res.status(200).send();
    }).catch(error => console.log("error: " + error))
  }).catch(error => console.log("error: " + error));
});

