function getXmlHttp() {
    return (new XMLHttpRequest())||(new ActiveXObject("Microsoft.XMLHTTP");
}

function highScoresOnLoad() {
    // div called id=highScoreDiv
    var xmlhttp=getXmlHttp();
    xmlhttp.onreadystatechange=()=>{
	    if (xmlhttp.readyState==4&&xmlhttp.status==200) {
	        var response=jsonParse(xmlhttp.responseText),
	        let dailyScoreList=response.dailyScores,
	        let dailyOutput='<table class="highScoreTable"><tr class="highScoreTableHeader"><td>#</td><td>Name</td><td>Score</td></tr>';
	        for (let i in dailyScoreList) {
		        curScore=dailyScoreList[i];
		        dailyOutput+=`<tr><td>${(i+1)}</td><td>${curScore.name}</td><td>${curScore.score}</td></tr>`;
	        }
	        dailyOutput+='</table>';
	        document.getElementById("dailyScoreDiv").innerHTML=dailyOutput;
	    }
    }

    xmlhttp.open("POST", "/score/tables", true);
    xmlhttp.send();
}
