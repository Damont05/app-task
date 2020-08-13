const express = require('express');
const router = express.Router();
const Task = require('../modeldb/data');


router.get('/', async(req, res) => {

    const tasks = await Task.find();
    res.json(tasks);


    // await Task.find({})
    //     .exec((err, task) => {

    //         if (err) {
    //             return res.status(400).json({ ok: false, err });
    //         }

    //         res.json({
    //             ok: true,
    //             task
    //         });
    //     });
});

router.get('/:id', async(req, res) => {

    const task = await Task.findById(req.params.id);
    res.json(task);

    // let id = req.params.id;

    // await Task.findById(id, {})
    //     .exec((err, taskID) => {

    //         if (err) {
    //             return res.status(400).json({ ok: false, err });
    //         }

    //         if (!taskID) {
    //             return res.status(400).json({ ok: false, message: 'task does not exist' });

    //         }

    //         res.json({
    //             ok: true,
    //             taskID
    //         });
    //     });
});

router.post('/', async(req, res) => {

    let body = req.body;

    const task = new Task({

        title: body.title,
        description: body.description
    });

    await task.save((err, taskDB) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({
            ok: true,
            message: 'Task Saved',
            task: taskDB
        });
    });

});


router.put('/:id', async(req, res) => {

    const { id } = req.params;

    const task = {

        title: req.body.title,
        description: req.body.description
    }

    await Task.findByIdAndUpdate(id, { $set: task }, { new: true });

    res.json({ status: 'Tarea Actualizada' });

});

router.delete('/:id', async(req, res) => {

    let id = req.params.id;

    await Task.findByIdAndRemove(id, (err, taskDeleted) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        if (!taskDeleted) {
            return res.status(404).json({ ok: false, message: 'task does not exist' });

        }

        res.json({
            ok: true,
            message: 'Task Deleted!!!'
        });

    });
});


module.exports = router;