import {getAll} from "../db.js";
const getFavoriteTeams = () => {
    getAll().then((teams) => {
        console.log(teams);
        // Menyusun koponen card artikel secara dinamis
        let teamListHTML = "";
        if (teams.count === 0) {
            document.getElementById("team-list").innerHTML = "<h5>Favorite Not Found</h5>";
        } else {
        teams.forEach((team) => {
            let teamCrest = team.crestUrl;
            if (teamCrest === null || teamCrest === undefined || teamCrest === "") {
            teamCrest = "../assets/image-not-found.png";
            } else {
            teamCrest = teamCrest.replace(/^http:\/\//i, "https://");
            }
            
            teamListHTML += `
                <div class="col s12 m6 l4">
                    <div class="card" style="height:350px;overflow:auto;">
                        <a href="./infoTeam.html?id=${team.id}&favorite=true">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${teamCrest}" alt="${team.name}-img">
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
    })
}
export default getFavoriteTeams;

