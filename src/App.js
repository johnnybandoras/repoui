import React from "react";
// Components
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
// Styles
import {
  makeStyles,
  createStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
// Icons
import Camera from "@material-ui/icons/Camera";
import Favorite from "@material-ui/icons/Favorite";
import DeleteForever from "@material-ui/icons/DeleteForever";
// Sounds
import like from "./sounds/state-change_confirm-up.wav";
import open from "./sounds/ui_lock.wav";
import close from "./sounds/ui_unlock.wav";
import camera from "./sounds/ui_camera-shutter.wav";
import trash from "./sounds/navigation_transition-right.wav";
import slide from "./sounds/navigation_hover-tap.wav";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#43a047"
    },
    secondary: {
      main: "#ff5722"
    }
  }
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    container: {
      padding: "20px",
      textAlign: "center"
    }
  })
);

export default function MaterialDesignSounds() {
  const likeAudio = new Audio(like);
  const openAudio = new Audio(open);
  const closeAudio = new Audio(close);
  const cameraAudio = new Audio(camera);
  const trashAudio = new Audio(trash);
  const slideAudio = new Audio(slide);

  const playSound = audioFile => {
    audioFile.play();
  };

  const [state, setState] = React.useState({
    checked: true
  });

  const toggleSwitch = name => event => {
    if (event.target.checked) {
      playSound(closeAudio);
    } else {
      playSound(openAudio);
    }
    setState({ ...state, [name]: event.target.checked });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => playSound(likeAudio)}
          >
            <Favorite />
          </Button>
        </div>

        <div className={classes.container}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => playSound(trashAudio)}
          >
            <DeleteForever />
          </Button>
        </div>

        <div className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => playSound(cameraAudio)}
          >
            <Camera />
          </Button>
        </div>

        <div className={classes.container}>
          <Switch checked={state.checked} onChange={toggleSwitch("checked")} />
        </div>

        <div className={classes.container}>
          <Slider
            onChangeCommitted={() => playSound(slideAudio)}
            defaultValue={3}
            step={1}
            marks
            min={1}
            max={10}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
