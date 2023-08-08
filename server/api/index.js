"use strict";

const { WizardingSchools, Students } = require("../db");

const router = require("express").Router();

// require your database and place your routes here

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


module.exports = router;
