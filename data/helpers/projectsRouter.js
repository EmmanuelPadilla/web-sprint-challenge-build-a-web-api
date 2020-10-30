const router = require("express").Router();

const Projects = require("./projectModel");

router.get("/projects", (req, res) => {
  Projects.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => res.status(500).json(`${err}`));
});

router.get("/projects/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => res.status(500).json(`${err}`));
});


router.post("/projects/", (req, res) => {
  const { name, description, completed } = req.body;

  if (!description || !name) {
    res.status(400).json({ message: "missing description and/or notes" });
  } else {
    const newProject = { name, description, completed };
    Projects.insert(newProject)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "could not post project" });
      });
  }
});

router.put("/projects/:id", (req, res)=>{
const changes = req.body
Projects.update(req.params.id, changes)
.then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project',
    });
  });
})



router.delete("/projects/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(() =>
      res.status(200).json({ message: `Project ${req.params.id} was destroyed` })
    )
    .catch((err) => res.status(500).json({ message: "could not delete" }, err));
});

module.exports = router;
