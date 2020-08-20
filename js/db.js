import "./idb.js";

const dbPromised = idb.open("info-team", 1, function(upgradeDb) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", {unigue: false});
});

const favoriteForLater = (team) => {
    dbPromised
    .then((db) => {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
    })
    .then(() => {
        console.log("Berhasil di simpan");
    })
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
    });
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then((team) => {
                resolve(team);
            })
            .catch((err) => {
                console.log("error: " + err);
            })
    });
}

const deleteFromSave = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(id);
            store.delete(id.id);
            return tx.complete;
        }).then((id) => {
            if(id != undefined) {
                resolve(id);
                M.toast({html: team.shortName + " dihapus dari favorite"})
            }
        })
    })
}

const checkFavorite = (id) => {
    return new Promise ((resolve, reject) => {
        dbPromised.then((db) => {
            const tx = db.transaction("teams", "readonly");
            return tx.objectStore("teams").get(id)
        }).then((favorite) => {
            if(favorite !== undefined) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

export {favoriteForLater, getAll, deleteFromSave, getById, checkFavorite};