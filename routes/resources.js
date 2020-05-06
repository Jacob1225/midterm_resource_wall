const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (db) => {

  const getResource = function(category) {
    let queryString = `
      SELECT resources.*, AVG(resource_reviews.rating) AS rating
      FROM resources
      LEFT JOIN resource_reviews ON resource_id = resources.id
      WHERE category = $1
      GROUP BY resources.id;
      `
    return db
    .query(queryString, [category])
    .then(res =>  (res.rows))

  }

  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/${category}`)

    // .then(resources =>(res.redirect('/:category'))
    //redirect to that specific category one result
    // res.redirect('/:category')
  });

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    getResource(category)
    .then (resources => {
      res.render('results', {resources, category, moment})
    })
    .catch((err) => (res.status(500).send(err)));
  })

  router.post("/:category/"), (req, res) => {
    const resource = req.body.resource
    console.log(resource);
  }

  return router;
}
