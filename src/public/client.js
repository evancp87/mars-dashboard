// store using ImmutableJS
let store = Immutable.Map({
  apod: "",
  selectedRover: "Curiosity",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  roverImages: [],
  roverData: {},
});

// adds our markup to the page
const root = document.getElementById("root");

// updates Immutable store object
const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(
    state,
    sidebar,
    tabs,
    renderRoverImages,
    roverFact,
    displayRoverInfo
  );
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  getRoverImage(store.get("selectedRover"));
  getRoverInfo(store.get("selectedRover"));
  render(root, store);
});

// ========================================================================================================================================

// Dashboard components

// A button for each rover
const tabs = () => {
  const tabBtns = () => store.get("rovers");
  return tabBtns()
    .map((el) => {
      return `<button class='rover-section__btn-tab' id='${el}' onClick='displayRoverInfo(${el})'>${el}</button>`;
    })
    .join("");
};

// button for each rover- displays info in sidebar and main section onclick. displayRoverInfo renders sidebar

const sidebar = () => {
  const roverData = store.get("roverData");
  const selectedRover = store.get("selectedRover");
  console.log(roverData);

  if (roverData.hasOwnProperty("rover")) {
    return `
  <h2 class='sidebar__rover-name'>${roverData.rover.get("name")}</h2>
  <div><img src='/assets/images/${
    roverData.rover.get("name") + ".jpg"
  }' alt='rover image' class='sidebar__main-rover-img'>
  <ul class='sidebar__rover-info'>
  <li class='sidebar__roverinfo-item'><span>Landing Date:</span> ${roverData.rover.get(
    "landing_date"
  )} </li>
  <li class='sidebar__roverinfo-item'><span>Launch Date:</span> ${roverData.rover.get(
    "launch_date"
  )} </li>
  <li class='sidebar__roverinfo-item'><span>Status:</span> ${roverData.rover.get(
    "status"
  )} </li>
  <li class='sidebar__roverinfo-item'><span>Date of last image:</span> ${roverData.rover.get(
    "max_date"
  )} </li>
  ${roverFact(roverData.rover.get("name"))}

  </ul>`;
    // );
  }
  return "<p class='sidebar__loading-rovers'>Loading Data</p>";
};

// OnClick function- displays each selected rover
const displayRoverInfo = (el) => {
  let selectedRover = store.get("selectedRover");
  let roverData = store.get("roverData");
  let roverImages = store.get("roverImages");

  if (el.id === "Curiosity") {
    updateStore(store, {
      selectedRover: "Curiosity",
      roverData: getRoverInfo("Curiosity"),
      roverImages: getRoverImage("Curiosity"),
    });
    console.log(store);
  } else if (el.id === "Spirit") {
    updateStore(store, {
      selectedRover: "Spirit",
      roverData: getRoverInfo("Spirit"),
      roverImages: getRoverImage("Spirit"),
    });
    console.log(store);
  } else if (el.id === "Opportunity") {
    updateStore(store, {
      selectedRover: "Opportunity",
      roverData: getRoverInfo("Opportunity"),
      roverImages: getRoverImage("Opportunity"),
    });
    console.log(store);
  }
  return selectedRover;
};

// Renders a fact based on the rover selected
const roverFact = (roverData) => {
  if (roverData == "Curiosity") {
    return "<p class='sidebar__rover-fact'>Curiositys mission is to determine whether the Red Planet ever was habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments. </p>";
  } else if (roverData == "Opportunity") {
    return "<p class='sidebar__rover-fact'> Opportunity was the second of the two rovers launched in 2003 to land on Mars and begin traversing the Red Planet in search of signs of ancient water. The rover explored the Martian terrain for almost 15 years, far outlasting her planned 90-day mission.</p>";
  } else if (roverData == "Spirit") {
    return "<p class='sidebar__rover-fact'>Spirit is just north of a low plateau called \"Home Plate.\" It spent 2008 on a north-facing slope on the edge of Home Plate so that its solar panels stayed tilted toward the winter sun for maximum electrical output.</p>";
  }
};

// returns a sliced array of latest images for each rover
const renderRoverImages = () => {
  const imageGallery = store.get("roverImages");
  console.log(imageGallery);

  const imageGallerySlice = imageGallery.slice(0, 10);
  console.log(imageGallerySlice);
  console.log(
    imageGallerySlice.map((image) => image.hasOwnProperty("img_src"))
  );

  if (imageGallerySlice !== undefined) {
    return imageGallerySlice
      .map((image) => {
        return `
  <div class='main-content__scroll-item'>
          <img src="${image.img_src}">
      </div>
      `;
      })
      .join(" ");
  } else return "<p class='main-content__loading-images'>Loading Images</p>";
};

// App higher order function
const App = (state) => {
  const apod = state.get("apod");
  const selectedRover = state.get("selectedRover");
  const roverData = state.get("roverData");
  const rovers = state.get("rovers");

  const roverImages = state.get("roverImages");
  return `
  
  <header class="hero" >
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
        <button class='hero__scroll-down'><span class='hero__crater1'></span><span class='hero__crater2'></span><span class='hero__crater3'></span></button>
         </header>
         <main>
  <section>
      <div class="mars-intro">
          <h1 class="mars-intro__title">
              Mars Rover
          </h1>
         
          <p class="mars-intro__text">
          Since the 1960s, humans have set out to discover what Mars can teach us about how planets grow and evolve, and whether it has ever hosted alien life. Mars has captivated humans since we first set eyes on it as a star-like object in the night sky. Early on, its reddish hue set the planet apart from its shimmering siblings, each compelling in its own way, but none other tracing a ruddy arc through Earth’s heavens. Then, in the late 1800s, telescopes first revealed a surface full of intriguing features—patterns and landforms that scientists at first wrongly ascribed to a bustling Martian civilization. Now, we know there are no artificial constructions on Mars. But we’ve also learned that, until 3.5 billion years ago, the dry, toxic planet we see today might have once been as habitable as Earth.
          Mars exploration at NASA "follows the water." Earlier missions had found that liquid water existed on Mars in the distant past.</br></br> The Curiosity rover explored the “habitability” of Mars. It found nutrients and energy sources that microbes could have used, and established that Mars indeed had regions that could have been friendly to life in the ancient past. Did life take hold on the Red Planet? Future rovers will take the next step by looking for the signs of past life itself.
          </p>


      </div>
  </section>
<section class='rover-section'>
<div class='rover-section__tabs-container'>
<div class='rover-section__btn-container'>${tabs(
    state,
    rovers,
    roverImages,
    displayRoverInfo
  )}</div>
<div class='sidebar__flex-container'>
<aside class='sidebar sidebar--blue'>${sidebar(roverData, state)}</aside>
<article class='main-content main-content--red'>
<div class='main-content__tabs-panel'>
<div><h3 class='main-content__latest-photos-title'>Latest Photos</h3></div>
<div class='main-content__scroller main-content--snaps-inline'>
${renderRoverImages(selectedRover, roverImages, state)}
</div>
</div>
</div>
</div>
</article>
<div id='photo' class='imgOfDayWrapper' >${ImageOfTheDay(apod, state)}</div>
</section>
</main>
<footer class="ftr">
        <div class="ftr__copyright">Made on 🌎 in 2022 by Evan Parker 🚀🪐</div>
        <div class="ftr__info">All images and information from the Nasa Api. <a
            href="https://api.nasa.gov/">More information</a></div>
    </footer>
`;
};

// =======================================================================================================================================================

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.hasOwnProperty("media_type") || apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            
            <p class=''>${apod.title}</p>
            <p class=''>${apod.explanation}</p>
        `;
  } else if (apod.hasOwnProperty("image")) {
    return `
            <img class='imgOfDay' src="${apod.image.url}" height="350px" width="100%" />
            <p class='imgOfDay__Txt'>${apod.image.explanation}</p>
        `;
  }
  return "<p class='loading-apod'>Loading Picture of the Day</p>";
};

// =================================================================================================================================================

// ------------------------------------------------------  API CALLS

// Api call to fetch image of the day
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch("http://localhost:3000/apod")
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));
};

// =================================================================================================================================================

// =============================================================================================================================================================================================

// api call to fetch an array of latest rover images
const getRoverImage = (rover) => {
  const images = fetch(`http://localhost:3000/rovers/${rover}`)
    .then((res) => res.json())
    .then((rovers) => {
      console.log(rovers);
      let roverImages = rovers.image.latest_photos;
      updateStore(store, { roverImages: roverImages });
      console.log(store);
    });
};

// api call to fetch rover data from the manifests
const getRoverInfo = (chosenRover) => {
  const roverInfo = fetch(`http://localhost:3000/manifests/${chosenRover}`)
    .then((res) => res.json())

    .then((rover) => {
      const roverData = rover.data.photo_manifest;
      const { landing_date, launch_date, max_date, max_sol, name, status } =
        roverData;
      console.log(roverData);
      updateStore(store, {
        roverData: {
          rover: Immutable.Map({
            landing_date,
            launch_date,
            max_date,
            max_sol,
            name,
            status,
          }),
        },
      });
      console.log(store);
    });
};

// ================================================================================================================================
