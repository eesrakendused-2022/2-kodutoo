import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getDatabase, ref, set, query, orderByValue, onValue } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

//type:module scripts can't have classes and thus this file is like that

const firebaseConfig = {
    apiKey: "AIzaSyDAhXjSv8XjRuFnkusunhW4ZojiG6SLy6Y",
    authDomain: "eesrakendused22-baas.firebaseapp.com",
    databaseURL: "https://eesrakendused22-baas-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eesrakendused22-baas",
    storageBucket: "eesrakendused22-baas.appspot.com",
    messagingSenderId: "929971848095",
    appId: "1:929971848095:web:6fb9684432991ceab733aa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
    
let scores = {
    hardmodeEnabled: {},
    hardmodeDisabled: {},
};
const hardRef = ref(database, "scores/hardmodeEnabled");
const easyRef = ref(database, "scores/hardmodeDisabled");
onValue(hardRef, getValuesFromDatabase);
onValue(easyRef, getValuesFromDatabase);

function getValuesFromDatabase(location) {
    let content;
    content = location.val();
    scores[location.key] = content;
    return;
}

window.uploadScore = function(playername, playerscore, isHardmode) {
    let key = `${playername}_${Date.now()}${Math.floor(Math.random() * 10)}`;
    if (isHardmode) {
        set(ref(database, "scores/hardmodeEnabled/" + key), playerscore);
    } else {
        set(ref(database, "scores/hardmodeDisabled/" + key), playerscore);
    }
}

window.getScores = function(isHardmode) {
    if (isHardmode) {
        return scores.hardmodeEnabled;
    } else {
        return scores.hardmodeDisabled;
    }
}