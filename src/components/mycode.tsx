"use client"

// import Input from "@/components/ui/input";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";


interface Memes {
  url : string,
  name : string
}

export const Code = () => {


  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    img: "https://i.imgflip.com/30b1gx.jpg",
  });

  const [memes, setMemes] = useState<Memes[]>([]);

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
            input: { color: 'white' },
            marginBottom: "4rem"
          }}
          className="w-1/2 mb-4"
        />
        <TextField
          id="outlined-basic"
          label="Bottom Text"
          variant="outlined"
          onChange={handleChange}
          name="bottomText"
          sx={{
            input: { color : "white"},
            marginBottom: "4rem"
          }}
          focused
          className="w-1/2 mb-4"
        />


         { /* My tailwind button */}
        {/* <button className="bg-transparent border-2 hover:border-gray-900 border-slate-900/60 text-slate-900/65 active:border-blue-700/90 active:text-blue-700/80 hover:text-gray-900 border-dotted py-2 px-4 rounded-md font-medium leading-6" onClick={handleClick}>
          Next Meme
        </button> */}

        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100/95 active:text-blue-700/80 transition-colors focus:outline-none active:border-blue-700/40 hover:border-blue-600/50  focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
          Next Meme
        </button>

        {/* <button className="p-[3px] relative">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
    Lit up borders
  </div>
</button> */}

        <div className="mt-8 flex justify-center items-center w-full relative">
          <span className="absolute top-4 leading-6 font-medium text-xl">
            {meme.topText}
          </span>
          <img src={meme.img} alt="" className="w-[35rem] h-[25rem] contrast-125" />

          <span className="absolute bottom-4 leading-6 font-medium text-xl">
            {meme.bottomText}
          </span>
        </div>
      </div>
    </div>
  )
}