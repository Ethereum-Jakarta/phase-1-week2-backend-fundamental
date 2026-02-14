const patients = [
  { id: 1, nama: "santos", penyakit: ["tbc", "tetanus"] },
  { id: 2, nama: "amigo", penyakit: ["ambeien", "struk"] },
  { id: 3, nama: "romdon", penyakit: ["ambien"] },
];

const alisa = patients.find((e) => e.nama === "romdon");
console.log(alisa);
