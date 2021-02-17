let datas = [
	{
		img: "./image/react-todo-list.png",
		title: "React Todo List",
		description: "A todo list with React, JSX, styled-components.",
		brDescription: "Using Hooks to handle state.",
		github: "https://github.com/kaochihyu/demo/tree/master/react-todo-list",
		demo: "https://kaochihyu.github.io/react-redux-todo-list/",
	},
	{
		img: "./image/twitch-picture-demo.png",
		title: "Twitch Top Game",
		description: "A twitch top game platform.",
		brDescription: "Fetching data with Twitch API",
		github: "https://github.com/kaochihyu/demo/tree/master/twitch",
		demo: "https://kaochihyu.github.io/demo/twitch/",
	},
	{
		img: "./image/message-board.png",
		title: "PHP Message Board",
		description: "A mesage board with PHP, MySQL.",
		brDescription: "Using session to implement member system.",
		github: "https://github.com/kaochihyu/demo/tree/master/message-board",
		demo: "http://chihyu.tw/message-board/index.php",
	},
	{
		img: "./image/rwd-website-demo.png",
		title: "Tap Dance website.",
		description: "A RWD website.",
		brDescription: "Responsive web design web page",
		github: "https://github.com/kaochihyu/demo/tree/master/rwd-websit",
		demo: "https://kaochihyu.github.io/demo/rwd-website/",
	},
];

let projectTemplate = `
	<div class="project_image">
	  <img src="$img" alt="">
	</div>
	<div class="project_description">
	  <div class="project_title">$title</div>
	  <div class="project_content">
	    $description
	    <br>$brDescription
	  </div>
	  <div class="project_link">
	    <a href="$github">GitHub Repo</a> 
	    | <a href="$demo">Demo</a>
	  </div>
	</div>
`;

datas.forEach((data) => {
	let project = document.createElement("div");
	project.classList.add("project");
	let content = projectTemplate
		.replace("$img", data.img)
		.replace("$title", data.title)
		.replace("$description", data.description)
		.replace("$brDescription", data.brDescription)
		.replace("$github", data.github)
		.replace("$demo", data.demo);

	document.querySelector(".project_list").appendChild(project);
	project.innerHTML = content;
});

$(window).scroll(function(evt) {
  if ($(window).scrollTop()<= 0) {
    $("nav").addClass("at_top");
  } else {
    $("nav").removeClass("at_top");
  }
});


