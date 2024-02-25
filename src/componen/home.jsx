import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap/gsap-core";
import '../index.css'
// img
import mr from '../asset/mr.gif'
import vs from '../asset/vs.gif'
import ms from '../asset/ms.gif'
import jp from '../asset/jp.gif'
import st from '../asset/st.gif'
import np from '../asset/np.gif'
import ur from '../asset/ur.gif'
import ea from '../asset/ea.gif'


export default function Home({ onPlanetClick }){

    const [planetData, setPlanetData] = useState(null);
    const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);

    // API
    useEffect(() => {
        const fetchData = async () => {
          const img = [
          {planetImg :  mr},
          {planetImg: vs},
          {planetImg: ms},
          {planetImg: jp},
          {planetImg: st},
          {planetImg: np},
          {planetImg: ea},
          {planetImg: ur},
        ]
          const options = {
            method: 'GET',
            url: 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/',
            headers: {
              'X-RapidAPI-Key': '118be99130mshedca3d838af8955p1f29d3jsn749a11071b59',
              'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
            }
          };
    
          try {
            const response = await axios.request(options);
            console.log("Fetched data:", response.data);
            const mergedData = response.data.map((planet, index) => ({
              ...planet,
              planetImg: img[index]?.planetImg || null,
            }));
    
            setPlanetData(mergedData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

      // gsap
      useEffect(() => {
        gsap.to(".planet-slider", { duration: 0.5, x: -currentPlanetIndex * 776 });
      }, [currentPlanetIndex]);

      const handleNextPlanet = () => {
        setCurrentPlanetIndex((prevIndex) => (prevIndex + 1) % planetData.length);
      };
    
      const handlePrevPlanet = () => {
        setCurrentPlanetIndex((prevIndex) => (prevIndex - 1 + planetData.length) % planetData.length);
      };
    
    return(
        <>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <section className=" h-screen overflow-x-hidden  bg-main-blue">
          {/* nav */}
            <section className="container w-full px-4 py-2 lg:px-8 lg:py-4 fixed top-0">
              <div className=" flex justify-between items-center">
                <a href="#">
                  <div className="flex flex-col ">
                  <h1 className=" text-white font-semibold text-sm lg:text-xl">Welcome</h1>
                  <span className="text-white lg:text-xl">Explorer</span>
                </div>
                </a>
                
                <div className="hidden lg:block">
                  <ul className=" flex justify-end items-center gap-7">
                    <div className=" ">
                      {/* <input className="text-white bg-blue-li rounded-lg px-2 py-2 border-none outline-none w-[243px] placeholder:text-right" placeholder="Search" type="text" /> */}
                      {/* <i class='bx bx-search-alt text-white absolute translate-x--40'></i> */}
                    </div>
                    {/* <li className="text-white text-base"><a href=""></a>Search</li> */}
                    <li className="text-white text-base"><a href=""></a>About</li>
                  </ul>
                </div>
                <button className=" lg:hidden"><i className='bx max bx-menu text-white' ></i></button>
              </div>
            </section>

        {/* deskop */}
        <section className=" mt-40 hidden lg:block">
          <div className="flex justify-center items-center gap-16 ">
            <button onClick={handlePrevPlanet}><i class='bx bx-chevron-left text-white text-[28px]'></i></button>
            <div className= " flex flex-col items-center gap-1 justify-center text-center">
            <h1 className="text-white font-bold text-5xl">{planetData && planetData[currentPlanetIndex]?.name}</h1>
            <span className="text-white text-xl">Planet</span>
          </div>
          <button onClick={handleNextPlanet}><i className='bx bx-chevron-right text-white text-[28px]'></i></button>
          </div>
          
          <div className="flex justify-center mt-16 gap-[512px] items-center min-w-max planet-slider">
            {planetData && planetData.map((planet, index) => (
              <button key={index} onClick={() => onPlanetClick(planet)}>
              <div className=" translate-x-[558px] scale-125 max-w-[278px]">
                <img src={planet.planetImg} alt="img-planet" className="ml-2" />
              </div>
              </button>
                
            ))}
          </div>
        </section>


          {/* Mobile  */}
          <section className="container px-4 mt-20 flex flex-col gap-5 lg:hidden planet-li">
            {planetData && (
              planetData.map((planet, index)=>(
                <button key={index} onClick={() => onPlanetClick(planet)}>
                  <div className=" bg-blue-li cursor-pointer flex px-3 transition ease-in-out delay-150 duration-300 hover:-translate-y-1  rounded-xl justify-between">
                    <div className="flex items-center gap-2 ">
                      <img src={planet.planetImg} alt="" className="max-w-[74px]" />
                      <h1 className="mr-12 text-white text-base font-semibold">{planet.name}</h1>
                    </div>
                    <button className="flex items-center"><i className='bx bx-right-arrow-alt text-white text-2xl'></i></button>                        
                  </div>
                </button>            
              ))
            )}      
          </section>
          <section className="container px-4 bottom-0 mt-12 lg:hidden">
            <h1 className="text-white text-[8px] text-center">©website was created by Raka, Alma, Selvi XI RPL 1</h1>
          </section>
        </section>
        </>
    )
}