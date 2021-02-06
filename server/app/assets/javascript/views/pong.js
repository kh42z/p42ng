let script = `
<script>

	var WIDTH = 1000;
	var HEIGHT = 600;
	var PLAYER_SIZE_Y = HEIGHT / 5;
	var PLAYER_SIZE_X = WIDTH / 40;
	var RAYON = 15;
	var DEFAULT_BALL_SPEED = 15;
	var DEFAULT_PLAYER_SPEED = 2;
	var BOXES_OFFSET = 10;
	var BOXES_SIZE = 300;
	var DEFAULT_SCORE_TO_WIN = 5;

	var animation;


	function getRandomArbitrary(min, max)
	{
		return Math.random() * (max - min) + min;
	}

	function getRandomArbitraryInt(min, max)
	{
		if (Math.random() * (max - min) + min <= 0)
			return (-1);
		else
			return (1);
	}

	class Player
	{
		size_y;
		size_x;
		x;
		y;
		score;
		name;
		dir;

		constructor(x, y, name)
		{
			this.size_y = PLAYER_SIZE_Y;
			this.size_x = PLAYER_SIZE_X;
			this.x = x;
			this.y = y;
			this.score = 0;
			this.name = name;
			this.dir = 0;
		}

		move(data)
		{
			/*this.dir = getRandomArbitrary(-(this.y), data.ctx.height - this.y);
			if (this.y + this.dir * 10 < 0 || this.y + this.dir * 10 + this.size_y > data.ctx.height)
				//this.dir = -this.dir;
				return ;
			this.y += this.dir;*/
			var canvasLocation = data.canvas.getBoundingClientRect();
			var mouseLocation = event.clientY - canvasLocation.y;
			this.y = mouseLocation - PLAYER_SIZE_Y / 2;
			console.log("movve player1");
		}

		ia(data)
		{
			if ((this.x == 0 && data.ball.x > data.ctx.width / 2) || (this.x > 0 &&
			data.ball.x < data.ctx.width / 2))
				return ;
			if ((this.x == 0 && data.ball.dir_x > 0) || (this.x > 0 && data.ball.dir_x < 0))
				return ;
			if (data.ball.y <= this.y + this.size_y)
				this.dir = -1;
			else
				this.dir = 1;

			if (this.y + this.dir * DEFAULT_PLAYER_SPEED < 0 || this.y + this.dir * DEFAULT_PLAYER_SPEED + this.size_y > data.ctx.height)
				//this.dir = -this.dir;
				return ;
			this.y += this.dir * DEFAULT_PLAYER_SPEED;
		}

		reset()
		{
	//		this.x = x;
	//		this.y = y;
			this.dir = 0;
			this.score = 0;
			this.dir = 0;
		}
	}

	class Ball
	{
		r;
		x;
		y;
		dir_x;
		dir_y;
		speed;
		data;

		constructor(data)
		{
			this.data = data;
			this.reset()
			this.x = this.data.ctx.width / 2;
			this.y = this.data.ctx.height / 2;
			this.r = RAYON;
		}

		move()
		{
			if (this.y <= 0 || this.y >= this.data.ctx.height) // ball hits an y and no player
			{
					this.dir_y = -this.dir_y;
					//console.log("ici");
			}
			this.x += this.dir_x;
			this.y += this.dir_y;
		}

		reset()
		{
			this.x = this.data.ctx.width / 2;
			this.y = this.data.ctx.height / 2;
			this.speed = DEFAULT_BALL_SPEED;

			var angle = getRandomArbitrary(0,2 * Math.PI);
			this.dir_x = Math.cos(angle) * DEFAULT_BALL_SPEED;
			this.dir_y = Math.sin(angle) * DEFAULT_BALL_SPEED;
		}

	}

	class Data // main motor
	{
		player1;
		player2;
		n_players;
		ball;
		ctx;
		canvas;
		frames;

		constructor(name1, name2)
		{
			//data = new Data;
			this.canvas = document.getElementById("game_window");
			//if (canvas.getContext)
			//	var ctx = canvas.getContext("2d");
			//console.log("----------INITIALIZING---------")
			this.ctx = this.canvas.getContext("2d");
			this.ctx.width = WIDTH;
			this.ctx.height = HEIGHT;

			this.player1 = new Player(0, this.ctx.height / 2 - PLAYER_SIZE_Y / 2, name1);
			this.player2 = new Player(this.ctx.width - PLAYER_SIZE_X, this.ctx.height / 2 - PLAYER_SIZE_Y / 2, name2);
			this.ball = new Ball(this);
			this.frames = 0;
			this.n_players = 1;
		}

		move_players() // function for testing with an ia
		{
			if (this.n_players == 0)
			{
				this.player1.ia(this);
				this.player2.ia(this);
			}
			else if (this.n_players == 1)
			{
				this.player2.ia(this);
			}
		}

		check_goals()
		{
			if (this.ball.x + this.ball.dir_x <= 0 || this.ball.x + this.ball.dir_x >= this.ctx.width)
			{
				// ball is out
				if (this.ball.x + this.ball.dir_x <= 0)
					this.player2.score += 1;
				else
					this.player1.score += 1;
				this.ball.reset();
				this.frames = 60;
				this.message_size = 0;
				return (1);
			}
			return (0);
		}

		collide()
		{
			if (this.ball.x <= this.ctx.width / 2) // player 1
			{
				if (this.ball.x <= this.player1.size_x)
				{
					if (this.ball.y >= this.player1.y && this.ball.y <= this.player1.y + this.player1.size_y)
					{
						console.log("yas");
						console.log("playerx", this.player1.x, this.player1.y, this.player1.x + this.player1.size_x, this.player1.y + this.player1.y);
						console.log("ball", this.ball.x, this.ball.y, this.ball.x + this.ball.dir_x, this.ball.y + this.ball.dir_y);
						this.ball.dir_x = -this.ball.dir_x;
						this.ball.dir_y = -this.ball.dir_y;
					}
				}
			}
			else
			{
				if (this.ball.x >= this.player2.x)
				{
					if (this.ball.y >= this.player2.y && this.ball.y <= this.player2.y + this.player2.size_y)
					{
						console.log("yas 2");
						console.log("playerx", this.player2.x, this.player2.y, this.player2.x + this.player2.size_x, this.player2.y + this.player2.y);
						console.log("ball", this.ball.x, this.ball.y, this.ball.x + this.ball.dir_x, this.ball.y + this.ball.dir_y);
						this.ball.dir_x = -this.ball.dir_x;
						this.ball.dir_y = -this.ball.dir_y;
					}
				}
			}
		}

		wait_screen()
		{
			this.message_size++;

			let px_height = 10 + this.message_size;
			this.ctx.fillStyle = 'white';
			this.ctx.font = px_height + 'px serif';
			this.ctx.textAlign = 'left';
			this.ctx.textBaseline = 'top';

			let boxes_text = "BENJAMIN PAVARD!!!!";
			//penser a réduire si le nom est trop grand
			this.ctx.fillText(boxes_text, this.ctx.width / 2, this.ctx.height / 2);
		}

		check_score()
		{

		}

		wait()
		{

		}
	}

	function draw_base(ctx)
	{
		//background
		ctx.fillStyle = 'black';
		////console.log(ctx.width);
		////console.log(ctx.height);
		//console.log("Drawing BACKGROUNG");
		ctx.fillRect(0, 0, ctx.width, ctx.height);
		ctx.strokeStyle = 'white';;
		ctx.beginPath();
		ctx.moveTo(ctx.width / 2, 0);
		ctx.lineTo(ctx.width / 2, ctx.height);
		ctx.stroke();
		ctx.closePath();
	}

	function draw_players(ctx, player1, player2)
	{
		//console.log("Drawing PLAYERS");
		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'white';
		ctx.fillRect(player1.x, player1.y, player1.size_x, player1.size_y);
		ctx.fillRect(player2.x, player2.y, player2.size_x, player2.size_y);
	}

	function draw_ball(ctx, ball)
	{
		//console.log("Drawing BALL");
		//console.log("dir_x: " + ball.dir_x);
		//console.log("dir_y: " + ball.dir_y);
		ctx.beginPath();
		ctx.strokeStyle = 'purple';
		ctx.fillStyle = 'purple';
			ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	function draw_boxes(ctx, data)
	{
		//console.log("Drawing BOXES");

		let px_height = 24;
		ctx.fillStyle = 'white';
		ctx.font = px_height + 'px serif';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';

		let boxes_text = data.player1.name;
		//penser a réduire si le nom est trop grand
		ctx.fillText(boxes_text, 0, 0);
		boxes_text = "Score: " + data.player1.score;
		ctx.fillText(boxes_text, 0, px_height + 5);

		boxes_text = data.player2.name;
		ctx.fillText(boxes_text, ctx.width - (ctx.measureText(boxes_text).width), 0);
		boxes_text = "Score: " + data.player2.score;
		ctx.fillText(boxes_text, ctx.width - (ctx.measureText(boxes_text).width), px_height + 5);
	}

	//var data = new Data("federer", "nadal");
	/*
	function draw_winner(ctx, txt, data)
	{
		data.frames--;
		ctx.clearRect(0, 0, ctx.width, ctx.height);
		draw_base(ctx);
		ctx.fillStyle = 'white';
		ctx.font = 24 + 'px serif';
		ctx.fillText(txt, (ctx.width) - (ctx.measureText(txt).width), ctx.height / 2);
		window.requestAnimationFrame(function() {});
	}*/

	function back_to_menu(data, animation)
	{
		window.cancelAnimationFrame(animation);
		data.player1.reset();
		data.player2.reset();
		data.ball.reset();
		menu(data);
		console.log("fini");
	}

	function end(data, txt)
	{
		window.addEventListener("click", back_to_menu(data, animation), {once: true});
		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);
		draw_base(data.ctx);
		data.ctx.fillStyle = 'white';
		data.ctx.font = 24 + 'px serif';
		data.ctx.fillText(txt, (data.ctx.width) - (data.ctx.measureText(txt).width), data.ctx.height / 2);
		data.ctx.fillText(message, (data.ctx.width) - (data.ctx.measureText(message).width), data.ctx.height / 2);
		window.requestAnimationFrame(function() {end(data, txt)});
	}

	function stop(data)
	{
		//animation = window.requestAnimationFrame(function() {draw_winner(ctx, boxes_text, data)});
		//window.cancelAnimationFrame(animation);
		message = "";
		if (data.player1.score == DEFAULT_SCORE_TO_WIN)
			message = data.player1.name;
		else
			message = data.player2.name;
		message += " WINS, GG";
		animation = window.requestAnimationFrame(function() {end(data, message);});

	}

	function get_winner(player1, player2)
	{
		if (player1.score >= DEFAULT_SCORE_TO_WIN)
			return (player1);
		else
			return (player2);
	}

	function play(data)
	{
			data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);

			if (data.frames <= 0 && !data.check_goals())
			{
				data.collide();
				data.ball.move();
				data.move_players();
			}

			draw_base(data.ctx);
			draw_players(data.ctx, data.player1, data.player2);
			draw_ball(data.ctx, data.ball);
			draw_boxes(data.ctx, data);
			if (data.frames >= 0)
			{
				data.wait_screen();
				data.frames--;
			}
			if (data.frames <= 0 && (data.player1.score == DEFAULT_SCORE_TO_WIN || data.player2.score == DEFAULT_SCORE_TO_WIN))
			{
				window.cancelAnimationFrame(animation);
			//	stop(data);
				data.player1.reset();
				data.player2.reset();
				data.ball.reset();
				menu(data);
				return ;
			}

			animation = window.requestAnimationFrame(function() {play(data)});
	}

	function start_playing(data)
	{
	//	window.removeEventListener("click", function() {start_playing(data)}); // marche pas
		if (data.n_players >= 1)
			data.canvas.addEventListener("mousemove", function() {data.player1.move(data)});
		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);
		draw_base(data.ctx);
		draw_players(data.ctx, data.player1, data.player2);
		draw_ball(data.ctx, data.ball);
		draw_boxes(data.ctx, data);

		/*for (i = 0; i < 1000; i++)
		{
			window.requestAnimationFrame(function sleep() {return ;});
		}*/
		play(data);
		//animation = window.requestAnimationFrame(function() {play(data)});
	}

	function menu(data)
	{
		data.ctx.clearRect(0, 0, data.ctx.width, data.ctx.height);
		data.ctx.fillStyle = 'black';
		data.ctx.fillRect(0, 0, data.ctx.width, data.ctx.height);

		data.ctx.fillStyle = 'purple';
		data.ctx.font = 80 + 'px serif';
		data.ctx.textAlign = 'left';
		data.ctx.textBaseline = 'top';

		boxes_text = "Welcome to ultimate pong 3";
		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, 50);

		data.ctx.font = 48 + 'px serif';
		data.ctx.fillStyle = 'pink';
		boxes_text = "Computer vs computer";
		offset = 200;
		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset);
		boxes_text = "1 player";
		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset + 100);
		boxes_text = "2 player (not supported yet)";
		data.ctx.fillText(boxes_text, (data.ctx.width / 2) - (data.ctx.measureText(boxes_text).width) / 2, offset + 200);

		window.addEventListener("click", function() {start_playing(data)}, {once: true});
		console.log("menu");
		var canvasLocation = data.canvas.getBoundingClientRect();
	//	var mouseLocation = event.clientY - canvasLocation.y;
	}


	function main()
	{
		let data = new Data("federer", "nadal");// = initiate_data("name 1", "name 2");
		n_players = 1;
		menu(data);
		console.log("bonjour");
	}
</script>


<body onload="main();">


<header>
<div id="header">
<h1 class="header"><strong>Ultimate pong 3 redux</strong></h1>
</header>

<h1>Pong#pong</h1>
<p>Find me in app/views/pong/pong.html.erb</p>

<section id="suprasection">
<section>

<p>
	<h2>Game</h2>
</p>
</section>

<canvas id="game_window" width="1000" height="600">
</canvas>
</section>`

// eslint-disable-next-line no-undef
const PongView = Backbone.View.extend({
  // eslint-disable-next-line no-undef
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
    this.$el.html('pong page')
  }
})
export const pongView = new PongView()
