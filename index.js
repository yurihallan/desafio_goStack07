const exprees = require('express');

const api = exprees();

api.use(exprees.json());

const projects = [];


function checkProjectExist(req,res,next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    
    if(!project){
        return res.status(400).json({error: 'Project not found'});
    }

    return next();
}


function logRequests(req, res, next){
    console.count('Número de requisições');

    return next();
}


api.get('/projects',logRequests, (req, res) => {
    
    return res.json(projects);

});


api.post('/projects',logRequests,(req,res) => {
    const  { id, title } = req.body;

    const project = {
        id,
        title,
        tasks:[]
    }

    projects.push(project);
    
    return res.json(projects);
});


api.put('/projects/:id', logRequests,checkProjectExist,(req,res) => {
    const { id } = req.params;
    const Title = req.body;

    const project = projects.find(p => p.id == id);
    
    project.title = Title.title;

    return res.json(project);
});


api.delete('/projects/:id',logRequests,checkProjectExist, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex,1);

    return res.send();
});


api.post('/projects/:id/tasks',logRequests,(req, res) => {
    const { id } = req.params;
    const { title } = req.body;


    const project = projects.find(p => p.id == id);


    project.tasks.push(title);

    return res.json(project);
});



api.listen(3000);