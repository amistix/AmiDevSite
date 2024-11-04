"use strict"

const avatar = `
                                   AA                                
                                  AAA                                
                                 AAlAA                               
                               5AA  ACA           AA                 
                        tAAAAAA     KRAA     7AAAAAA                 
                    AAA0          ARYiIAAAAAdAx ACA                  
                 AAl   AAAAAAAAAA8A A O  LM AYAAAt                   
               AA HAA     AAAANtMceC A  A  AAPY                      
             AAAA      AAcu  Q WAWA AAAAA A  AAA                     
           AAA       Ab P7AAAAAx        AAt 1  BYAAAAA               
                    AAAA                  AAAA R A ACA               
                  AAA            AAAAAAAAA    U   AAAA               
                 A        AAAAAAA  AA  AA     AAMAA AA               
                 AAAAAAAAA        AA 9A      AA AA AA                
                AAAAA AA         AA AA      AAMAA AAo                
                 AA  AA         AA AA      AA AAAA  ie               
                  AAAA         A  AAAAAAAAAAAAA    qe                
                   AAA       AA  AAAA            imi                 
                      AAAAAAAAAAAA      AAA    pikf                  
                        hi                    hki                    
                        eeeee              eddek                     
                           ee070dgiiihfb88bep                        
                                pliiihnu                             

Comming soon...`

                                
const neofetch = createTerminal("Neofetch", 600, 600, avatar);
const loadingConsole = createTerminal("Status", 200, 100, "Loading...");
const preloader = document.getElementById("preloader");

async function fetchRepos()
{
  const req = await fetch("https://api.github.com/search/repositories?q=@amistix",{
    headers:{
      Accept: "application/vnd.github.v3+json",
    }
  });
  const result = await req.json();
  return result.items;
}

async function loadPage()
{
  const repos = await fetchRepos();
  const repo_frame = document.getElementById("repos-frame");
  repos.forEach(repo => {
    repo_frame.appendChild(createElement("div")
      .attr("class", "repo-frame")
      .attr('onclick',`window.open("${repo.svn_url}")`)
      .textContent(`${repo.name}`)
      .toDOM());
  });
  setTimeout(
    () => {
      preloader.classList.add("done");
      loadingConsole.then((el) => {
        el.children[1].innerText = "$Successfuly!";
        setTimeout(()=>{closeTerminal(el)}, 300);
      });
    }, 1000
  )
}

loadPage();