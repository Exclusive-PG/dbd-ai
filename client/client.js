const config = {
  stealth: 0,
  chase: 0,
  heal: 0,
  aura:0,
  repair:0,
  save:0,
  fun:0
};

const HOST = `https://dbd-ai.onrender.com`

window.addEventListener("load", () => {
  document.querySelectorAll("[data-param]").forEach((item) => {
    item.addEventListener("input", () => {
      config[item.dataset.param] = parseFloat(item.value);
      //console.log(config);
    });
  });

  document.querySelector("#get-one-perk-btn").addEventListener("click",()=>{
    getOnePerkByQuery(config)
  })
  document.querySelector("#get-build-btn").addEventListener("click",()=>{
    getBuildByQuery(config)
  })
});

//config[]

async function getOnePerkByQuery(config) {
  const {stealth,chase,heal,aura,repair,save,fun} = config;
  await fetch(`${HOST}/api/one-perk?stealth=${stealth}&chase=${chase}&heal=${heal}&aura=${aura}&repair=${repair}&save=${save}&fun=${fun}`, {})
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Обработка полученных данных
      document.querySelector(".build_render").innerHTML = `<img src="${HOST}${data.img}">`;
      document.querySelector(".output").innerHTML = `<pre>${JSON.stringify(
        data
      )}</pre>`;
    })

    .catch((error) => console.error(error));
}

async function getBuildByQuery(config) {
  const {stealth,chase,heal,aura,repair,save,fun} = config;
  await fetch(`${HOST}/api/get-build?stealth=${stealth}&chase=${chase}&heal=${heal}&aura=${aura}&repair=${repair}&save=${save}&fun=${fun}`, {})
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Обработка полученных данных
      let resBuildImage = "";
      data.forEach((item) => {
        resBuildImage += `<img src="${HOST}${item.img}">`;
      });
      console.log(resBuildImage)
      document.querySelector(".build_render").innerHTML = resBuildImage;
      document.querySelector(".output").innerHTML = `<pre>${JSON.stringify(
        data
      )}</pre>`;
    })

    .catch((error) => console.error(error));
}
