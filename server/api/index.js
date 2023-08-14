"use strict";

const { WizardingSchools, Students } = require("../db");
const bodyParser = require("body-parser");

const router = require("express").Router();

// require your database and place your routes here

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/schools", async (req, res, next) => {
    try {
        const schools = await WizardingSchools.findAll({
            include: Students,
        });
        res.send(schools);
    } catch(err) {
        next(err);
    }
});

router.get("/students", async (req, res, next) => {
    try {
        const students = await Students.findAll();
        res.send(students);
    } catch(err) {
        next(err);
    }
});

router.get("/schools/:id", async (req, res, next) => {
    try {
        const school = await WizardingSchools.findOne({
            where: { id: req.params.id },
            include: Students,
        });

        console.log(school);
        res.send(school);
    } catch(err){
        next(err);
    }
});

router.get("/students/:id", async (req, res, next) => {
    try {
        const student = await Students.findOne({
            where: { id: req.params.id },
            include: WizardingSchools,
        });

        res.send(student);
    } catch(err){
        next(err);
    }
});

router.post("/schools", async (req, res, next) => {
    try {

       console.log(req.body);

       const { name, address, description} = req.body;

       const newSchool = await WizardingSchools.create({
            name,
            address,
            description,
       });

       res.send(newSchool);

    } catch (err){
        next(err);
    }
});

router.post("/schools", async (req, res, next) => {
    try {

       console.log(req.body);

       const { name, address, description } = req.body;

       const newSchool = await WizardingSchools.create({
            name,
            address,
            description,
       });

       res.send(newSchool);

    } catch (err){
        next(err);
    }
});

router.post("/students", async (req, res, next) => {
    try {

       console.log(req.body);

       const { firstName, lastName, email, wizardingschoolId } = req.body;

       const newStudent = await Students.create({
            firstName,
            lastName,
            email,
            wizardingschoolId,
       });

       res.send(newStudent);

    } catch (err){
        next(err);
    }
});

router.delete("/schools/:id", async (req, res, next) => {
    try {
        const school = await WizardingSchools.findOne({
            where: { id: req.params.id },
        });

        await school.destroy();
        res.status(204).send();

    } catch(err){
        next(err);
    }
});


router.delete("/students/:id", async (req, res, next) => {
    try {
        const student = await Students.findOne({
            where: { id: req.params.id },
        });

        await student.destroy();
        res.status(204).send();

    } catch(err){
        next(err);
    }
});

router.put("/schools/:id", async (req, res, next) => {
    try {
        const schoolId = req.params.id;
        const { name, address, description } = req.body;

        const school = await WizardingSchools.findOne({
            where: { id: schoolId },
        });

        if (!school) {
            return res.status(404).send("School not found");
        }

        // Update the school properties
        school.name = name;
        school.address = address;
        school.description = description;

        await school.save();

        res.status(200).send(school);

    } catch (err) {
        next(err);
    }
});

router.put("/students/:id", async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const { firstName, lastName, email, wizardingschoolId } = req.body;

        const student = await Students.findOne({
            where: { id: studentId },
        });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        student.wizardingschoolId = wizardingschoolId;

        await student.save();

        res.status(200).send(student);

    } catch (err) {
        next(err);
    }
});

module.exports = router;
