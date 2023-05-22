const db = require('./database/db.js');

// test 1
const select_cohorts_in_finsbo = db.prepare(/*sql*/ `
  SELECT name FROM cohorts WHERE cohorts.location = 'Finsbury Park'
`);

function listCohortsInFinsbo() {
  return select_cohorts_in_finsbo.all();
}

// test 2
const select_students_in_finsbo = db.prepare(/*sql*/ `
  SELECT students.username FROM students JOIN cohorts
  ON cohorts.name = students.cohort_name
  WHERE cohorts.location = 'Finsbury Park'
`);

function listStudentsInFinsbo() {
  return select_students_in_finsbo.all();
}

// test 3
const select_students_with_location = db.prepare(/*sql*/ `
  SELECT students.username, cohorts.location
  FROM students JOIN cohorts ON cohorts.name = students.cohort_name
`);

function listStudentsWithLocation() {
  return select_students_with_location.all();
}

// test 4
const select_students_with_projects = db.prepare(/*sql*/ `
  SELECT students_projects.student_username AS username, projects.name
  FROM students_projects JOIN projects ON
  students_projects.project_id = projects.id
`);

function listStudentsWithProjects() {
  return select_students_with_projects.all();
}

// test 5
const select_students_with_projects_in_finsbo = db.prepare(/*sql*/ `
  SELECT students_projects.student_username AS username, projects.name
  FROM students_projects
  JOIN projects ON students_projects.project_id = projects.id
  JOIN students ON students_projects.student_username = students.username
  JOIN cohorts ON students.cohort_name = cohorts.name
  WHERE cohorts.location = 'Finsbury Park'
  ORDER BY username ASC
`);

function listStudentsWithProjectsInFinsbo() {
  return select_students_with_projects_in_finsbo.all();
}

module.exports = {
  listCohortsInFinsbo,
  listStudentsInFinsbo,
  listStudentsWithLocation,
  listStudentsWithProjects,
  listStudentsWithProjectsInFinsbo,
};
