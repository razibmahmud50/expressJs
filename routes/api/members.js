const express = require('express')
const uuid = require('uuid')


const router = express.Router()
const members = require('../../Members')


router.get('/',(req, res)=>res.json(members))

//get single member
router.get('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member=> member.id === parseInt(req.params.id) ))

    }else{
        res.status(400).json({msg: `no member is found with id ${req.params.id}`})
    }
})


//post routes
router.post('/', (req, res)=>{
    const newMember= {
        id : uuid.v4(),
        name: req.body.name,
        profession: req.body.profession,
        status: 'active'
    }
    if(!newMember.name || !newMember.profession){
       return res.status(404).json({msg: '404 not found'})
    }
    members.push(newMember)
    res.json(members)
})

//update 
router.put('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
      const upMember = req.body
      members.forEach(member=>{
          if(member.id === parseInt(req.params.id)){
            member.name = upMember.name ? upMember.name : member.name
            member.profession = upMember.profession ? upMember.profession : member.profession
            res.json({msg: 'member updated',member})
          }
        
      })


    }else{
        res.status(400).json({msg: `no member is found with id ${req.params.id}`})
    }
})
//delete member
router.delete('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json({
            msg: "member deleted",
            members : members.filter(member=> member.id !== parseInt(req.params.id) )
        })
            

    }else{
        res.status(400).json({msg: `no member is found with id ${req.params.id}`})
    }
})


module.exports = router