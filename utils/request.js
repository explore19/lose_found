
const request = {}
const headers = {}
const baseUrl="http://localhost:8888"
    //39.108.220.199
request.post = (url, data) => {
	// headers["Cookie"]		//设置请求头cookie
    return uni.request({
        url: baseUrl + url,
        method:"POST",
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
       return res[1].data
    }).catch(resp => {
　　　　
　　})
 } 

request.get = (url, parmas) => {
	// headers["Cookie"]		//设置请求头cookie
    return uni.request({
        url: baseUrl + url,
        method:"GET",
        data: parmas,
        dataType: 'json',
        header: headers
    }).then(res => {
      return res[1].data
    }).catch(resp => {
　　　　
　　})
 } 
 
 request.put = (url, data) => {
 	// headers["Cookie"]		//设置请求头cookie
     return uni.request({
         url: baseUrl + url,
         method:"PUT",
         data: data,
         dataType: 'json',
         header: headers
     }).then(res => {
		return res[1].data
     }).catch(resp => {
 　　　　
 　　})
  } 
  
  request.delete = (url, id) => {
  	// headers["Cookie"]		//设置请求头cookie
      return uni.request({
          url: baseUrl + url+'/'+id,
          method:"PUT",
          dataType: 'json',
          header: headers
      }).then(res => {
           return res[1].data
      }).catch(resp => {
  　　　　
  　　})
   } 
  


export default request