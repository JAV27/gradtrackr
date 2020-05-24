const Class = require('./models/Class');
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;

const classes = [
    {
        name: "Calculus for Life and Social Sciences I",
        category: "MATH",
        class_number: 127,
        description: "Basic calculus with applications to problems in the life and social sciences. Functions and graphs, the derivative, techniques of differentiation, curve sketching, maximum-minimum problems, exponential and logarithmic functions, exponential growth and decay, and introduction to integration.",
        grad_requirements: [
            ObjectId("5ebedb02bda8503f7e978a86"),
            ObjectId("5ebedb02bda8503f7e978a87")
        ]
    },
    {
        name: "Calculus for Life and Social Sciences II",
        category: "MATH",
        class_number: 128,
        description: "Continuation of MATH 127. Elementary techniques of integration, introduction to differential equations, applications to several mathematical models in the life and social sciences, partial derivatives, and some additional topics.",
        grad_requirements: [
            ObjectId("5ebedb02bda8503f7e978a86"),
            ObjectId("5ebedb02bda8503f7e978a87")
        ]
    },
    {
        name: "Calculus I",
        category: "MATH",
        class_number: 131,
        description: "Continuity, limits, and the derivative for algebraic, trigonometric, logarithmic, exponential, and inverse functions. Applications to physics, chemistry, and engineering.",
        grad_requirements: [
            ObjectId("5ebedb02bda8503f7e978a86"),
            ObjectId("5ebedb02bda8503f7e978a87"),
            ObjectId("5ebeeb766b4a9b4bfb4181b3")            
        ]
    },
    {
        name: "Calculus II",
        category: "MATH",
        class_number: 132,
        description: "The definite integral, techniques of integration, and applications to physics, chemistry, and engineering. Sequences, series, and power series. Taylor and MacLaurin series. Students expected to have and use a Texas Instruments 86 graphics, programmable calculator.",
        grad_requirements: [
            ObjectId("5ebedb02bda8503f7e978a86"),
            ObjectId("5ebedb02bda8503f7e978a87"),
            ObjectId("5ebeeb766b4a9b4bfb4181b3")
        ]
    }
];

module.exports = classes;
