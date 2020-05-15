const RequirementGroup = require('./models/RequirementGroup');

module.exports = new RequirementGroup({
    name: "Computer Science",
    requirements: [
        {
            fullName:"First Introductory Computer Science Course",
            abbr: ["CS121", "CS186", "CS187"],
            minCount: 2
        },
        {
            fullName:"Core Computer Science Classes",
            abbr: ["CS220", "CS230", "CS240", "CS250"],
            minCount: 4
        },
        {
            fullName:"Core Math Classes",
            abbr: ["MATH131", "MATH132", "MATH235", ["STATS515", "MATH233"]],
            minCount: 4
        },
        {
            fullName:"Algorithms",
            abbr: ["CS311"],
            minCount: 1
        },
        {
            fullName:"300 or Above Level Classes",
            abbr: ["CS300+"],
            minCount: 3
        },
        {
            fullName:"400 or Above Level Classes",
            abbr: ["CS400+"],
            minCount: 3
        },
        {
            fullName:"300 or Above Level Class or Outside Elective",
            abbr: ["CS300+o"],
            minCount: 1
        },
        {
            fullName:"Lab Sciences",
            abbr: [["CHEM111", "CHEM121"], ["CHEM112", "CHEM122"], ["GEOL101", "GEOL103", "GEOL105"], ["PHYSICS151", "PHYSICS181"], ["PHYSICS152", "PHYSICS182"]],
            minCount: 2
        },
        {
            fullName:"Integrated Experience",
            abbr: ["CS-IE"],
            minCount: 1
        },
        {
            fullName:"Junior Year Writing",
            abbr: ["JYW"],
            minCount: 1
        },
    ]
}).save().then(() => console.log("new requirement added!"));

