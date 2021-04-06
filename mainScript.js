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
    console.log("OK");
}