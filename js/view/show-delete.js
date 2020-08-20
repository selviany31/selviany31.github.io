const showDeleted = () => {
    document.getElementById("info-team").remove();
    let deletedHTML = `
    <h3 class="center-align">Team information deleted</h3>
    
    <div class="row">
        <div class="col s12 m4 offset-m5">
            <a class="waves-effect waves-light btn-small light-green darken-4" href="./index.html#favorite">Back To List Favorite</a>
        </div>
    </div>`
    document.getElementById("body-content").innerHTML = deletedHTML
}
export default showDeleted;