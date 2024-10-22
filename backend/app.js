const express = require("express");
const mongoose = require("mongoose");


const doctorsRoutes = require("./routes/doctors-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const hospitalsRoutes = require("./routes/hospitals-routes");
const adminsRoutes = require("./routes/admins-routes");
const patientsRoutes = require("./routes/patients-routes");
const appointmentsRoutes = require("./routes/appointments-routes");
const receptionistsRoutes = require("./routes/receptionists-routes");
const reviewsRoutes = require("./routes/reviews-routes");
const notificationsRouter = require("./routes/notifications-routes");

  

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT, DELETE");

  next();
});

app.use(express.json());


// app.use("/api/", home);
app.use("/api/users", usersRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/hospitals", hospitalsRoutes);
app.use("/api/receptionists", receptionistsRoutes);

app.use("/api/notifications", notificationsRouter);

app.use('/api/notifications', notificationsRouter);


app.use((req, res, next) => {
 const error = new HttpError("Could not find this route.", 404);
 throw error;
});


app.use((error, req, res, next) => {
 if (res.headerSent) {
   return next(error);
 }
 res.status(error.code || 500);
 res.json({ message: error.message || "An unknown error occurred!" });
});


//You can replace local server uri with MongoDB Atlas connection link
mongoose
 .connect(
   "mongodb://localhost:27017/Project"
 )
 .then(() => {
   app.listen(5000);
 })
 .catch((err) => {
   console.log(err);
 });

 module.exports = app;
