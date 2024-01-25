import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Trailer.css";

export default function Trailer() {
  let params = useParams();
  let key = params.ytTrailerId;
  console.log(key);

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer className="react-player"
          controls={true}
          width={"85vw"}
          height={"80vh"}
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
        />
      ) : null}
    </div>
  );
}
