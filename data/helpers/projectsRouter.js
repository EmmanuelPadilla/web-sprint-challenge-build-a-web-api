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
router.get("/projects/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
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











router.delete("/projects/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(() =>
      res.status(200).json({ message: `Project ${req.params.id} was destroyed` })
    )
    .catch((err) => res.status(500).json({ message: "could not delete" }, err));
});

module.exports = router;
