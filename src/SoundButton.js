import { useState, useRef, useEffect } from "react"

const sounds = [
    {
        key: 'Q',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        key: 'W',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        key: 'E',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        key: 'A',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        key: 'S',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        key: 'D',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        key: 'Z',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        key: 'X',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        key: 'C',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
];

export function SoundButton() {

    const [title, setTitle] = useState("Play a sound");

    return (
        <div className="container">
            <h1>{title}</h1>
            {sounds.map((sound, ind) => (
            <PianoKey letter={sound.key} key={ind} audio={sound.mp3} setTitle={setTitle} />))}
        </div>
    );
}

function PianoKey(props) {

    const audioRef = useRef(null);

    const [btnClass, setBtnClass] = useState("drum-pad");

    const btnDown = () => {
        const newClass = "drum-pad active";
        setBtnClass(newClass);
        
    }

    const btnUp = () => {
        const classUp = "drum-pad"
        setBtnClass(classUp);
    }

    const playSound = () => {
        
        const newTitle = props.letter + " is playing!";
        audioRef.current.play();
        
        props.setTitle(newTitle);
    }

    const handleKeyDown = (e) => {
        const id = props.letter;
        if(e.key.toUpperCase() === id) {
            btnDown();
            playSound();
        }
    }

    const handleKeyUp = () => {
        btnUp();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        }
    });

    return (
        <div className={btnClass} onClick={playSound} >
            {props.letter}
            <audio ref={audioRef} src={props.audio} id={props.letter}></audio>
        </div>
        
    );
}