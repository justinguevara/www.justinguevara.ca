import MainNavigation from "components/MainNavigation";
import { useState } from "react";

const music_list: Object = {
    "1" : {
        "label" : "Piano 2 | Hero's Welcome",
        "date" : "December 2020",
        "file_source" : "/sOQZD1gNcon9dWSjqraFCXTRlEh8tkGU.mp3"
    },
    "2" : {
        "label" : "Harps String Sketch | Forest 1 ",
        "date" : "December 2020",
        "file_source" : "/vVADu43zEgko9YGy1WrbaKZ6BQw0fH5C.mp3"
    },
    "3" : {
        "label" : "Piano 5 | Villain 1",
        "date" : "April 2021",
        "file_source" : "/gHwodIv4VKM953UeEBmbODq1FyRfra0C.mp3"
    },
};

function About (): JSX.Element {
  const [current_track, setCurrentTrack] = useState(music_list["1"]);

  const trackListJsx = (
    <ul>
      {Object.keys(music_list).map(function (key) {
        return (
          <li key={key} onClick={function () { setCurrentTrack(music_list[key])}}>
            {music_list[key].label}<span className="aux"> - {music_list[key].date}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <MainNavigation />
      <div className="music-page">
        <div className="center-block-element content-width">
          <div className="primary-content-container">
            <section className="first-section">
              <h3 style={{fontSize:'2em'}}>2021</h3>
              <p>
                During the early 2020's, one of my hobbies was composing music using FL Studio.
              </p>
              <p>
                Some of the tools used include:
                <ul>
                  <li>VSTs: PianoTeq, EastWest Hollywood Strings, Spitfire Audio Harp</li>
                  <li>Keyboard Controllers: M-Audio Hammer 88, M-Audio Keystation 49 MK3</li>
                </ul>
              </p>
              <div className="music-player">
                {trackListJsx}
                <div className="music-player-current-track-name">{current_track.label}</div>
                <audio controls src={current_track.file_source} controlsList="nodownload noplaybackrate"></audio>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;