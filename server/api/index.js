"use strict";

const { WizardingSchools, Students } = require("../db");
const bodyParser = require("body-parser");

const router = require("express").Router();

// require your database and place your routes here

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/schools", async (req, res, next) => {
    try {
        const schools = await WizardingSchools.findAll();
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

       const { firstName, lastName, email } = req.body;

       const newStudent = await Students.create({
            firstName,
            lastName,
            email,
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

router.put("/school")

module.exports = router;
