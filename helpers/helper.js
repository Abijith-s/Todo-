const mongoose = require('mongoose')
var id = mongoose.Types.ObjectId

//Schema for todolist
const todoScehema = new mongoose.Schema({
    list:String,
    status:Boolean,
    date:Date
})

//collection for todolist
const todoInfo = mongoose.model('todolist',todoScehema)


module.exports={
    addTodoList:(body,stat)=>{
        console.log("stat ............")
        console.log(stat)
        return new Promise((resolve,reject)=>{
            console.log(body.todo)
           const todolist = new todoInfo({
            list:body.todo,
            status:stat,
            date:new Date()
           })
           todolist.save((err,details)=>{
               if(err){
                   console.log("err"+err)
               }else{
                console.log("todo list")
                console.log(details)
                   resolve(details)
               }
           })
           
        })
        
    },
    getTodoList:()=>{
        return new Promise(async(resolve,reject)=>{
            await todoInfo.find().then((result)=>{
                console.log("finded result")
                console.log(result)
                resolve(result)
            })
        })
    },
    deleteItem:(id)=>{
       
        console.log(id)
        return new Promise(async(resolve,reject)=>{
            await todoInfo.deleteOne({_id:id.id}).then((response)=>{
                console.log(response)
            })
        })
    },
    changeStatus:(status,id)=>{
        return new Promise(async(resolve,reject)=>{
            if(status==false){
                await todoInfo.updateOne({_id:id},{status:true}).then((res)=>{
                    console.log("changed status")
                    console.log(res)
                    resolve(res)
                })
            }else{
                await todoInfo.updateOne({_id:id},{status:false}).then((res)=>{
                    console.log("changed status")
                    console.log(res)
                    resolve(res)
                })
            }
            
        })
    }
}