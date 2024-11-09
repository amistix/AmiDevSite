"use strict"

async function loadPage()
{
  const config = await siteConfig;

  const neofetch = new Terminal(600,600, config.avatarIcon.join(" "));
  const loadingConsole = new Terminal(200, 100, "Loading...");
  const preloader = document.getElementById("preloader");

  const repos = await fetchRepos();
  const repo_frame = document.getElementById("repos-frame");
  repos.forEach(repo => {
    repo_frame.appendChild(createElement("div")
      .attr("class", "repo-frame")
      .attr('onclick',`window.open("${repo.svn_url}")`)
      .textContent(`${repo.name}`)
      .toDOM());
  });
  preloader.classList.add("done");
  await sleep(1000);
  loadingConsole.element.children[1].innerText = "$Successfuly!";
  await sleep(100);
  await loadingConsole.closeTerminal();
}

window.onload = loadPage;
