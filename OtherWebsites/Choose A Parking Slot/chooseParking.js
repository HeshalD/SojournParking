function openForm(slot) {
    document.getElementById("parkingForm").style.display = "flex";
    document.getElementById("selected-slot").innerText = "Slot: " + slot;
}

function closeForm() {
    document.getElementById("parkingForm").style.display = "none";
}

function submitForm() {
    const name = document.getElementById("name").value;
    const licensePlate = document.getElementById("licensePlate").value;
    const entryTime = document.getElementById("entryTime").value;

    if (name && licensePlate && entryTime) {
        alert(`Reservation Successful! 
        \nName: ${name}
        \nLicense Plate: ${licensePlate}
        \nEntry Time: ${entryTime}`);
        closeForm();
    } else {
        alert("Please fill in all fields.");
    }
}