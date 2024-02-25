import React, {useState,useEffect,} from "react";
import axios from "axios";
import {gsap} from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger";
import '../App.css'
import Home from "./home";
// img
import mr from '../asset/mr.gif'


gsap.registerPlugin(ScrollTrigger);

export default function Main({planet, onBack}){
    
  const [planetData, setPlanetData] = useState(null);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      const img = [
      {
        planetImg :  mr
      }
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

    
    return(
      <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <section className="h-screen bg-main-blue">
            <section className="container px-4 lg:px-16 lg:py-6  py-2 top-0 ">
              <div className=" flex justify-between items-center">
                <div className="flex flex-col ">
                  <button onClick={onBack}><i className='bx bx-left-arrow-alt text-white text-2xl'></i></button>
                </div>
              </div>
            </section>

            {/* data planet */}
            <section className="lg:flex lg:justify-between lg:gap-24 lg:items-center lg:h-4/5 container px-4 lg:px-[84px]">
              <section className=" mt-3">
                <div className="flex flex-col justify-center items-center ">
                  <div className="flex flex-col justify-center items-center lg:order-2 lg:hidden">
                    <h1 className="text-white font-bold text-4xl">{planet?.name}</h1>
                    <span className="text-white ">Planet</span>
                  </div>
                  <img className=" lg:order-1  lg:w-[340px] " src={planet.planetImg} alt="" />
                </div>
              </section>

              {/* deskripsi planet */}
              <section className="">
                <div className=" sm:bg-second-blue lg:bg-transparent  h-full">
                  <div className="hidden lg:block">
                    <div className="flex flex-col justify-center items-center ">
                      <h1 className="text-white font-bold text-4xl">{planet?.name}</h1>
                      <span className="text-white ">Planet</span>
                    </div>
                  </div>                 
                  <div className="flex flex-col lg:mt-16 gap-3">
                    <div className="hidden lg:block">
                      <div className="flex justify-between gap-3 ">
                        <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                          <i className='bx bx-tachometer text-2xl text-white'></i>
                          <div className="flex flex-col gap-1 ">
                            <span className="text-abu text-base">Volume</span>
                            <h1 className="text-white font-bold">{planet.basicDetails.volume}</h1>
                          </div>
                        </div>

                        <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                          <i className='bx bx-pie-chart text-white text-2xl'></i>
                          <div className="flex flex-col gap-1 ">
                            <span className="text-abu text-base ">mass</span>
                            <h1 className="text-white font-bold">{planet.basicDetails.mass}</h1>
                          </div>
                        </div>
                      </div>
                    </div>                 
                    
                    <div className="lg:hidden sm:block">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                          <i className='bx bx-tachometer text-2xl text-white'></i>
                          <div className="flex flex-col gap-1 ">
                            <span className="text-abu text-base">Volume</span>
                            <h1 className="text-white font-bold">{planet.basicDetails.volume}</h1>
                          </div>
                        </div>

                        <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                          <i className='bx bx-pie-chart text-white text-2xl'></i>
                          <div className="flex flex-col gap-1 ">
                            <span className="text-abu text-base ">mass</span>
                            <h1 className="text-white font-bold">{planet.basicDetails.mass}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                      <i class='bx bx-tachometer text-2xl text-white'></i>
                      <div className="flex flex-col gap-1 ">
                        <span className="text-abu text-base">Name</span>
                        <h1 className="text-white font-bold"></h1>
                      </div>
                    </div> */}

                    <button onClick={toggleDescription}>
                    <div className="flex gap-8 items-center bg-blue-li px-[18px] py-1.5 rounded-full">
                    <i className='bx bx-planet text-white text-2xl'></i>
                      <div className="flex flex-col gap-1 ">
                      <span className="text-abu text-base">Deskripsi</span>
                        <h1 className="text-white font-bold">{planet.name}</h1>
                      </div>
                    </div>
                    </button>
                    {isDescriptionVisible && (
                    <div className="px-3 py-3 bg-blue-li rounded-xl max-w-[484px]">
                      <p className="text-white">{planet.description}</p>
                    </div>
                    )}
                  </div>
                </div>
              </section>
            </section>
            
            <section>
              <h1></h1>
            </section>
        </section>
      </>
    )
}
