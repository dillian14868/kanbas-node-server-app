import Database from "../Database/index.js";
import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);

  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);

  };

  const signin = async (req, res) => { 
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);

  };
  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };


  
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
// function CourseRoutes(app) {
//     app.get("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = Database.courses
//           .find((c) => c._id === id);
//           console.log("find Course bi id");
//         if (!course) {
//           res.status(404).send("Course not found");
//           return;
//         }
//         console.log("find Course try 2");
//         res.send(course);
//       });
    
//       app.put("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = req.body;
//         console.log("UPDATE");
//         Database.courses = Database.courses.map((c) =>
//           c._id === id ? { ...c, ...course } : c
//         );
//         res.sendStatus(204);
//       });

//     app.delete("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         Database.courses = Database.courses
//           .filter((c) => c._id !== id);
//         res.sendStatus(204);
//       });
    
//       app.post("/api/courses", (req, res) => {
//         const course = { ...req.body,
//           _id: new Date().getTime().toString() };
//         Database.courses.push(course);
//         res.send(course);
//       });
    
      
    
    
    
//   app.get("/api/courses", (req, res) => {
//     const courses = Database.courses;
//     res.send(courses);
//   });

  

// }
// export default CourseRoutes;