const firebase = require('firebase');
const { firebaseConfig, email, password } = require('../../firebase-config.secret');

module.exports = function() {
    this.requires('config');
    this.provides('projectionDB', function({ config }) {
        const app = firebase.initializeApp(firebaseConfig);
        const db = app.database();
        return app.auth().signInWithEmailAndPassword(email, password).then(function() {
            return db;
        });
    });
};