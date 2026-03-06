const express = require("express")
const router = express.Router()

let users = require("../data/users")

// GET all users
router.get("/", (req, res) => {

  const role = req.query.role;

  if (!role) {
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  }

  const filteredUsers = users.filter((u) => u.role === role);

  res.status(200).json({
    success: true,
    count: filteredUsers.length,
    data: filteredUsers
  });

});

// GET user by id
router.get("/:id", (req, res) => {

const id = Number(req.params.id)

const user = users.find(u => u.id === id)

if (!user) {
return res.status(404).json({
success: false,
message: "Utilisateur non trouvé"
})
}

res.json({
success: true,
data: user
})

})

// POST create user
router.post("/", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "name et email requis"
    });
  }

  const emailExists = users.some((u) => u.email === email);

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "Cet email est déjà utilisé"
    });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString().split("T")[0]
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// PUT update user
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé"
    });
  }

  const { name, email, role } = req.body;

  if (email) {
    const emailUsedByAnotherUser = users.some(
      (u) => u.email === email && u.id !== id
    );

    if (emailUsedByAnotherUser) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé par un autre utilisateur"
      });
    }
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  res.status(200).json({
    success: true,
    data: user
  });
});

// DELETE user
router.delete("/:id", (req, res) => {

const id = Number(req.params.id)

const index = users.findIndex(u => u.id === id)

if (index === -1) {
return res.status(404).json({
success: false,
message: "Utilisateur non trouvé"
})
}

users.splice(index, 1)

res.status(204).send()

})

module.exports = router