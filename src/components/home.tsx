"use client";

// import Input from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface Memes {
  url: string;
  name: string;
}

export const HomePage = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    img: "https://i.imgflip.com/30b1gx.jpg",
  });

  const [memes, setMemes] = useState<Memes[]>([]);

  const canvasRef = React.createRef<HTMLCanvasElement>();
  const mydiv = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      // ts-ignore
      setMemes(data.data.memes);
    };

    fetchMemes();
  }, []);

  const handleChange = (e: any) => {
    setMeme({
      ...meme,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    // randomly select a image from the memes array

    const randomImage = Math.floor(Math.random() * memes.length + 1);

    setMeme({
      ...meme,
      img: memes[randomImage].url,
    });
  };

  // For embeding the text on the image

  // const imgLoad = () => {
  // const canvas = canvasRef.current;

  // if(canvas){
  //   const ctx = canvas.getContext("2d");

  //   ctx?.drawImage(canvas, 0, 0);
  // }

  //   const img = new Image();
  //   img.src 
  // }


  const handleDrag = useCallback((e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;
    const parent = mydiv.current?.getBoundingClientRect();
    const childRect = (e.target as HTMLElement).getBoundingClientRect();

    if (parent) {
      // Restrict movement within parent boundaries
      if (x < 0 || x + childRect.width > parent.width) {
        data.x = Math.max(0, Math.min(x, parent.width - childRect.width));
      }
      if (y < 0 || y + childRect.height > parent.height) {
        data.y = Math.max(0, Math.min(y, parent.height - childRect.height));
      }
    }
  }, []);





  return (
    <div className="w-full flex justify-center items-center">
     
      <div className="w-1/2 min-h-96 h-1/2 flex flex-col items-center">
        <TextField
          id="outlined-basic"
          label="Top Text"
          variant="outlined"
          onChange={handleChange}
          name="topText"
          color="secondary"
          focused
          sx={{
            input: { color: "white" },
            marginBottom: "2rem",
          }}
          className="w-1/2"
        />
        <TextField
          id="outlined-basic"
          label="Bottom Text"
          variant="outlined"
          onChange={handleChange}
          name="bottomText"
          sx={{
            input: { color: "white" },
            marginBottom: "2rem",
          }}
          focused
          className="w-1/2"
        />

        <button
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100/95 active:text-blue-700/80 transition-colors focus:outline-none active:border-blue-700/40 hover:border-blue-600/50  focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handleClick}
        >
          Next Meme
        </button>

        <div ref={mydiv} className="mt-8 flex justify-center items-center w-full relative">
          <Draggable bounds="parent" onDrag={handleDrag}>
            <span className="absolute z-10 top-4 leading-6 font-medium text-xl cursor-pointer">
              {meme.topText}
            </span>
          </Draggable>
          <img
            src={meme.img}
            alt=""
            className="w-[35rem] h-[25rem] contrast-125"
          />
          {/* <canvas width="400" height="150" ref={canvasRef}></canvas> */}
          <Draggable>
            <span className="absolute z-10 bottom-4 leading-6 font-medium text-xl cursor-pointer">
              {meme.bottomText}
            </span>
          </Draggable>
        </div>
        
      </div>
      <div className="absolute top-[0.06rem] right-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold text-lg">You could Also Drag the Text wherever you Like</div>
    </div>
  );
};
