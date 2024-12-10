import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<button id="get-access">Get access to camera</button>
<video autoplay muted="" playsinline="" width="500" height="500" ></video>
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<button id="show-capabilities">Show capabilities</button>
<button id="change-camera">Change camera</button>
<button id="flash">Flash</button>
<button id="zoom">Zoom</button>
<button id="luminosity">Luminosità</button>

`;
let stream: MediaStream | null = null;
async function init() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {},
    });
    const videoTracks = stream.getVideoTracks();
    const track = videoTracks[0];
    document.querySelector("video")!.srcObject = stream;
    document.querySelector("#get-access")!.setAttribute("hidden", "true");
  } catch (error: any) {
    alert(`${error}`);
    console.error(error);
  }
}

init();
let facingMode = true;
document
  .querySelector("#change-camera")!
  .addEventListener("click", async () => {
    facingMode = !facingMode;
    const tracks = stream!.getVideoTracks();
    tracks.forEach((t) => t.stop());
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: facingMode ? "user" : "environment" },
      },
      audio: false,
    });
    document.querySelector("video")!.srcObject = stream;
  });
let flash = false;
document.querySelector("#flash")!.addEventListener("click", async () => {
  flash = !flash;

  const track = stream!.getVideoTracks()[0];

  //Create image capture object and get camera capabilities
  //@ts-ignore

  //todo: check if camera has a torch

  //let there be light!
  track.applyConstraints({
    // @ts-ignore
    advanced: [{ torch: flash, zoom: flash ? 2 : 1 }],
  });
});

let zoom = false;
document.querySelector("#zoom")!.addEventListener("click", async () => {
  const track = stream!.getVideoTracks()[0];

  zoom = !zoom;

  //Create image capture object and get camera capabilities
  //@ts-ignore

  //todo: check if camera has a torch

  //let there be light!
  track.applyConstraints({
    // @ts-ignore
    advanced: [{ zoom: zoom ? 2 : 1 }],
  });
});

let luminosity = false;
document.querySelector("#luminosity")!.addEventListener("click", async () => {
  const track = stream!.getVideoTracks()[0];

  luminosity = !luminosity;

  //Create image capture object and get camera capabilities
  //@ts-ignore

  //todo: check if camera has a torch

  //let there be light!
  track.applyConstraints({
    // @ts-ignore
    advanced: [{ exposureCompensation: luminosity ? 4 : 0 }],
  });
});
document
  .querySelector("#show-capabilities")!
  .addEventListener("click", async () => {
    const track = stream!.getVideoTracks()[0];
    alert(JSON.stringify(track.getCapabilities()));
  });
