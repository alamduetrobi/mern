const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017", (err) => {
//   if (!err) console.log("db Connected");
//   else console.log("db error");
// });

// console.log(mongoose);
mongoose
  .connect("mongodb://127.0.0.1/my-students")
  .then(() => console.log("Connected to MongoDB Successfull"))
  .catch((err) => console.error("Connection Failelds"));

// Schema -> Defines the schema

const studentSchema = new mongoose.Schema({
  //   firstName: { type: String },
  firstName: String,
  lastName: String,
  dob: Date,
  enterDate: { type: Date, default: Date.now },
  passed: Boolean,
  hobbies: [String],
  parents: {
    father: String,
    mother: String,
  },

  subjects: [
    {
      name: String,
      marks: { type: Number, min: 0, max: 100 },
    },
  ],
});

// Model of Mongoose

const Student = mongoose.model("Student", studentSchema); // Class

// Create Data

async function createStudent() {
  const student = new Student({
    firstName: "Fazle",
    lastName: "alam",
    dob: new Date("27 April 1995"),
    passed: true,
    hobbies: ["Swimming", "Singing"],
    parents: {
      father: "A",
      mother: "B",
    },

    subjects: [
      { name: "Math", marks: 80 },
      { name: "English", marks: 90 },
    ],
  });

  try {
    const data = await student.save();
    console.log(data);
  } catch (err) {
    console.log(err._message);
  }
}

//createStudent();

// R => Read

async function readStudents() {
  //   const studentsData = await Student.find({ firstName: "Rohim" });
  const studentsData = await Student.find();
  // .limit(10)
  // .sort({ firstName: -1 })
  // .select({ firstName: 1, lastName: 1, hobbies: 1 })
  // .countDocuments();
  console.log(studentsData);
}

readStudents();

// Update and delete Perform

async function readStudentsanddelete(id) {
  //   //   const studentsData = await Student.find({ firstName: "Rohim" });
  //   const studentsData = await Student.find()
  //     // .limit(10)
  //     // .sort({ firstName: -1 })
  //     .select({ firstName: 1, lastName: 1, passed: 1 })
  //     .countDocuments();
  //   console.log(studentsData);

  const student = await Student.updateOne(
    { _id: id },
    {
      $set: {
        passed: false,
      },
    }
  );
  console.log(student);
}

// readStudentsanddelete("627a1d7a0a9bef36baed02ff");

// Delete content

async function deleteStudent(id) {
  const student = await Student.deleteOne({ _id: id });
  console.log(student);
}

deleteStudent("627a131604be42a4636dc78c");

//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// var MongoClient = require("mongodb");
// //Create a database named "mydb":
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });
