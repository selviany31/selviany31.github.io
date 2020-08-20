import footballAreas from "./view/areas.js";
import teamById from "./view/teams.js";
import infoTeams from "./view/info-team.js";

let base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa di-then-kan
        return Promise.resolve(response);
    }
}


// Blok kode untuk memparsing json menjad array javascript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berhasil dari Proise.reject()
    console.log("Error : " + error);
}

const options = {
    headers: {
        'X-Auth-Token': 'd8ed9c68b77f46569ae1d98f4e1a373a'
    }
};

const getFootballAreas = () => {
    if ('caches' in window) {
        caches.match(base_url + 'areas', options).then((response) => {
            if(response) {
                response.json().then((data) => {
                    footballAreas(data);
                })
            }
        })
    }

    fetch(base_url + 'areas', options)
        .then(status)
        .then(json)
        .then((data) => {
            // Objek/array javascript dari response.json() asuk lewat data

            // Menyusun komponen football secara dinamis
            footballAreas(data);
        })
        .catch(error => {
            console.log(error)
            M.toast({html: error})
        });
}

const getTeamById = () => {
    return new Promise((resolve, reject) => {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams" + idParam, options).then((response) => {
                if(response) {
                    response.json().then((data) => {
                        teamById(data);
                        
                        resolve(data)
                    });
                };
            });
        };

        fetch(base_url + 'teams?areas=' + idParam, options)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data);

            teamById(data);    
        })
        .catch(error => {
            console.log(error)
            M.toast({html: error})
        });
    });
}

const getInfoTeam = () => {
    return new Promise((resolve, reject) => {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams" + idParam, options).then((response) => {
                if(response) {
                    response.json().then((data) => {
                        infoTeams(data);
                        
                        resolve(data)
                    })
                    .catch(error => {
                        console.log(error)
                        M.toast({html: error})
                    });
                };
            });
        };


        fetch(base_url + 'teams/' + idParam, options)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data);
        
            infoTeams(data)

            resolve(data);
        })
        .catch(error => {
            console.log(error)
            M.toast({html: error})
        });
    });
}

export {getFootballAreas, getTeamById, getInfoTeam};


