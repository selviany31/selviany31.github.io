const infoTeams = (data) => {

    let footballPlayerHTML = "";
    let squadsElement = document.getElementById("squads");
    let backElement = document.getElementById("back-to");

    let dataCrest = data.crestUrl;
        if (dataCrest === null || dataCrest === undefined || dataCrest === "") {
        dataCrest = "../assets/image-not-found.png";
        } else {
        dataCrest = dataCrest.replace(/^http:\/\//i, "https://");
        }

    let infoTeamHTML = `           
        <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${dataCrest}">
        </div>
        <div class="card-content">
        <h3>${data.name}</h3>
            <table>
                <tr>
                    <td>Shortname</td>
                    <td>:</td>
                    <td>${data.shortName}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>${data.address}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td>${data.phone}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>:</td>
                    <td>${data.website}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td>Founded</td>
                    <td>:</td>
                    <td>${data.founded}</td>
                </tr>
                <tr>
                    <td>Club Colors</td>
                    <td>:</td>
                    <td>${data.clubColors}</td>
                </tr>
                <tr>
                    <td>Venue</td>
                    <td>:</td>
                    <td>${data.venue}</td>
                </tr>
            </table>
            <span class="card-title activator grey-text text-darken-4">List Squad<i class="material-icons right">more_vert</i></span>
        </div>
        `;
    document.getElementById("info-team").innerHTML = infoTeamHTML;
    
    data.squad.forEach((plyer) => {
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

    backElement.innerHTML = `
    <div class="row">
        <div class="col s10 offset-s2 m4 offset-m5">
                <a class="waves-effect waves-light btn-small light-green darken-4" href="./teamList.html?id=${data.area.id}">Back to Football Clubs</a>
        </div>
    </div>`;
}

export default infoTeams;