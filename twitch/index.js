const baseUrl = "https://api.twitch.tv/kraken";
var template = `
  <a class="block" href="$url">
    <div class="block_top">
      <img src="$preview">
    </div>
    <div class="block_bottom">
      <div class="icon">
        <img src="$logo" alt="">
      </div>
      <div class="channel">
        <div class="channel_title">$title</div>
        <div class="channel_account">$name</div>
      </div>
    </div>
  </a>
  `;

let offset = 0;
// 拿 top 5 的遊戲
function getTopGames(cb) {
  fetch(baseUrl + "/games/top?limit=5", {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": "hwdicbpdwusq387flxfxim7cndokzq",
    },
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((games) => {
      const topGames = games.top.map((game) => game.game.name); //map()可以對 array 裡面的每個項目執行動作後產生新的 array
      cb(topGames);
    })
    .catch((err) => {
      console.log("error", err);
    });
}

function getStreams(name, offset, cb) {
  fetch(
    baseUrl +
      "/streams/?limit=20&offset=" +
      offset +
      "&game=" +
      encodeURIComponent(name),
    {
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": "hwdicbpdwusq387flxfxim7cndokzq",
      },
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      cb(data.streams);
    })
    .catch((err) => {
      console.log("error", err);
    });
}

getTopGames((topGames) => {
  for (let game of topGames) {
    let element = document.createElement("li");
    element.innerHTML = game;
    document.querySelector(".navbar_list").appendChild(element);
    document.querySelector(".title").innerText = topGames[0];
  }
  getStreams(topGames[0], offset, function (data) {
    appendStreams(data);
    addPlaceholder();
    addPlaceholder();
  });
});

document.querySelector(".navbar_list").addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    var text = e.target.innerText;
    document.querySelector(".title").innerText = text;
    document.querySelector(".blocks_area").innerHTML = "";
    getStreams(text, offset, (data) => {
      appendStreams(data);
      addPlaceholder();
      addPlaceholder();
    });
  }
});

document.querySelector(".load_more_button").addEventListener("click", () => {
  offset += 20;
  var text = document.querySelector(".title").innerText;
  getStreams(text, offset, (data) => {
    clearPlaceHolder();
    clearPlaceHolder();
    appendStreams(data);
    addPlaceholder();
    addPlaceholder();
  });
});

function addPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.classList.add("block_empty");
  document.querySelector(".blocks_area").appendChild(placeholder);
}

function clearPlaceHolder() {
  const placeholder = document.querySelector(".block_empty");
  document.querySelector(".blocks_area").removeChild(placeholder);
}

function appendStreams(streams) {
  streams.forEach((stream) => {
    let element = document.createElement("div");
    let content = template
      .replace("$url", stream.channel.url)
      .replace("$preview", stream.preview.large)
      .replace("$logo", stream.channel.logo)
      .replace("$title", stream.channel.status)
      .replace("$name", stream.channel.name);
    document.querySelector(".blocks_area").appendChild(element);
    element.outerHTML = content;
  });
}
