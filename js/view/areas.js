const footballAreas = data => {
    let footballTeamsHTML = "";
    if (data.count === 0) {
        document.getElementById("footballAreas").innerHTML = "<p>Areas Not Found</p>";
    } else {
    data.areas.forEach(area => {
        footballTeamsHTML += `
        <div class="card-action">
            <a href="./teamList.html?id=${area.id}">${area.name}<i class="material-icons chevron-right right">chevron_right</i></a>
            <p class="divider" tabindex="-1"></p>
        </div>
            
        `;
        
    });
        // Sisipkan komponen card ke dala elemen dengan id #content
    document.getElementById("footballAreas").innerHTML = footballTeamsHTML;
    }
}

export default footballAreas;