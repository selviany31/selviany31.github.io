import {getFootballAreas, getTeamById, getInfoTeam} from './api.js';
import showDeleted from "./view/show-delete.js";
import showPreloader from "./view/show-preload.js";
import nav from "./nav.js";
import notif from "./reg-notif.js";
import "./idb.js";
import {favoriteForLater, deleteFromSave, checkFavorite} from "./db.js";
import './reg-sw.js';

document.addEventListener("DOMContentLoaded", function() {
    let urlParams = location.pathname;
    console.log(urlParams);
    if (urlParams === "/" || urlParams === "/index.html") {
        getFootballAreas();
        showPreloader();
        nav();
        notif();
    } else if (urlParams === "/teamList.html") {
        getTeamById();
        showPreloader();
    } else if (urlParams === "/infoTeam.html") {
        let urlParams = new URLSearchParams(window.location.search);
            let isFromFavorite = urlParams.get("favorite");

            let btnFavorite = document.getElementById("favorite");
            let btnDelete = document.getElementById("delete");
            
            if (isFromFavorite) {
                btnFavorite.style.display = "none";
                document.getElementById("back-to").style.display = "none";
            } else {
                btnDelete.style.display = "none"
            }

            let item = getInfoTeam();
            item.then((teams) => {
                checkFavorite(teams.id).then((favorite) => {
                    if (favorite) {
                        // Block jika item telah difavoritkan
                        isFromFavorite = true;
                        document.getElementById("btnAdd").innerHTML = "favorite";
                    } else {
                       // Block jika item telah difavoritkan
                        isFromFavorite = false;
                        document.getElementById("btnAdd").innerHTML = "favorite_border";
                    }
                })
            });

            btnFavorite.onclick = () => {
                console.log("Tombol FAB di Klik.");
                item.then((team) => {
                    favoriteForLater(team);
                    M.toast({html: " Added to Favorite"})
                    document.getElementById("btnAdd").innerHTML = "favorite"
                })
            }

            btnDelete.onclick = () => {
                console.log("Team deleted");
                item.then((id) => {
                    deleteFromSave(id);
                    M.toast({html: " Deleted from Favorite"})
                    isFromFavorite = false;
                    showDeleted();
                });
            }

            showPreloader();
    }

    
});


