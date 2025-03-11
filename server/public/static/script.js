$(document).ready(function(){
    populateCycles();

    $("#category").on("change", function(){
        var value = this.value;
        $('[data-show]').hide().filter(function(){
            return $(this).data('show') === value;
        }).show();
    }).change(); 

    $("form").submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        let formData = $(this).serialize(); // Serialize form inputs

        $.get("/download", formData, function(response) {
            if (response.download_url) {
                window.location.href = response.download_url; // Redirect to download file
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
    cycleSelect.innerHTML = ''; // Clear existing options

    const cycles = Array.from({ length: 13 }, (_, i) => 2000 + i * 2).reverse();
    cycles.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year - 1}-${year}`;
        cycleSelect.appendChild(option);
    });
}
