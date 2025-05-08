class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`
    );
  }
  // lanjutkan method lain
  static showLoginSuccess(username) {
    console.log(`${username} successfully logged in`);
  }

  static showLoginFailed() {
    console.log(`Login failed: Invalid username or password`);
  }

  static showAddPatientSuccess(patient) {
    console.log(`Patient added successfully: ${patient.name}`);
  }

static showDeletePatientSuccess(patientId) {
  console.log(`Patient with ID ${patientId} has been successfully deleted.`);
}

  static showError(error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = HospitalView;
