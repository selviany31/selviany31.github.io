const teamById = (data) => {
    let teamListHTML = "";
    if (data.count === 0) {
        document.getElementById("team-list").innerHTML = `<h5>Teams List Not Found</h5>`;
    } else {
    data.teams.forEach((team) => {
        let teamCrest = team.crestUrl;
        if (teamCrest === null || teamCrest === undefined || teamCrest === "") {
            teamCrest = "../assets/image-not-found.png";
        } else {
            teamCrest = teamCrest.replace(/^http:\/\//i, "https://");
        }
        
        teamListHTML += `
            <div class="col s12 m4 l3">
                <div class="card" style="height:250px;overflow:auto;">
                    <a href="./infoTeam.html?id=${team.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="responsive-img" src="${teamCrest}" alt="${team.name}-img" height="40px">
                        </div>
                    </a>
                    <div class="card-title">
                        <span>${team.name}</span>
                    </div>
                </div>
            </div>
        `;
    
    document.getElementById("team-list").innerHTML = teamListHTML;
    }) 
    }
}

export default teamById;