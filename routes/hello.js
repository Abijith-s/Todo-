var express = require('express')
const helper = require('../helpers/helper')
var router = express.Router()
var helpers = require('../helpers/helper')
router.get('/',async(req,res)=>{
    try {
        let lists =await helpers. getTodoList()
        console.log("liss*****************")
        console.log(lists)
        res.json(lists)
    } catch (error) {
        console.log("error"+error)
    }
})
router.post('/',async(req,res)=>{
    console.log("njn serveril ethi mwone")
    console.log(req.body)
    
    try {
        let status = false
        await helpers.addTodoList(req.body,status)
        res.json({data:"data reached"})
    } catch (error) {
        console.log("error"+error)
    }
})
router.post('/delete',async(req,res)=>{
    try {
        console.log("id databasil ethi")
        console.log(req.body)
        await helper.deleteItem(req.body)
    } catch (error) {
        console.log("error + "+error)
    }
})

router.post('/change-status',async(req,res)=>{
    try {
        console.log("change status")
        console.log(req.body)
        let changedStatus = await helpers.changeStatus(req.body.currentStatus,req.body.id)
        res.json({status:true})
    } catch (error) {
        console.log("errror    "+error)
    }
})
module.exports = router;