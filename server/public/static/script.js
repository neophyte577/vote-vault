$(document).ready(function(){
    populateCycles();
    populateStates();

    $("#category").on("change", function(){
        const value = this.value;
        $('[data-show]').hide().filter(function(){
            return $(this).data('show') === value;
        }).show();
    }).change(); 

    $("form").submit(function(event) {
        event.preventDefault();

        const category = $("#category").val();
        let formDataArray = $(this).serializeArray(); 
        let filteredData = [];

        formDataArray.forEach(field => {
            if (category === "finance" && (field.name === "race" || field.name === "state")) {
                return; 
            }
            filteredData.push(field);
        });

        const filteredFormData = $.param(filteredData); 

        $.get("/download", filteredFormData, function(response) {
            if (response.download_url) {
                // if parquet, download directly
                window.location.href = response.download_url;
            } else if (response.redirect_url) {
                // if CSV or Excel, open the redirect URL to backend converter microservice in new tab
                window.open(response.redirect_url, "_blank");
            } else {
                alert("File not found or an error occurred.");
            }
        }).fail(function() {
            alert("Error retrieving file.");
        });
    });
});

function populateCycles() {
    const cycleSelect = document.getElementById('cycle');
    cycleSelect.innerHTML = '';

    const cycles = Array.from({ length: 13 }, (_, i) => 2000 + i * 2).reverse();
    cycles.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year - 1}-${year}`;
        cycleSelect.appendChild(option);
    });
}

function populateStates() {
    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const stateSelect = document.getElementById('state');

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.toLowerCase().replace(/\s+/g, '_');
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}
