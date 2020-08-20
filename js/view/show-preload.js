const showPreloader = () => {
    let preloaderHTML = `
    <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
    
    `;
    document.getElementById("loader").innerHTML = preloaderHTML;

    document.getElementById("body-content").style.display = "none";
            document.querySelector("#loader").style.display = "block";

            setTimeout(function() {
                document.getElementById("body-content").style.display = "block";
                document.querySelector("#loader").style.display = "none";
            }, 4000);
}
export default showPreloader;