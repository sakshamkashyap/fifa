var db = null;

function initDB() {
    if(db == null) {
        db = connectToDB();
    }
    return db;
}

function displayMode() {
    if (document.getElementById('radioFindTnmt').checked) {
        document.getElementById('findTnmt').style.display = 'initial';
    } else if (document.getElementById('radioNewTnmt').checked) {
        document.getElementById('newTnmt').style.display = 'initial';
    }
    document.getElementById('selectionRadio').style.display = 'none';
}

function addFields() {

    var teams = document.getElementById('numOfTeams').value;

    if (teams < 2 || teams > 16) {
        return;
    }

    var parent = document.getElementById('allTeams');
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    for(var i = 1; i <= teams; i++) {
        var div = document.createElement("div");
        div.classList.add('wrap-input100', 'bg1', 'rs1-wrap-input100');
        var input = document.createElement("input");
        input.setAttribute('class', 'input100');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'team' + i);
        input.setAttribute('placeholder', 'Enter team ' + i);
        div.appendChild(input);
        parent.appendChild(div);
    }

}

function createTournament() {
    document.getElementById('screen-1').style.display = 'none';
    document.getElementById('screen-2').style.display = 'initial';
    addTournament();
}

function addTournament() {
    var radios = document.getElementsByName('type-leg');
    var leg = 1;
    var bonus = document.getElementById('bonus').value;
    var teams = document.getElementById('numOfTeams').value;
    var eventId = 0;

    for(var i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            radios[i].value;
            break;
        }
    }

    db.collection("events")
    .orderBy('eventId', 'desc')
    .limit(1).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            eventId = doc.data().eventId + 1;

            db.collection("events").add({
                eventId: eventId,
                win: 3,
                loss: 0,
                draw: 1,
                legs: Number(leg),
                roundWin: Number(bonus),
                teams: Number(teams)
            })
            .then((docRef) => {
                console.log("Collection created: " + docRef.id);
            })
            .catch((error) => {
                console.log("Error during collection creation: " + error);
            });
        });
    });
}

function connectToDB() {
    const firebaseConfig = {
        apiKey: "AIzaSyCdwHEqvLzSWaHrqkHSchHwyVxz4LdsBck",
        authDomain: "fifa-tnmt.firebaseapp.com",
        databaseURL: "https://fifa-tnmt-default-rtdb.firebaseio.com",
        projectId: "fifa-tnmt",
        storageBucket: "fifa-tnmt.appspot.com",
        messagingSenderId: "546072301727",
        appId: "1:546072301727:web:5d80f00f01bf1ae9a6d2aa",
        measurementId: "G-SVJ4T3XXT7"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      return firebase.firestore();
}