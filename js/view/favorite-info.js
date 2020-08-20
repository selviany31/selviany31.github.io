import {getById} from "../db.js";

const getFavoriteById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then((team) => {
        let footballPlayerHTML = "";
        let squadsElement = document.getElementById("squads");
        // const deleteElement = document.getElementById("delete-button");

        let teamCrest = team.crestUrl;
            if (teamCrest === null || teamCrest === undefined || teamCrest === "") {
            teamCrest = "../assets/image-not-found.png";
            } else {
            teamCrest = teamCrest.replace(/^http:\/\//i, "https://");
            }

        let infoTeamHTML = `           
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${teamcrest}">
            </div>
            <div class="card-content">
            <h3>${team.name}</h3>
                <table>
                    <tr>
                        <td>Shortname</td>
                        <td>:</td>
                        <td>${team.shortName}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>:</td>
                        <td>${team.address}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>:</td>
                        <td>${team.phone}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td>:</td>
                        <td>${team.website}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>${team.email}</td>
                    </tr>
                    <tr>
                        <td>Founded</td>
                        <td>:</td>
                        <td>${team.founded}</td>
                    </tr>
                    <tr>
                        <td>Club Colors</td>
                        <td>:</td>
                        <td>${team.clubColors}</td>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <td>:</td>
                        <td>${team.venue}</td>
                    </tr>
                </table>
                <span class="card-title activator grey-text text-darken-4">List Squad<i class="material-icons right">more_vert</i></span>
            </div>
            `;
        document.getElementById("info-team").innerHTML = infoTeamHTML;
        
        team.squad.forEach((plyer) => {
            const formatDate = (userDate) => {
                // format from M/D/YYYY to YYYYMMDD
                return (new Date(userDate).toJSON().slice(0,10).split('-').reverse().join('-'));
            }
            footballPlayerHTML += `
                <tr>
                                    <td>${plyer.name}</td>
                                    <td>${plyer.position}</td>
                                    <td>${formatDate(plyer.dateOfBirth)}</td>
                                    <td>${plyer.nationality}</td>
                                    <td>${plyer.shirtNumber}</td>
                                    <td>${plyer.role}</td>
                
                </tr>   
                `;
                
            });

        squadsElement.innerHTML = `
        <span class="card-title grey-text text-darken-4">List Squad<i class="material-icons right">close</i></span>
        <table class="striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Date of Birth</th>
                    <th>Nationality</th>
                    <th>Shirt Number</th>
                    <th>Role</th>
                </tr>
            </thead>

            <tbody>${footballPlayerHTML}</tbody>
        </table>`;
    })
}
export default getFavoriteById;