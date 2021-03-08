REX.HMI.init = function () {

	var ip_ = "192.168.1.221:8008"
	REX.HMI.setTargetUrl(ip_);


	REX.HMI.setRefreshRate(200);

	var canvas = document.getElementById("canvas");
	var canvas1 = document.getElementById("canvas1");
	
	var ctx = canvas.getContext('2d');
	var ctx1 = canvas1.getContext('2d');

	REX.HMI.addItem({alias: "P_D", cstring: "roboslunecnice.Slunecnice:dolni"});               
	REX.HMI.addItem({alias: "P_H", cstring: "roboslunecnice.Slunecnice:horni"}); 
	REX.HMI.addItem({alias: "S1", cstring: "roboslunecnice.Slunecnice:a1"});       
	REX.HMI.addItem({alias: "S2", cstring: "roboslunecnice.Slunecnice:a2"});         
	REX.HMI.addItem({alias: "S3", cstring: "roboslunecnice.Slunecnice:a3"});       
	
	REX.HMI.addItem({alias: "ph_", cstring:"roboslunecnice.Slunecnice.CNR_horni:ycn", write: true});
	REX.HMI.addItem({alias: "pd_", cstring:"roboslunecnice.Slunecnice.CNR_dolni:ycn", write: true});
	REX.HMI.addItem({alias: "rh_", cstring:"roboslunecnice.Slunecnice.CNI_horni:icn", write: true});
	REX.HMI.addItem({alias: "rd_", cstring:"roboslunecnice.Slunecnice.CNI_dolni:icn", write: true});

	REX.HMI.addItem({alias: "RESTART", cstring:"roboslunecnice.MP_restart:BSTATE", write: true}) ;
	REX.HMI.addItem({alias: "SWITCH", cstring:"roboslunecnice.Slunecnice.CNB_MAN:YCN", write: true});
	
	REX.HMI.$i("S1").on("change", function (itm) {
		$('#s1rv').val(itm.getValue());
	});

	REX.HMI.$i("S2").on("change", function (itm) {
		$('#s2rv').val(itm.getValue());
	});

	REX.HMI.$i("S3").on("change", function (itm) {
		$('#s3rv').val(itm.getValue());
	});

	REX.HMI.$i("P_H").on("change", function (itm) {
		var value = itm.getValue();
		$('#ph').val(value);
		var resval = value*90;
		updateCanvas(resval);
	});

	REX.HMI.$i("P_D").on("change", function (itm) {
		var value = itm.getValue();
		$('#pd').val(value);
		var resval = value*360-0.001;
		updateTopCanvas(resval);
	});

	$("#ph").on('change', function() {
		var value = $("#ph").val();
		REX.HMI.$i("ph_").write(parseFloat(value));
		var resval = value*90;
		updateCanvas(resval);
	  });

	$("#pd").on('change', function() {
		var value = $("#pd").val();
		REX.HMI.$i("pd_").write(parseFloat(value));
		var resval = value*360-0.001;
		updateTopCanvas(resval);
	  });

	$("#rh").on('change', function() {
		var value = $("#rh").val();
		REX.HMI.$i("rh_").write(parseFloat(value));
	  });

	$("#rd").on('change', function() {
		var value = $("#rd").val();
		REX.HMI.$i("rd_").write(parseFloat(value));
	  });

	$('#restart').on("click", function(){ 
		console.log("RESTART");
		REX.HMI.$i("RESTART").write(1);
	});

	document.getElementById("pd").style.visibility = 'visible';
	document.getElementById("ph").style.visibility = 'visible';
	document.getElementById("rd").style.visibility = 'visible';
	document.getElementById("rh").style.visibility = 'visible';

	$('input:radio[name = radio]').on("change", function () {
		var value = $('#val-0').prop("checked");

		if (value) {
			REX.HMI.$i("SWITCH").write(0);
			document.getElementById("rd").style.visibility = 'visible';
			document.getElementById("rh").style.visibility = 'visible';
			document.getElementById("pd").style.visibility = 'visible';
			document.getElementById("ph").style.visibility = 'visible';

			document.getElementById('restart').style.visibility = 'visible';
		}
		else {
			REX.HMI.$i("SWITCH").write(1);
			document.getElementById("rd").style.visibility = 'visible';
			document.getElementById("rh").style.visibility = 'visible';
			document.getElementById("pd").style.visibility = 'visible';
			document.getElementById("ph").style.visibility = 'visible';

			document.getElementById('restart').style.visibility = 'visible';
		}
		REX.HMI.log.info("Switched to " + value);
	});
	function staticCanvas(){
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.moveTo(125,125);
		ctx.lineTo(125,250);
		ctx.lineWidth = 7;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(63, 250);
		ctx.bezierCurveTo(125, 200, 125, 200, 189, 250);
		ctx.stroke();
		ctx.closePath();
		ctx.lineWidth = 5;
		ctx.fillStyle = '#4d310d';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(115, 125 );
		ctx.bezierCurveTo(120, 110, 130, 110, 135, 125);
		ctx.stroke();
		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.fillStyle = '#4d310d';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
}
	function updateCanvas(tempval){
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(125,112.5);
		ctx.rotate((Math.PI / 180) * tempval);
		ctx.translate(-125, -112.5);
		ctx.moveTo(125,115);
		ctx.lineTo(125,100);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(125,60,40,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = '#fdee19';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(125,60,5,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = '#754814';
		ctx.fill();
		
		staticCanvas();
	}
	function updateTopCanvas(tempval){
		ctx1.setTransform(1, 0, 0, 1, 0, 0);
		ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
		ctx1.translate(125,125);
		ctx1.rotate((Math.PI / 180) * tempval);
		ctx1.translate(-125, -125);
		ctx1.moveTo(125,100);
		ctx1.bezierCurveTo(60,100,60,150,125,150);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.moveTo(125,100);
		ctx1.bezierCurveTo(205,100,205,150,125,150);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.moveTo(80,125);
		ctx1.bezierCurveTo(150,70,100,70,180,125);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.moveTo(80,125);
		ctx1.bezierCurveTo(150,180,100,180,180,125);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.moveTo(100,110);
		ctx1.bezierCurveTo(45,115,45,140,100,140);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.moveTo(150,110);
		ctx1.bezierCurveTo(215,115,215,135,150,140);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.lineWidth = 3;
		ctx1.fillStyle = 'yellow';
		ctx1.fill();
		ctx1.strokeStyle = 'yellow';
	
		ctx1.beginPath();
		ctx1.arc(125,125,6,0,2*Math.PI);
		ctx1.stroke();
		ctx1.fillStyle = '#754814';
		ctx1.fill();
	}
}