
function downloadAndRenameFile(url=fusekiUrlConfig){
	window.URL = window.URL || window.webkitURL;
	var xhr = new XMLHttpRequest(),
		  a = document.createElement('a'), file;
	xhr.open('GET', url, true);
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function x () {
		if(xhr.readyState == 4){
			file = new Blob([xhr.response], { type : 'application/octet-stream' });
			a.href = window.URL.createObjectURL(file);
			a.download = 'graph.ttl';
			a.click();
		}
	};
	xhr.send();
}
