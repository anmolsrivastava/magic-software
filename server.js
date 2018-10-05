const axios = require('axios')
const fs = require('fs')
const jsonexport = require('jsonexport');

const getData = async (pageNo) => {
    try {
        let res = await axios.get(`http://interviewapi20170221095727.azurewebsites.net/api/users?page_number=${pageNo}`, {
            "auth": {
                "username": "authentica",
                "password": "@uth3nt1c@"
            },
            responseType: 'stream'
        })
        console.log('+++++++++++++++++++++++++++++++',res.status)
        return res
    }
    catch(err) {
        if(err.response && err.response.status===404) {
            return err.response
        }
        else return err
    }
    
}


const retrieveData = async () => {
    try {
        let keys = []
    let pageNo = 1
    let checkStatus
    //let checkStatus = await getData(pageNo)
    //checkStatus.data.pipe(fs.createWriteStream('data.json'))
    //console.log(checkStatus.data)
    do {
        console.log('i==>', pageNo)
        checkStatus = await getData(pageNo)
        ++pageNo
        if(checkStatus.status!==404) {
            await checkStatus.data.pipe(fs.createWriteStream('data.json'))
        }            
    } while(checkStatus && checkStatus.status !== 404)
    console.log('adadasdsas')
    const readData = fs.createReadStream('data.json')
    readData.pipe(jsonexport()).pipe(fs.createWriteStream('output.csv'));
    }
    catch(err) {
        console.log('13123212312',err)
       return err 
    }

}

retrieveData()

/*axios({
    method: 'get',
    url: 'http://interviewapi20170221095727.azurewebsites.net/api/users?page_number=1',
    auth: {
        username: 'authentica',
        password: '@uth3nt1c@'
    },
    responseType: 'stream'
 }).then(response=>{
    console.log(response.data)
    response.data.pipe(writeFile)
 }).catch(err => {

 });*/