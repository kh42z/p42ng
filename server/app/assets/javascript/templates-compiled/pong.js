(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pong'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<script>\n\n	var WIDTH = 1000;\n	var HEIGHT = 600;\n	var PLAYER_SIZE_Y = HEIGHT / 5;\n	var PLAYER_SIZE_X = WIDTH / 40;\n	var RAYON = 15;\n	var DEFAULT_BALL_SPEED = 15;\n	var DEFAULT_PLAYER_SPEED = 2;\n	var BOXES_OFFSET = 10;\n	var BOXES_SIZE = 300;\n	var DEFAULT_SCORE_TO_WIN = 5;\n\n	var animation;\n\n\n	function getRandomArbitrary(min, max)\n	{\n		return Math.random() * (max - min) + min;\n	}\n\n	function getRandomArbitraryInt(min, max)\n	{\n		if (Math.random() * (max - min) + min <= 0)\n			return (-1);\n		else\n			return (1);\n	}\n\n	class Player\n	{\n		size_y;\n		size_x;\n		x;\n		y;\n		score;\n		name;\n		dir;\n\n		constructor(x, y, name)\n		{\n			this.size_y = PLAYER_SIZE_Y;\n			this.size_x = PLAYER_SIZE_X;\n			this.x = x;\n			this.y = y;\n			this.score = 0;\n			this.name = name;\n			this.dir = 0;\n		}\n\n		move(data)\n		{\n			/*this.dir = getRandomArbitrary(-(this.y), data.ctx.height - this.y);\n			if (this.y + this.dir * 10 < 0 || this.y + this.dir * 10 + this.size_y > data.ctx.height)\n				//this.dir = -this.dir;\n				return ;\n			this.y += this.dir;*/\n			var canvasLocation = data.canvas.getBoundingClientRect();\n			var mouseLocation = event.clientY - canvasLocation.y;\n			this.y = mouseLocation - PLAYER_SIZE_Y / 2;\n			console.log(\"movve player1\");\n		}\n\n		ia(data)\n		{\n			if ((this.x == 0 && data.ball.x > data.ctx.width / 2) || (this.x > 0 &&\n			data.ball.x < data.ctx.width / 2))\n				return ;\n			if ((this.x == 0 && data.ball.dir_x > 0) || (this.x > 0 && data.ball.dir_x < 0))\n				return ;\n			if (data.ball.y <= this.y + this.size_y)\n				this.dir = -1;\n			else\n				this.dir = 1;\n\n			if (this.y + this.dir * DEFAULT_PLAYER_SPEED < 0 || this.y + this.dir * DEFAULT_PLAYER_SPEED + this.size_y > data.ctx.height)\n				//this.dir = -this.dir;\n				return ;\n			this.y += this.dir * DEFAULT_PLAYER_SPEED;\n		}\n\n		reset()\n		{\n	//		this.x = x;\n	//		this.y = y;\n			this.dir = 0;\n			this.score = 0;\n			this.dir = 0;\n		}\n	}\n\n	class Ball\n	{\n		r;\n		x;\n		y;\n		dir_x;\n		dir_y;\n		speed;\n		data;\n\n		constructor(data)\n		{\n			this.data = data;\n			this.reset()\n			this.x = this.data.ctx.width / 2;\n			this.y = this.data.ctx.height / 2;\n			this.r = RAYON;\n		}\n\n		move()\n		{\n			if (this.y <= 0 || this.y >= this.data.ctx.height) // ball hits an y and no player\n			{\n					this.dir_y = -this.dir_y;\n					//console.log(\"ici\");\n			}\n			this.x += this.dir_x;\n			this.y += this.dir_y;\n		}\n\n		reset()\n		{\n			this.x = this.data.ctx.width / 2;\n			this.y = this.data.ctx.height / 2;\n			this.speed = DEFAULT_BALL_SPEED;\n\n			var angle = getRandomArbitrary(0,2 * Math.PI);\n			this.dir_x = Math.cos(angle) * DEFAULT_BALL_SPEED;\n			this.dir_y = Math.sin(angle) * DEFAULT_BALL_SPEED;\n		}\n\n	}\n\n	class Data // main motor\n	{\n		player1;\n		player2;\n		n_players;\n		ball;\n		ctx;\n		canvas;\n		frames;\n\n		constructor(name1, name2)\n		{\n			//data = new Data;\n			this.canvas = document.getElementById(\"game_window\");\n			//if (canvas.getContext)\n			//	var ctx = canvas.getContext(\"2d\");\n			//console.log(\"----------INITIALIZING---------\")\n			this.ctx = this.canvas.getContext(\"2d\");\n			this.ctx.width = WIDTH;\n			this.ctx.height = HEIGHT;\n\n			this.player1 = new Player(0, this.ctx.height / 2 - PLAYER_SIZE_Y / 2, name1);\n			this.player2 = new Player(this.ctx.width - PLAYER_SIZE_X, this.ctx.height / 2 - PLAYER_SIZE_Y / 2, name2);\n			this.ball = new Ball(this);\n			this.frames = 0;\n			this.n_players = 1;\n		}\n\n		move_players() // function for testing with an ia\n		{\n			if (this.n_players == 0)\n			{\n				this.player1.ia(this);\n				this.player2.ia(this);\n			}\n			else if (this.n_players == 1)\n			{\n				this.player2.ia(this);\n			}\n		}\n\n		check_goals()\n		{\n			if (this.ball.x + this.ball.dir_x <= 0 || this.ball.x + this.ball.dir_x >= this.ctx.width)\n			{\n				// ball is out\n				if (this.ball.x + this.ball.dir_x <= 0)\n					this.player2.score += 1;\n				else\n					this.player1.score += 1;\n				this.ball.reset();\n				this.frames = 60;\n				this.message_size = 0;\n				return (1);\n			}\n			return (0);\n		}\n\n		collide()\n		{\n			if (this.ball.x <= this.ctx.width / 2) // player 1\n			{\n				if (this.ball.x <= this.player1.size_x)\n				{\n					if (this.ball.y >= this.player1.y && this.ball.y <= this.player1.y + this.player1.size_y)\n					{\n						console.log(\"yas\");\n						console.log(\"playerx\", this.player1.x, this.player1.y, this.player1.x + this.player1.size_x, this.player1.y + this.player1.y);\n						console.log(\"ball\", this.ball.x, this.ball.y, this.ball.x + this.ball.dir_x, this.ball.y + this.ball.dir_y);\n						this.ball.dir_x = -this.ball.dir_x;\n						this.ball.dir_y = -this.ball.dir_y;\n					}\n				}\n			}\n			else\n			{\n				if (this.ball.x >= this.player2.x)\n				{\n					if (this.ball.y >= this.player2.y && this.ball.y <= this.player2.y + this.player2.size_y)\n					{\n						console.log(\"yas 2\");\n						console.log(\"playerx\", this.player2.x, this.player2.y, this.player2.x + this.player2.size_x, this.player2.y + this.player2.y);\n						console.log(\"ball\", this.ball.x, this.ball.y, this.ball.x + this.ball.dir_x, this.ball.y + this.ball.dir_y);\n						this.ball.dir_x = -this.ball.dir_x;\n						this.ball.dir_y = -this.ball.dir_y;\n					}\n				}\n			}\n		}\n\n		wait_screen()\n		{\n			this.message_size++;\n\n			let px_height = 10 + this.message_size;\n			this.ctx.fillStyle = 'white';\n			this.ctx.font = px_height + 'px serif';\n			this.ctx.textAlign = 'left';\n			this.ctx.textBaseline = 'top';\n\n			let boxes_text = \"BENJAMIN PAVARD!!!!\";\n			//penser a réduire si le nom est trop grand\n			this.ctx.fillText(boxes_text, this.ctx.width / 2, this.ctx.height / 2);\n		}\n\n		check_score()\n		{\n\n		}\n\n		wait()\n		{\n\n		}\n	}\n\n	function draw_base(ctx)\n	{\n		//background\n		ctx.fillStyle = 'black';\n		////console.log(ctx.width);\n		////console.log(ctx.height);\n		//console.log(\"Drawing BACKGROUNG\");\n		ctx.fillRect(0, 0, ctx.width, ctx.height);\n		ctx.strokeStyle = 'white';;\n		ctx.beginPath();\n		ctx.moveTo(ctx.width / 2, 0);\n		ctx.lineTo(ctx.width / 2, ctx.height);\n		ctx.stroke();\n		ctx.closePath();\n	}\n\n	function draw_players(ctx, player1, player2)\n	{\n		//console.log(\"Drawing PLAYERS\");\n		ctx.strokeStyle = 'white';\n		ctx.fillStyle = 'white';\n		ctx.fillRect(player1.x, player1.y, player1.size_x, player1.size_y);\n		ctx.fillRect(player2.x, player2.y, player2.size_x, player2.size_y);\n	}\n\n	function draw_ball(ctx, ball)\n	{\n		//console.log(\"Drawing BALL\");\n		//console.log(\"dir_x: \" + ball.dir_x);\n		//console.log(\"dir_y: \" + ball.dir_y);\n		ctx.beginPath();\n		ctx.strokeStyle = 'purple';\n		ctx.fillStyle = 'purple';\n			ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);\n		ctx.stroke();\n		ctx.fill();\n		ctx.closePath();\n	}\n\n	function draw_boxes(ctx, data)\n	{\n		//console.log(\"Drawing BOXES\");\n\n		let px_height = 24;\n		ctx.fillStyle = 'white';\n		ctx.font = px_height + 'px serif';\n		ctx.textAlign = 'left';\n		ctx.textBaseline = 'top';\n\n		let boxes_text = data.player1.name;\n		//penser a réduire si le nom est trop grand\n		ctx.fillText(boxes_text, 0, 0);\n		boxes_text = \"Score: \" + data.player1.score;\n		ctx.fillText(boxes_text, 0, px_height + 5);\n\n		boxes_text = data.player2.name;\n		ctx.fillText(boxes_text, ctx.width - (ctx.measureText(boxes_text).width), 0);\n		boxes_text = \"Score: \" + data.player2.score;\n		ctx.fillText(boxes_text, ctx.width - (ctx.measureText(boxes_text).width), px_height + 5);\n	}\n\n	//var data = new Data(\"federer\", \"nadal\");\n	/*\n	function draw_winner(ctx, txt, data)\n	{\n		data.frames--;\n		ctx.clearRect(0, 0, ctx.width, ctx.height);\n		draw_base(ctx);\n		ctx.fillStyle = 'white';\n		ctx.font = 24 + 'px serif';\n		ctx.fillText(txt, (ctx.width) - (ctx.measureText(txt).width), ctx.height / 2);\n		window.requestAnimationFrame(function() {});\n	}*/\n\n	function back_to_menu(data, animation)\n	{\n		window.cancelAnimationFrame(animation);\n		data.player1.reset();\n		data.player2.reset();\n		data.ball.reset();\n		menu(data);\n		console.log(\"fini\");\n	}\n\n	function end(data, txt)\n	{\n		window.addEventListener(\"click\", back_to_menu(data, animation), {once: true});\n		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);\n		draw_base(data.ctx);\n		data.ctx.fillStyle = 'white';\n		data.ctx.font = 24 + 'px serif';\n		data.ctx.fillText(txt, (data.ctx.width) - (data.ctx.measureText(txt).width), data.ctx.height / 2);\n		data.ctx.fillText(message, (data.ctx.width) - (data.ctx.measureText(message).width), data.ctx.height / 2);\n		window.requestAnimationFrame(function() {end(data, txt)});\n	}\n\n	function stop(data)\n	{\n		//animation = window.requestAnimationFrame(function() {draw_winner(ctx, boxes_text, data)});\n		//window.cancelAnimationFrame(animation);\n		message = \"\";\n		if (data.player1.score == DEFAULT_SCORE_TO_WIN)\n			message = data.player1.name;\n		else\n			message = data.player2.name;\n		message += \" WINS, GG\";\n		animation = window.requestAnimationFrame(function() {end(data, message);});\n\n	}\n\n	function get_winner(player1, player2)\n	{\n		if (player1.score >= DEFAULT_SCORE_TO_WIN)\n			return (player1);\n		else\n			return (player2);\n	}\n\n	function play(data)\n	{\n			data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);\n\n			if (data.frames <= 0 && !data.check_goals())\n			{\n				data.collide();\n				data.ball.move();\n				data.move_players();\n			}\n\n			draw_base(data.ctx);\n			draw_players(data.ctx, data.player1, data.player2);\n			draw_ball(data.ctx, data.ball);\n			draw_boxes(data.ctx, data);\n			if (data.frames >= 0)\n			{\n				data.wait_screen();\n				data.frames--;\n			}\n			if (data.frames <= 0 && (data.player1.score == DEFAULT_SCORE_TO_WIN || data.player2.score == DEFAULT_SCORE_TO_WIN))\n			{\n				window.cancelAnimationFrame(animation);\n			//	stop(data);\n				data.player1.reset();\n				data.player2.reset();\n				data.ball.reset();\n				menu(data);\n				return ;\n			}\n\n			animation = window.requestAnimationFrame(function() {play(data)});\n	}\n\n	function start_playing(data)\n	{\n	//	window.removeEventListener(\"click\", function() {start_playing(data)}); // marche pas\n		if (data.n_players >= 1)\n			data.canvas.addEventListener(\"mousemove\", function() {data.player1.move(data)});\n		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);\n		draw_base(data.ctx);\n		draw_players(data.ctx, data.player1, data.player2);\n		draw_ball(data.ctx, data.ball);\n		draw_boxes(data.ctx, data);\n\n		/*for (i = 0; i < 1000; i++)\n		{\n			window.requestAnimationFrame(function sleep() {return ;});\n		}*/\n		play(data);\n		//animation = window.requestAnimationFrame(function() {play(data)});\n	}\n\n	function menu(data)\n	{\n		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);\n		data.ctx.fillStyle = 'black';\n		data.ctx.fillRect(0, 0, data.ctx.width, data.ctx.height);\n\n		data.ctx.fillStyle = 'purple';\n		data.ctx.font = 80 + 'px serif';\n		data.ctx.textAlign = 'left';\n		data.ctx.textBaseline = 'top';\n\n		boxes_text = \"Welcome to ultimate pong 3\";\n		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, 50);\n\n		data.ctx.font = 48 + 'px serif';\n		data.ctx.fillStyle = 'pink';\n		boxes_text = \"Computer vs computer\";\n		offset = 200;\n		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset);\n		boxes_text = \"1 player\";\n		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset + 100);\n		boxes_text = \"2 player (not supported yet)\";\n		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset + 200);\n\n		window.addEventListener(\"click\", function() {start_playing(data)}, {once: true});\n		console.log(\"menu\");\n		var canvasLocation = data.canvas.getBoundingClientRect();\n	//	var mouseLocation = event.clientY - canvasLocation.y;\n	}\n\n\n	function main()\n	{\n		let data = new Data(\"federer\", \"nadal\");// = initiate_data(\"name 1\", \"name 2\");\n		n_players = 1;\n		menu(data);\n		console.log(\"bonjour\");\n	}\n</script>\n\n<div class=\"content\">\n<h1>Pong#pong</h1>\n\n<p>\n	<h2>Game</h2>\n</p>\n\n<canvas id=\"game_window\" width=\"1000\" height=\"600\">\n</canvas>\n<script>main()</script>;\n</div>\n";
},"useData":true});
})();