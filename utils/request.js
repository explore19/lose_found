const request = {}
const headers = {}
const baseUrl = "http://39.108.220.199:8000"
//39.108.220.199
let cookie = ''


request.post = (url, data) => {
	headers["Cookie"] = cookie //设置请求头cookie
	return uni.request({
		url: baseUrl + url,
		method: "POST",
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		if (res[1].header['Set-Cookie']) {
			let cookies = res[1].header['Set-Cookie'].split(';')
			for (let i = 0; i < cookies.length; i++) {
				if (cookies[i].indexOf("JSESSIONID") != -1) {
					cookie = cookies[i]
					break
				}
			}
		}
		return res[1].data
	}).catch(resp => {

	})
}

request.get = (url, parmas) => {
	headers["Cookie"] = cookie //设置请求头cookie
	return uni.request({
		url: baseUrl + url,
		method: "GET",
		data: parmas,
		dataType: 'json',
		header: headers
	}).then(res => {
		return res[1].data
	}).catch(resp => {

	})
}

request.put = (url, data) => {
	headers["Cookie"] = cookie //设置请求头cookie
	return uni.request({
		url: baseUrl + url,
		method: "PUT",
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		return res[1].data
	}).catch(resp => {

	})
}

request.delete = (url, id) => {
	headers["Cookie"] = cookie //设置请求头cookie
	return uni.request({
		url: baseUrl + url + '/' + id,
		method: "PUT",
		dataType: 'json',
		header: headers
	}).then(res => {
		return res[1].data
	}).catch(resp => {

	})
}

request.upload = (url, file) => {
	headers["Cookie"] = cookie //设置请求头cookie
	return uni.uploadFile({
		url:  baseUrl + url,
		filePath: file,
		name: "img",
		fileType: "image",
		header:headers
	}).then(res => {
		return res[1].data
	}).catch(resp => {

	})

}




export default request
